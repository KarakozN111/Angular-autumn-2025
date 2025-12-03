//логика апи
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemsActions from '../state/items.action'; 
import { ItemsService } from '../../../services/items';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ItemsEffects {
  private actions$ = inject(Actions);
  private itemsService = inject(ItemsService);

  loadItems$ = createEffect(() =>// вызыво апи после реакции акшн
    this.actions$.pipe(
      ofType(ItemsActions.loadItems), //слушаем дейтсвие лоадайтемс
      mergeMap(({ query }) =>
        this.itemsService.getItems(query).pipe( //вызываем апи
          map(items => ItemsActions.loadItemsSuccess({ items })),//успех
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))// ошибка
        )
      )
    )
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItem),// слушаем лоадайтемс
      mergeMap(({ id }) =>
        this.itemsService.getItemById(id).pipe(
          map(item => ItemsActions.loadItemSuccess({ item })),
          catchError(error => of(ItemsActions.loadItemFailure({ error })))
        )
      )
    )
  );
}
