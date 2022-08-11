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

    @Output() chartInit = new EventEmitter<echarts.ECharts>();

    protected echartsInstance: echarts.ECharts | undefined;

    protected subscription: Subscription | undefined;

    constructor (
        protected readonly _el: ElementRef<HTMLElement>
    ) { }

    ngOnInit(): void {
        echarts.use([...this.extentions, CanvasRenderer]);
        this.echartsInstance = echarts.init(this._el.nativeElement, this.theme, {
            width: this._el.nativeElement.clientWidth === this.defaultWidth ? 400 : undefined,
            height: this._el.nativeElement.clientHeight === 0 ? this.defaultHeight : undefined
        });
        this.chartInit.emit(this.echartsInstance);
        this.setParams();
        if (this.isResizable) {
            this.addResizbleFunctionality();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !changes.options.firstChange) {
            this.setParams();
        }

        if (changes.isResizable && !changes.isResizable.firstChange) {
            if (this.isResizable) {
                this.addResizbleFunctionality();
            } else {
                if (this.subscription != null) this.subscription.unsubscribe();
            }
        }
    }

    protected addResizbleFunctionality() {
        if (this.subscription != null) this.subscription.unsubscribe();
        this.subscription = HtmlHelper.getWidthSensor(this._el.nativeElement).subscribe(() => {
            if (this.echartsInstance != null) {
                this.echartsInstance.resize();
            }
        });
    }
    protected setParams() {
        if (this.echartsInstance != null && this.options != null) {
            this.echartsInstance.setOption(this.options, true);
        }
    }

    ngOnDestroy(): void {
        if (this.subscription != null) this.subscription.unsubscribe();
    }
}
