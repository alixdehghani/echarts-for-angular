import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
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
    @Input() defaultWidth: number = 400;
    @Input() defaultHeight: number = 400;
    @Input() periodicityInMiliSeconds: number = 2000;
    @Input() theme: string = '';
    private _echartsInstance: echarts.ECharts | undefined;

    private _subscription: Subscription | undefined;

    constructor (
        private readonly _el: ElementRef<HTMLElement>
    ) { }

    ngOnInit(): void {
        echarts.use([...this.extentions, CanvasRenderer]);
        this._echartsInstance = echarts.init(this._el.nativeElement, this.theme, {
            width: this._el.nativeElement.clientWidth === 0 ? this.defaultWidth : this._el.nativeElement.clientWidth,
            height: this._el.nativeElement.clientHeight === 0 ? this.defaultHeight : this._el.nativeElement.clientHeight
        });
        this._setParams();
        this._subscription = HtmlHelper.getWidthSensor(this._el.nativeElement, this.periodicityInMiliSeconds).subscribe(() => {
            if (this._echartsInstance != null) {
                this._echartsInstance.resize();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !changes.options.firstChange) {
            this._setParams();
        }
    }

    private _setParams() {
        if (this._echartsInstance != null && this.options != null)
            this._echartsInstance.setOption({ ...this.options });
    }

    ngOnDestroy(): void {
        if (this._subscription != null) this._subscription.unsubscribe();
    }
}
