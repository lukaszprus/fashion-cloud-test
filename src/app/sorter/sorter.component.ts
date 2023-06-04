import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription, map, startWith } from 'rxjs';

export type Sorter = { orderBy: string; orderType: 'asc' | 'desc'; } | null;

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html'
})
export class SorterComponent implements OnInit, OnDestroy {
  @Input() config!: { key: string; label: string; };
  @Output() sorterChange = new EventEmitter<Sorter>();

  control = new FormControl<'' | 'asc' | 'desc'>('');
  private subs: Subscription | undefined;

  ngOnInit() {
    this.subs = this.control.valueChanges.pipe(
      startWith(this.control.value),
      map(value => {
        const orderBy = this.config.key;

        switch(value) {
          case 'asc': return { orderBy, orderType: 'asc' } as const;
          case 'desc': return { orderBy, orderType: 'desc' } as const;
        }

        return null;
      })
    )
    .subscribe(value => {
      this.sorterChange.emit(value);
    })
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
