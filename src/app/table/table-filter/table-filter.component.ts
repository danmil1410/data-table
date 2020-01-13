import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.sass']
})
export class TableFilterComponent {
  @Output("tableFiltered") tableFiltered = new EventEmitter<string>();

  constructor() { }

  public filterTable(event: any): void {
    // Filtering is case insensitive
    const searchedValue = event.target.value.toLowerCase();
    this.tableFiltered.emit(searchedValue);
  }

}
