import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import * as config from '../../../assets/config/config.json'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.sass']
})
export class TablePaginationComponent implements OnChanges {
  @Input() items: any[];
  @Input() initialPage = config.initialPage;
  @Input() pageSize = config.pageSize;
  @Input() maxPages = config.paginationButtonsCount;
  @Output() changePage = new EventEmitter<any>(true);

  public pager: any;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleRight: IconDefinition = faAngleRight;

  constructor(private route: ActivatedRoute) { }

  ngOnChanges(changes: SimpleChanges) {
    // Reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
        this.route.params.subscribe(params => {
          this.setPage(+params["page"]);
      });
    }
  }

  public setPage(pageNumber: number): void {
    // Get new pager object for specified page
    this.pager = this.paginate(
      this.items.length, pageNumber, this.pageSize, this.maxPages);

    const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.changePage.emit({newItems: pageOfItems, newPage: this.pager.currentPage});
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

      // Calculate start and end item indexes
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // Create an array of pages for ngFor loop
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      // Return object with all pager properties required by the view
      return {
          totalItems,
          currentPage,
          pageSize,
          totalPages,
          startPage,
          endPage,
          startIndex,
          endIndex,
          pages
      };
}

}
