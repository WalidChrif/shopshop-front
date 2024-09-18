import { Action } from "@ngrx/store"
import { Profile } from './../common/profile';

export const LOGIN = 'LOGIN' 
export const LOGOUT = 'LOGOUT' 

export class login implements Action{
    type = LOGIN;
    constructor(public payload : Profile){}
}
export class logout implements Action{
    type = LOGOUT;
    constructor(){}
}

export type allActions = login | logout;