import { Action } from "@ngrx/store"
import { User } from '../common/user';

export const LOGIN = 'LOGIN' 
export const LOGOUT = 'LOGOUT' 
export type allActions = login | logout;

export class login implements Action{
    readonly type = LOGIN;
    constructor(public payload : User){}
}
export class logout implements Action{
    readonly type = LOGOUT;
    constructor(){}
}
