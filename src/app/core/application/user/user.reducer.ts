import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return userAdapter.setAll(users, state);
  }),
  on(UserActions.loadUsersFailure, (state, { error }) => state),

  on(UserActions.upsertUser, (state, { user }) => {
    return userAdapter.upsertOne(user, state);
  }),

  on(UserActions.updateUserEntity, (state, { update }) => {
    return userAdapter.updateOne(update, state);
  }),

  on(UserActions.deleteUser, (state, { userId }) => {
    const newState = userAdapter.removeOne(userId, state);
    
    return {
      ...newState,
      selectedUserId: newState.entities[userId] ? state.selectedUserId : null
    };
  }),


  on(UserActions.setSelectedUserId, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),

  on(UserActions.loadUserDetailsSuccess, (state, { userId, details }) => {
    return userAdapter.updateOne(
      { id: userId, changes: { details } },
      state
    );
  })
);
