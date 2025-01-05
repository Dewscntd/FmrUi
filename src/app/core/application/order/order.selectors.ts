import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderState, orderAdapter } from './order.state';

export const selectOrderState = createFeatureSelector<OrderState>('orders');


const { selectAll, selectEntities } = orderAdapter.getSelectors();

export const selectAllOrders = createSelector(
  selectOrderState,
  selectAll
);

export const selectOrderEntities = createSelector(
  selectOrderState,
  selectEntities
);
