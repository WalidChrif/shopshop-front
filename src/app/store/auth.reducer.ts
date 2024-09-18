import { Profile } from './../common/profile';
import * as authActions from './auth.actions';

export interface AuthState {
  profile : Profile | null;
}

const initialState: AuthState = {
  profile : null,
};

export function authReducer(
  state = initialState,
  action: authActions.allActions
) {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, profile: action['payload']};
    case authActions.LOGOUT:
      return { user: null };
    default:
      return state;
  }
}
