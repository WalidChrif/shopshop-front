import { Action } from "@ngrx/store"
import { Profile } from './../common/profile';

export const LOGIN = 'LOGIN' 
export const LOGOUT = 'LOGOUT' 
export type allActions = login | logout;

export class login implements Action{
    readonly type = LOGIN;
    constructor(public payload : Profile){}
}
export class logout implements Action{
    readonly type = LOGOUT;
    constructor(){}
}
