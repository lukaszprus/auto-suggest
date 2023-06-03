import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Observable, Subject, Subscription, of } from 'rxjs';
import { switchMap, catchError, debounceTime, map } from 'rxjs/operators';

export interface Item<T> {
  value: T;
  label: string;
}

export type Search<T> = (term: string) => Observable<Item<T>[]>;

@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.css']
})
export class AutoSuggestComponent<T> implements OnInit, OnDestroy {
  @Input() search!: Search<T>;
  @Output() itemSelect = new EventEmitter<T>();

  subj = new Subject<string>();
  private subs: Subscription | undefined;
  items: Item<T>[] = [];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.subs = this.subj.pipe(
      debounceTime(300),
      map(term => term.length > 1 ? term : null),
      switchMap(term => {
        if (term === null) {
          return of([]);
        }

        return this.search(term).pipe(
          catchError(err => {
            console.log('Search error: ', err);

            return of([]);
          })
        )
      }),
    ).subscribe(items => {
      this.items = items;
    });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }

  onItemClick(value: T) {
    this.input.nativeElement.value = ''

    this.items = [];

    this.itemSelect.emit(value);
  }
}
