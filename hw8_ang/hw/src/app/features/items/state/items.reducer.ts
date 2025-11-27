import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from './items.action';
import { Item } from '../item.model';

export interface ItemsState {
  items: Item[];
  selectedItem: Item | null;
  loadingList: boolean;
  loadingItem: boolean;
  errorList: any;
  errorItem: any;
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loadingList: true,
    errorList: null
  })),
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    loadingList: false,
    items
  })),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    errorList: error
  })),
  on(ItemsActions.loadItem, (state) => ({
    ...state,
    loadingItem: true,
    errorItem: null
  })),
  on(ItemsActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    loadingItem: false,
    selectedItem: item
  })),
  on(ItemsActions.loadItemFailure, (state, { error }) => ({
    ...state,
    loadingItem: false,
    errorItem: error
  }))
);
