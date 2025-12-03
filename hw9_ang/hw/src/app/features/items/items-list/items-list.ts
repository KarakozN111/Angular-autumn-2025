import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectItems, selectLoadingList } from '../state/items.selector';
import * as ItemsActions from '../state/items.action';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsList implements OnInit {

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get items$() {
    return this.store.select(selectItems);
  }

  get loading$() {
    return this.store.select(selectLoadingList);
  }

  q = '';

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.q = params.get('q') || '';
      this.store.dispatch(ItemsActions.loadItems({ query: this.q }));
    });
  }

  onSearch(term: string) {
    this.router.navigate([], {
      queryParams: { q: term || null },
      queryParamsHandling: 'merge'
    });
  }
}
