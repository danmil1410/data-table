import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/common/models/company.model';

import { faSortAmountUpAlt, faSortAmountDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.sass']
})
export class TableDataComponent {
  @Input() companies: Company[];
  @Input() columns: any[];
  @Output("tableSorted") tableSorted = new EventEmitter<any>();

  public faSortAmountUp: IconDefinition = faSortAmountUpAlt;
  public faSortAmountDown: IconDefinition = faSortAmountDown;

  constructor() { }

  public sortTable(column): void {
    this.tableSorted.emit(column);
  }

  public camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toUpperCase()}`);
  };

}
