import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';
import { UserState } from './user.state';
import { User } from '../../domain/user/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  allUsers$: Observable<User[]>;
  selectedUser$: Observable<User | null>;

  constructor(private store: Store<UserState>) {
    this.allUsers$ = this.store.select(UserSelectors.selectAllUsers);
    this.selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  }

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }

  upsertUser(user: User) {
    this.store.dispatch(UserActions.upsertUser({ user }));
  }

  updateUserEntity(update: Update<User>) {
    this.store.dispatch(UserActions.updateUserEntity({ update }));
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  setSelectedUserId(id: number | null) {
    this.store.dispatch(UserActions.setSelectedUserId({ userId: id }));
  }

  loadUserDetails(id: number) {
    this.store.dispatch(UserActions.loadUserDetails({ userId: id }));
  }
}
