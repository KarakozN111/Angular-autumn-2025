///доступ к данным
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';
//получаем весь сейт фичи
export const selectItemsState = createFeatureSelector<ItemsState>('items');
//список айтемс
export const selectItems = createSelector(
  selectItemsState,
  (state) => state.items
);
// фалг загрузки списка
export const selectLoadingList = createSelector(
  selectItemsState,
  (state) => state.loadingList
);
//ошибка списка
export const selectListError = createSelector(
  selectItemsState,
  (state) => state.errorList
);
//выбранный айтем 
export const selectSelectedItem = createSelector(
  selectItemsState,
  (state) => state.selectedItem
);
//флаг загрузки одного айтема
export const selectLoadingItem = createSelector(
  selectItemsState,
  (state) => state.loadingItem
);
//флаг ошибки одного айтема
export const selectItemError = createSelector(
  selectItemsState,
  (state) => state.errorItem
);
