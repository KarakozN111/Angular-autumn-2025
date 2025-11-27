import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectItems = createSelector(
  selectItemsState,
  (state) => state.items
);

export const selectLoadingList = createSelector(
  selectItemsState,
  (state) => state.loadingList
);

export const selectListError = createSelector(
  selectItemsState,
  (state) => state.errorList
);

export const selectSelectedItem = createSelector(
  selectItemsState,
  (state) => state.selectedItem
);

export const selectLoadingItem = createSelector(
  selectItemsState,
  (state) => state.loadingItem
);

export const selectItemError = createSelector(
  selectItemsState,
  (state) => state.errorItem
);
