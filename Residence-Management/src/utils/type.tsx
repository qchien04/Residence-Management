import { Action } from "redux";

export interface User{
    email:string;
    roles:string[];
    permissions:string[];
    name:string;
    avt?:string;
}
export interface AuthState{
    isAuthenticated?:boolean;
    isInitialized?:boolean;
    user:User|null;
}

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
  }
  
export interface PayloadAction<T> extends Action<string>{
    type: AuthActionType;
    payload: T;
  }
  
  
export const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
  };
  

export type normalizeAuthType={
    type:string,
    payload:AuthState,
  }
