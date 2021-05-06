import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bar-chart', loadChildren: () => import('./BarChart/Index').then(m => m.BarChartModule)
  },
  {
    path: 'liner-chart', loadChildren: () => import('./LinerChart/Index').then(m => m.LinerChartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
