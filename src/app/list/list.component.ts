import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NEVER, Subject, Subscription, catchError, combineLatest, distinctUntilChanged, map, switchMap } from 'rxjs';

import { Filters } from '../filters/filters.component';
import { Sorter } from '../sorter/sorter.component';
import { Product } from '../product.interface';
import { PaginationConfig } from '../pagination/pagination.component';
import { ProductsService } from '../products.service';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;
  page: number | undefined;
  itemsTotal: number | undefined;
  private subs: Subscription | undefined;
  private pageObs = this.route.queryParamMap
  .pipe(
    map(params => {
      const page = params.get('page');

      return page === null ? '1' : page;
    }),
    distinctUntilChanged()
  );
  filtersSubj = new Subject<Filters>();
  sorterSubj = new Subject<Sorter>();

  constructor(
    private route: ActivatedRoute,
    private paginationConfig: PaginationConfig,
    private productsService: ProductsService) {}

  ngOnInit() {
    this.subs = combineLatest({
      page: this.pageObs,
      filters: this.filtersSubj,
      sorter: this.sorterSubj
    })
    .pipe(
      map(({ page, filters, sorter }) => {
        const params: { [param: string]: string; } = { _page: page, _limit: this.paginationConfig.resultsPerPage.toString() };

        if (filters.category !== null) {
          params['category'] = filters.category;
        }

        if (filters.brand !== null) {
          params['brand'] = filters.brand;
        }

        if (sorter !== null) {
          params['_sort'] = sorter.orderBy;
          params['_order'] = sorter.orderType;
        }

        return params;
      }),
      switchMap(params =>
        this.productsService.getAll(params)
          .pipe(
            catchError(() => NEVER), // TODO: Handle errors globally via an interceptor
            map(res => ({ products: res.body!, page: params['_page'], itemsTotal: res.headers.get('X-Total-Count')! }))
          ))
    )
    .subscribe(({ products, page, itemsTotal }) => {
      this.products = products;
      this.page = +page;
      this.itemsTotal = +itemsTotal;
    });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}


