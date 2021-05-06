import { Component, OnInit } from '@angular/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, DataZoomComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';

@Component({
  selector: 'app-liner-chart',
  templateUrl: './liner-chart.component.html',
  styleUrls: ['./liner-chart.component.scss']
})
export class LinerChartComponent implements OnInit {
  data: any[] = [];
  now: any = +new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;
  echartsExtentions: any[];
  private _randomData() {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }
  option = {
    title: {
      text: 'Liner chart + live'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        var date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: 'msft',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: this.data
    }]
  };
  constructor () {
    this.echartsExtentions = [ TitleComponent ,DataZoomComponent,LineChart,ToolboxComponent,TooltipComponent, GridComponent, LegendComponent];
   }

  ngOnInit(): void {
    for (var i = 0; i < 1000; i++) {
      this.data.push(this._randomData());
    }
    setInterval(() => {

      for (var i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this._randomData());
      }

      this._restOptions(this.data);
    }, 1000);
  }
  private _restOptions(data: any[]) {
    this.option = {
      title: {
        text: '动态数据 + 时间坐标轴'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
      }]
    };
  }
}
