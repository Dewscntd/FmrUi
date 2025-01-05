import { OrderState } from "../../core/application/order/order.state";
import { UserState } from "../../core/application/user/user.state";

export interface AppState {
  users: UserState;
  orders: OrderState;
}
