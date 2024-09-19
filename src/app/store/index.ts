import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';
import * as fromNewAuthReducer from './new-auth.reducer';
export interface AppState {
  authReducer: fromAuthReducer.AuthState;
  newAuthReducer : fromNewAuthReducer.NewAuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer : fromAuthReducer.authReducer,
  newAuthReducer : fromNewAuthReducer.newAuthReducer,
};
