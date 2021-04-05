import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EchartsModule } from 'src/app/Echarts/Index';
import { BarChartComponent } from './barChart.component';

const routes: Routes = [
    {
        path: "", component: BarChartComponent
    }
];

@NgModule({
    declarations: [BarChartComponent],
    imports: [EchartsModule, RouterModule.forChild(routes)],
    exports: [BarChartComponent],
})
export class BarChartModule { }
