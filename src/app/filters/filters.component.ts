import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription, map, of, startWith } from 'rxjs';
import { ProductsService } from '../products.service';

export interface Filters {
  category: string | null;
  brand: string | null;
}

function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<Filters>();

  formGroup = new FormGroup({
    category: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null)
  });
  private subs: Subscription | undefined;

  brands$ = this.productsService.getAll({})
    .pipe(
      map(res => res.body!
        .map(product => product.brand)
        .filter(onlyUnique))
    );

  categories$ = this.productsService.getAll({})
    .pipe(
      map(res => res.body!
        .map(product => product.category)
        .filter(onlyUnique))
    );

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subs = this.formGroup.valueChanges.pipe(
      startWith(this.formGroup.value),
    )
    .subscribe(value => {
      this.filtersChange.emit(value as Filters);
    })
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
