import { User } from '../common/user';
import * as authActions from './auth.actions';

export interface AuthState {
  user : User;
}

const initialState: AuthState = {
  user : null,
};

export function authReducer(state = initialState, action: authActions.allActions) {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, user: action['payload']};
    case authActions.LOGOUT:
      return { user: null };
    default:
      return state;
  }
}


