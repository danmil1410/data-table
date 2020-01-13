import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {
    path: 'data-table/list/:page',
    component: TableComponent
  },
  {
    path: '',
    redirectTo: '/data-table/list/1',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/data-table/list/1'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
