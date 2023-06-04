import { Component, Injectable, Input, OnChanges } from '@angular/core';

const range = (start: number, end: number) => [...Array(end - start)].map((v, i) => i + start);

const paginationRange = (page: number, offset: number, pagesTotal: number) => {
  let start;
  let end;

  if (pagesTotal <= 2 * offset + 1) {
    start = 1;
    end = pagesTotal;
  } else if (page - offset <= 0) {
    start = 1;
    end = 2 * offset + 1;
  } else if (page + offset > pagesTotal) {
    start = pagesTotal - 2 * offset;
    end = pagesTotal;
  } else {
    start = page - offset;
    end = page + offset;
  }

  return range(start, end + 1);
};

@Injectable({ providedIn: 'root' })
export class PaginationConfig {
  resultsPerPage = 10;
  linksOffset = 3;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
  @Input() page: number | undefined;
  @Input() itemsTotal: number | undefined;

  pagesTotal: number | undefined;
  range: number[] | undefined;

  constructor(private paginationConfig: PaginationConfig) {}

  ngOnChanges() {
    if (typeof this.page === 'undefined' || typeof this.itemsTotal === 'undefined') {
      this.pagesTotal = 0;
      this.range = [];
    } else {
      this.pagesTotal = Math.ceil(this.itemsTotal! / this.paginationConfig.resultsPerPage);
      this.range = paginationRange(this.page!, this.paginationConfig.linksOffset, this.pagesTotal);
    }
  }
}
