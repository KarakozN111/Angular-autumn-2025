//обновление состояния
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
  //начало загрузки списка
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loadingList: true,
    errorList: null
  })),
  //успех - сохраняем список 
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    loadingList: false,
    items
  })),
  //ошибка списка
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    errorList: error
  })),
  //загрузка одного айтема
  on(ItemsActions.loadItem, (state) => ({
    ...state,
    loadingItem: true,
    errorItem: null
  })),
  //успех -сохраняем выбранный айтем
  on(ItemsActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    loadingItem: false,
    selectedItem: item
  })),
  //ошибка загрузки айтема
  on(ItemsActions.loadItemFailure, (state, { error }) => ({
    ...state,
    loadingItem: false,
    errorItem: error
  }))
);
