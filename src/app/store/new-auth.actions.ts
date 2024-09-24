import { createAction, props } from '@ngrx/store';
import { User } from '../common/user';

// Define login action with payload
export const login = createAction(
  '[Auth] Login',
  props<User>()
);

// Define logout action with no payload
export const logout = createAction('[Auth] Logout');
