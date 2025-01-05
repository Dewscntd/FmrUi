import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState, userAdapter } from './user.state';

export const selectUserFeature = createFeatureSelector<UserState>('users');

const {
  selectEntities,
  selectAll,
} = userAdapter.getSelectors();

export const selectAllUsers = createSelector(
  selectUserFeature,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUserFeature,
  selectEntities
);

export const selectSelectedUserId = createSelector(
  selectUserFeature,
  (state) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => {
    if (selectedId == null) return null;
    return entities[selectedId] ?? null;
  }
);
