import { createAction, props } from '@ngrx/store';
import { Profile } from '../common/profile';

// Define login action with payload
export const login = createAction(
  '[Auth] Login',
  props<Profile>()
);

// Define logout action with no payload
export const logout = createAction('[Auth] Logout');
