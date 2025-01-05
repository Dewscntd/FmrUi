import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { orderReducer } from '../../core/application/order/order.reducer';
import { userReducer } from '../../core/application/user/user.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  users: userReducer,
  orders: orderReducer,
};
