import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserService } from '../../../infrastructure/services/user.service';

import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
actions$ = inject(Actions);
userService = inject(UserService)

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => 
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  loadUserDetailsOnSelect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setSelectedUserId),
      map(action => action.userId),
      map(userId => userId !== null ? UserActions.loadUserDetails({ userId }) : { type: '[User] No Action' })
    );
  });

  loadUserDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUserDetails),
      switchMap(action => 
        this.userService.getUserDetails(action.userId).pipe(
          map(res => UserActions.loadUserDetailsSuccess({ 
            userId: action.userId, 
            details: res.details 
          })),
          catchError(error => of(UserActions.loadUserDetailsFailure({ error })))
        )
      )
    );
  });
}