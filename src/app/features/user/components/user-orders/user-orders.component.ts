import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../infrastructure/store';
import { selectSelectedUserOrders, selectSelectedUserOrderSummary } from '../../../../infrastructure/store/app.selectors';
import { CommonModule } from '@angular/common';
import { selectSelectedUserId } from '../../../../core/application/user/user.selectors';
import { UserNameComponent } from "./user-name/user-name.component";
import { UserTotalComponent } from "./user-total/user-total.component";

@Component({
  selector: 'user-orders',
  standalone: true,
  imports: [CommonModule, UserNameComponent, UserTotalComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersComponent implements OnInit {
  selectedUserId$!: Observable<number | null>;
  selectedUserName$!: Observable<string | null>;
  selectedUserTotal$!: Observable<number>;
  selectedUserOrders$!: Observable<any[]>;
  selectedUserSummary$!: Observable<{ user: any; sumOfOrders: number } | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.selectedUserId$ = this.store.select(selectSelectedUserId);

    this.selectedUserOrders$ = this.store.select(selectSelectedUserOrders);

    this.selectedUserSummary$ = this.store.select(selectSelectedUserOrderSummary);
  }
}
