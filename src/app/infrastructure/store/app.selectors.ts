import { createSelector } from '@ngrx/store';
import { selectAllOrders } from '../../core/application/order/order.selectors';
import { selectSelectedUser } from '../../core/application/user/user.selectors';

export const selectSelectedUserOrders = createSelector(
  selectSelectedUser,
  selectAllOrders,
  (user, orders) => {
    if (!user) return [];

    const filteredOrders = orders.filter(o => o.userId === user.id);

    return filteredOrders;
  }
);

export const selectSelectedUserOrderSummary = createSelector(
  selectSelectedUser,
  selectSelectedUserOrders,
  (user, userOrders) => {
    if (!user) return null;

    const sum = userOrders.reduce((acc, o) => acc + o.total, 0);

    return {
      user,
      sumOfOrders: sum,
    };
  }
);

