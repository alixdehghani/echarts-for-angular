# EchartsForAngular

Angular directive for [Apache ECharts (incubating)](https://github.com/apache/incubator-echarts)
(version >= 5.x)

- [Online Demo](https://stackblitz.com/edit/echarts-for-angular?file=src/app/bar-chart/bar-chart.component.ts)


# Getting Started

`echarts-for-angular` is an Angular (ver >= 9.x) directive for ECharts (ver >= 5.x).


# Installation

```bash
# if you use npm
npm install echarts -S
npm install echarts-for-angular

# or if you use yarn
yarn add echarts
yarn add echarts-for-angular
```

- If you need ECharts GL support, please install it first:

```bash
# if you use npm
npm install echarts-gl -S

# or if you use yarn
yarn add echarts-gl
```


# Usage

Please refer to the [demo](https://stackblitz.com/edit/echarts-for-angular?file=src/app/bar-chart/bar-chart.component.ts) page.

1. Firstly, import `NgxEchartsModule` in your app module (or any other proper angular module):

```typescript
import { EchartsxModule } from 'echarts-for-angular';

   @NgModule({
     imports: [EchartsxModule],
   })
   export class AppModule {} 
   ```
   
2. Then: use `echarts` directive in a div which has **pre-defined height**. (default width & height: 400px)

 - Simple example:

     - html:

     ```html
     <div echarts [options]="echartsOptions" [extentions]="echartsExtentions"></div>
     ```
     

      - component:

     ```typescript
     import { Component, OnInit } from "@angular/core";
     import { BarChart } from "echarts/charts";
     import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components";

     @Component({
        selector: "app-bar-chart",
        templateUrl: "./bar-chart.component.html",
        styleUrls: ["./bar-chart.component.css"]
     })
     export class BarChartComponent implements OnInit {
     readonly echartsExtentions: any[];
     echartsOptions: object = {};

     constructor() {
        this.echartsExtentions = [BarChart, TooltipComponent, GridComponent, LegendComponent];
     }

     ngOnInit() {
        this.echartsOptions = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                type: "shadow"
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "8%",
                top: "3%",
                containLabel: true
            },
            xAxis: {
                 type: "value"
            },
            yAxis: {
                type: "category",
                data: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
                axisLabel: {
                interval: 0,
                rotate: 15
                }
            },
            legend: {
                data: ["ali", "behrooz"],
                bottom: 0
            },
            series: [
            {
                name: "ali",
                type: "bar",
                data: [10, 15, 17, 4, 15, 31, 2]
            },
            {
                name: "behrooz",
                type: "bar",
                data: [1, 17, 12, 11, 40, 3, 21]
            }
            ]
        };
    }
    }
    ```


# API


### Directive
`echarts` directive support following input properties:

| Input           | Type    | Default | Description                                                                                                                                                                                                                                                                                                             |
| --------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[options]`     | EChartsOption  | null    | The same as the options on the official demo site.   
| `[extentions]`     | array  | null    | echarts extentions you need to create a chart.  
| `[defaultWidth]`     | number  | 400    | if the html element that specifies for draw chart has no width the default width will be apply.  
| `[defaultHeight]`     | number  | 400    | if the html element that specifies for draw chart has no height the default height will be apply. 
| `[theme]` | string \| Object | "" |  Theme to be applied. This can be a configuring object of a theme, or a theme name registered through echarts.registerTheme. you can use dark for active dark theme 
| `[isResizable]`     | boolean  | true    | enable or disable auto resize function.  
| `[periodicityInMiliSeconds]`     | number  | 2000    | time for recheck the chart size changes then resize method will be call.  

### ECharts Instance

`echartsInstance` is exposed (since v1.1.6) in the `(chartInit)` event, enabling you to directly call functions like: `resize()`, `showLoading()`, etc. For example:

- html:

```html
<div echarts class="demo-chart" [options]="chartOptions" (echartsInstance)="onChartInit($event)"></div>
```

- component:

```typescript
onChartInit(ec) {
  this.echartsInstance = ec;
}

resizeChart() {
  if (this.echartsInstance) {
    this.echartsInstance.resize();
  }
}
```