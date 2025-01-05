import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

import { OrderService } from '../../../infrastructure/services/order.service';

import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  actions$ = inject(Actions);
  orderService = inject(OrderService)

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => {
            return OrderActions.loadOrdersSuccess({ orders });
          }),
          catchError((error) => {
            return of(OrderActions.loadOrdersFailure({ error }));
          })
        )
      )
    )
  );

}