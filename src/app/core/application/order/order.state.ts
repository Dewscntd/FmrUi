import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Order } from '../../domain/order/order.model';

export interface OrderState extends EntityState<Order> {}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialOrderState: OrderState = orderAdapter.getInitialState({});
