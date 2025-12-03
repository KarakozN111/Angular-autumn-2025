//события
import { createAction, props } from '@ngrx/store';
import { Item } from '../item.model';
// загружаем список items
export const loadItems = createAction(
  '[Items] Load Items',
  props<{ query?: string }>()
);
//успешная загрузка
export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);
//ошибка при загрузке
export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);
// загрузка айтема по айди
export const loadItem = createAction(
  '[Items] Load Item',
  props<{ id: number }>()
);
// успех
export const loadItemSuccess = createAction(
  '[Items] Load Item Success',
  props<{ item: Item }>()
);
//ошибка 
export const loadItemFailure = createAction(
  '[Items] Load Item Failure',
  props<{ error: any }>()
);
