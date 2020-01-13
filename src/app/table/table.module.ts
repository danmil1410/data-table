import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TableComponent } from './table.component';
import { TableDataComponent } from './table-data/table-data.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { LoaderComponent } from 'src/common/components/loader/loader.component';

@NgModule({
  declarations: [
    TableComponent,
    TableDataComponent,
    TableFilterComponent,
    TablePaginationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class TableModule { }
