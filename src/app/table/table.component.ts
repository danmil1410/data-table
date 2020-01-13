import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TableService } from 'src/common/services/table.service';

import * as config from '../../assets/config/config.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  public companiesChunk: any[];
  public columns: any[];
  
  public itemsCount: number;
  public pagesRange: number[];

  private currentPage: number;
  private companies: any[];

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.companies) {
        this.setDataChunk(+params["page"]);
      } else {
        this.tableService.companies.subscribe(companies => {
          this.getData(companies, +params["page"]);
        });
      }
    });
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

    this.companies = this.splitData(newTable);
    this.companiesChunk = this.companies[this.currentPage - 1];

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

  private getData(data: any[], currentPage: number): void {
    this.itemsCount = data.length;
    this.companies = this.splitData(data);
      
    if (!this.columns) {
      this.columns = Object.keys(this.companies[0][0])
        .map(column => ({name: column, sortMode: null}))
        .filter(column => column.name !== "hidden");
    }

    this.setDataChunk(currentPage);
  }

  private setDataChunk(currentPage: number): void {
    if (currentPage > this.itemsCount) {
      this.currentPage = 1;
    }

    this.currentPage = currentPage;
    this.companiesChunk = this.companies[this.currentPage - 1];
  }

  private splitData(data: any[]): any[] {
    // Items per chunk
    const pageSize = config.pageSize;

    return data.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index / pageSize)

      if (!resultArray[chunkIndex]) {
        // Start a new chunk
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, []);
  }
}
