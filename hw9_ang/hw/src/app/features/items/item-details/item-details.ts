import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as ItemsActions from '../state/items.action';
import { selectSelectedItem, selectLoadingItem } from '../state/items.selector';

@Component({
  selector: 'item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css']
})
export class ItemDetails implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}
//селекторы для шаблона, поток
  get item$() {
    return this.store.select(selectSelectedItem);
  }

  get loading$() {
    return this.store.select(selectLoadingItem);
  }

  itemId: number | null = null;

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr) {
      this.itemId = Number(idStr);
      this.store.dispatch(ItemsActions.loadItem({ id: this.itemId }));//отправляем действие в стор; акшн получает сигнал, еффектс делает запрос; редюсеер обновяеьм стор компонент получает данные через селектор   
    }
  }

  back() {
    this.location.back();
  }
}
