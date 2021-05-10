import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";

import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { HtmlHelper } from "../internal/HtmlHelper";
import { EChartsOption } from 'echarts';


@Directive({
    selector: "[echarts]"
})

export class EchartsDirective implements OnInit, OnDestroy, OnChanges {
    @Input() options: EChartsOption | undefined;
    @Input() extentions: any[] = [];
    @Input() isResizable: boolean = true;
    @Input() defaultWidth: number = 400;
    @Input() defaultHeight: number = 400;
    @Input() periodicityInMiliSeconds: number = 2000;
    @Input() theme: Object | string = '';

    @Output() echartsInstance = new EventEmitter<echarts.ECharts>();

    private _echartsInstance: echarts.ECharts | undefined;

    private _subscription: Subscription | undefined;

    constructor(
        private readonly _el: ElementRef<HTMLElement>
    ) { }

    ngOnInit(): void {
        echarts.use([...this.extentions, CanvasRenderer]);
        this._echartsInstance = echarts.init(this._el.nativeElement, this.theme, {
            width: this._el.nativeElement.clientWidth === this.defaultWidth ? 400 : undefined,
            height: this._el.nativeElement.clientHeight === 0 ? this.defaultHeight : undefined
        });
        this.echartsInstance.emit(this._echartsInstance);
        this._setParams();
        if (this.isResizable) {
            this._addResizbleFunctionality();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !changes.options.firstChange) {
            this._setParams();
        }

        if (changes.isResizable && !changes.isResizable.firstChange) {
            if (this.isResizable) {
                this._addResizbleFunctionality();
            } else {
                if (this._subscription != null) this._subscription.unsubscribe();
            }
        }
    }

    private _addResizbleFunctionality() {
        if (this._subscription != null) this._subscription.unsubscribe();
        this._subscription = HtmlHelper.getWidthSensor(this._el.nativeElement).subscribe(() => {
            if (this._echartsInstance != null) {
                this._echartsInstance.resize();
            }
        });
    }
    private _setParams() {
        if (this._echartsInstance != null && this.options != null)
            this._echartsInstance.setOption({ ...this.options });
    }

    ngOnDestroy(): void {
        if (this._subscription != null) this._subscription.unsubscribe();
    }
}
