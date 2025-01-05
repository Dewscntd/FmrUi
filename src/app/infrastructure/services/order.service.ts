import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order } from '../../core/domain/order/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [
    { "id": 1, "userId": 1, "total": 100 },
    { "id": 2, "userId": 1, "total": 150 },
    { "id": 3, "userId": 2, "total": 200 },
    { "id": 4, "userId": 3, "total": 300 },
    { "id": 5, "userId": 4, "total": 400 },
    { "id": 6, "userId": 5, "total": 500 }
  ];
  private readonly DELAY = 300;

  constructor() {}

  getOrders(): Observable<Order[]> {
    return of(this.orders).pipe(delay(this.DELAY));
  }
}
