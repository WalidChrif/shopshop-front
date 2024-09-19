import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './new-auth.actions';
import { Profile } from '../common/profile';

export interface NewAuthState {
  profile: Profile | null;
}

const initialState: NewAuthState = {
  profile: null,
};

// Reducer function
export const newAuthReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, profile) => ({...state,profile: profile,})),
  on(AuthActions.logout, (state) => ({...state,profile: null,}))
);

// A function that wraps the reducer for proper typing
export function reducer(state: NewAuthState | undefined, action: Action) {
  return newAuthReducer(state, action);
}
