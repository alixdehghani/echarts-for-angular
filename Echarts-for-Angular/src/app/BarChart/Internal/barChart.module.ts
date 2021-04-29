import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchartsxModule } from 'projects/echartsx/src/public-api';

import { BarChartComponent } from './barChart.component';

const routes: Routes = [
    {
        path: "", component: BarChartComponent
    }
];

@NgModule({
    declarations: [BarChartComponent],
    imports: [EchartsxModule, RouterModule.forChild(routes)],
    exports: [BarChartComponent],
})
export class BarChartModule { }
