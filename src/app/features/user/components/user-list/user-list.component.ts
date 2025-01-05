import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Store } from '@ngrx/store';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

import { selectAllUsers } from '../../../../core/application/user/user.selectors';
import { User } from '../../../../core/domain/user/user.model';


import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AppState } from '../../../../infrastructure/store';

import * as UserActions from '../../../../core/application/user/user.actions';
import * as OrderActions from '../../../../core/application/order/order.actions';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [NgFor, NzTableModule, NzButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private store: Store<AppState>,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
    this.store.dispatch(OrderActions.loadOrders());
    
    this.store.select(selectAllUsers).subscribe(all => {
      this.users = all;
      this.cdr.detectChanges();
    });
  }

  createUser() {
    this.modal.create({
      nzContent: UserDialogComponent,
      nzClosable: false,
      nzMaskClosable: false,
      nzFooter: null
    }).afterClose.subscribe((res: User | null) => {
      if (res) {
        this.store.dispatch(UserActions.upsertUser({ user: res }));
      }
    });
  }

  onRowClick(userId: number) {
    this.store.dispatch(UserActions.setSelectedUserId({ userId }));
  }

  editUser(user: User) {
    this.modal.create({
      nzContent: UserDialogComponent,
      nzData: user,
      nzClosable: false,
      nzMaskClosable: false,
      nzFooter: null
    }).afterClose.subscribe((updated: User | null) => {
      if (updated) {
        this.store.dispatch(UserActions.upsertUser({ user: updated }));
      }
    });
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }
}
