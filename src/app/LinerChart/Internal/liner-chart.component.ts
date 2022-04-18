import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BarChart, LineChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { interval } from 'rxjs';

@Component({
  selector: 'app-liner-chart',
  templateUrl: './liner-chart.component.html',
  styleUrls: ['./liner-chart.component.scss'],
})
export class LinerChartComponent implements OnInit {
  chartData: IChartData[] = [];
  readonly echartsExtentions: any[];
  option: EChartsOption;
  chartInstance: echarts.ECharts;
  constructor() {
    this.echartsExtentions = [
      TitleComponent,
      LineChart,
      BarChart,
      ToolboxComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
    ];
  }
  
  ngOnInit(): void {
    this.option = {
      title: {
        text: 'Liner chart + live',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: true },
          magicType: { type: ['line', 'bar'] },
          saveAsImage: { name: 'Line chart' },
        },
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: 'line',
          data: this.chartData,
        },
      ],
    };

    interval(1000).subscribe({
      next: () => {
        const data = this._generateRandomData();
        this.chartData.push(data);
        this.chartInstance.setOption({
          series: [
            {
              data: this.chartData,
            },
          ],
        });
      },
    });
  }

  private _generateRandomData(): IChartData {
    return {
      name: new Date().toString(),
      value: [
        [
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds(),
        ].join(':'),
        Math.round(Math.random() * 1000),
      ],
    };
  }
}
interface IChartData {
  name: string;
  value: [string, number];
}
