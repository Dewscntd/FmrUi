import { createAction, props } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { User } from '../../domain/user/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const upsertUser = createAction(
  '[User] Upsert User',
  props<{ user: User }>()
);

export const updateUserEntity = createAction(
  '[User] Update User Entity',
  props<{ update: Update<User> }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const setSelectedUserId = createAction(
  '[User] Set Selected User Id',
  props<{ userId: number | null }>()
);

export const loadUserDetails = createAction(
  '[User] Load User Details',
  props<{ userId: number }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User] Load User Details Success',
  props<{ userId: number; details: string }>()
);

export const loadUserDetailsFailure = createAction(
  '[User] Load User Details Failure',
  props<{ error: any }>()
);
