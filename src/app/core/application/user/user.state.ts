import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { User } from '../../domain/user/user.model';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: false,
});

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
});