import { createReducer, on } from '@ngrx/store';
import { orderAdapter, initialOrderState } from './order.state';

import * as OrderActions from './order.actions';

export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.loadOrders, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => {
    return orderAdapter.setAll(orders, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);