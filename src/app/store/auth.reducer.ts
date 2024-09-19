import { Profile } from './../common/profile';
import * as authActions from './auth.actions';

export interface AuthState {
  profile : Profile;
}

const initialState: AuthState = {
  profile : null,
};

export function authReducer(state = initialState, action: authActions.allActions) {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, profile: action['payload']};
    case authActions.LOGOUT:
      return { profile: null };
    default:
      return state;
  }
}


