import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './new-auth.actions';
import { User } from '../common/user';

export interface NewAuthState {
  user: User | null;
}

const initialState: NewAuthState = {
  user: null,
};

// Reducer function
export const newAuthReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, user) => ({...state,user: user,})),
  on(AuthActions.logout, (state) => ({...state,user: null,}))
);

// A function that wraps the reducer for proper typing
export function reducer(state: NewAuthState | undefined, action: Action) {
  return newAuthReducer(state, action);
}
