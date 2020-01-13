import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import * as config from '../../../assets/config/config.json'
import { TableService } from 'src/common/services/table.service.js';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.sass']
})
export class TablePaginationComponent implements OnChanges {
  @Input() itemsCount: number;

  public pager: any;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleRight: IconDefinition = faAngleRight;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.pager && changes.itemsCount.currentValue) {
      this.setPage(1);
    }
  }
  
  public setPage(pageNumber: number): void {
    // Get new pager object for specified page
    this.pager = this.paginate(
      this.itemsCount, pageNumber, config.pageSize, config.paginationPagesCount);

    // Navigate to another page
    this.router.navigate([`/data-table/list/${this.pager.currentPage}`]);
  }

  private paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ) {
      // Calculate total amount of pages
      let totalPages = Math.ceil(totalItems / pageSize);

      // Ensure that current page isn't out of range
      if (currentPage < 1) {
          currentPage = 1;
      } else if (currentPage > totalPages) {
          currentPage = totalPages;
      }

      let startPage: number, endPage: number;
      if (totalPages <= maxPages) {
          // If total pages less than max, show all pages
          startPage = 1;
          endPage = totalPages;
      } else {
          // If total pages more than max, calculate start and end pages
          let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
          let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
          if (currentPage <= maxPagesBeforeCurrentPage) {
              // Current page near the start
              startPage = 1;
              endPage = maxPages;
          } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
              // Current page near the end
              startPage = totalPages - maxPages + 1;
              endPage = totalPages;
          } else {
              // Current page somewhere in the middle
              startPage = currentPage - maxPagesBeforeCurrentPage;
              endPage = currentPage + maxPagesAfterCurrentPage;
          }
      }

      // Create an array of pages for ngFor loop
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      // Return object with all pager properties required by the view
      return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          pages: pages
      };
}

}
