import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchartsxModule } from 'projects/echartsx/src/public-api';

import { LinerChartComponent } from './liner-chart.component';

const routes: Routes = [
    {
        path: "", component: LinerChartComponent
    }
];

@NgModule({
    declarations: [LinerChartComponent],
    imports: [EchartsxModule, RouterModule.forChild(routes)],
    exports: [LinerChartComponent],
})
export class LinerChartModule { }
