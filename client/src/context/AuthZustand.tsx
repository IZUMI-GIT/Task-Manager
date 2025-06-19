import { create } from 'zustand';

type User = {
    id: string,
    userName : string,
    email : string
}

type AuthStoreState = {
    user : User | null,
    isAuthenticated : boolean,
    loading : boolean,
    error : string | null
}

type AuthStoreAction = {
    LOGIN : (user : User) => void,
    LOGOUT : () => void,
    LOADING : () => void,
    ERROR : (error : string) => void
}

type AuthStore =  AuthStoreState & AuthStoreAction

export const useAuthStore =  create<AuthStore>((set) => ({

    user : null,
    isAuthenticated : false,
    loading : false,
    error : null,

    LOGIN: (user) => set({user, isAuthenticated: true, loading: false}),
    LOGOUT: () => set({user: null, isAuthenticated: false, loading: false}),
    LOADING : () => set({loading : true}),
    ERROR: (error) => set({error})
}))