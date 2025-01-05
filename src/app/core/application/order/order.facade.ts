import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { Order } from '../../domain/order/order.model';

import * as OrderActions from './order.actions';
import * as OrderSelectors from './order.selectors';

@Injectable({ providedIn: 'root' })
export class OrderFacade {
  store = inject(Store);

  allOrders$: Observable<Order[]> = this.store.select(OrderSelectors.selectAllOrders);
  isLoading$: Observable<boolean> = this.store.select(state => state.orders.isLoading);
  error$: Observable<any> = this.store.select(state => state.orders.error);

  loadOrders() {
    this.store.dispatch(OrderActions.loadOrders());
  }
}

