import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from 'src/common/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  public companiesChunk: any[];
  public columns: any[];

  private companies: any[];

  constructor(
    private tableService: TableService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tableService.companies.subscribe(companies => {
      this.getData(companies);
    });
  }

  public onChangePage(pager: any) {
    this.companiesChunk = pager.newItems;
    this.router.navigate([`/data-table/list/${pager.newPage}`]);
  }

  public filterTable(value: string): void {
    this.companies.forEach(company => {
      company.hidden = !this.columns.some(column => `${company[column.name]}`.includes(value));
    });
  }

  public sortTable(column): void {
    const newTable = [].concat(...this.companies);

    newTable.sort((a, b) => column.sortMode !== "asc"
      ? (a[column.name] > b[column.name]) ? 1 : ((b[column.name] > a[column.name]) ? -1 : 0)
      : (a[column.name] > b[column.name]) ? -1 : ((b[column.name] > a[column.name]) ? 1 : 0));

    this.companies = newTable;

    this.columns = this.columns.map(newColumn => {
      let newSortMode;

      if (newColumn.name === column.name) {
        column.sortMode !== "asc" ? newSortMode = "asc" : newSortMode = "desc";
      } else {
        newSortMode = null;
      }

      return {...newColumn, sortMode: newSortMode};
    });
  }

  private getData(data: any[]): void {
    this.companies = data;

    if (!this.columns) {
      this.columns = Object.keys(this.companies[0])
        .map(column => ({name: column, sortMode: null}))
        .filter(column => column.name !== "hidden");
    }
  }
}
