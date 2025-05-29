import type { ReactNode, Dispatch } from "react";
import { createContext,useContext, useReducer } from "react";

//define TYPES
type User = {
    id: number;
    email: string;
    userName: string;
}

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error?: string
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "LOADING"; payload: boolean }
  | { type: "ERROR"; payload: string };

//INITIAL STATE
const initialState : AuthState = {
  user : null,
  isAuthenticated : false,
  loading : true
}

type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

//CONTEXT
const authContext = createContext<AuthContextType | undefined>(undefined);

//REDUCER function
function authReducer(state : AuthState, action : AuthAction){
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload, isAuthenticated: true, loading: false};
    case 'LOGOUT':
      return {...state, user: null, isAuthenticated: false, loading: false}
    case 'LOADING':
      return {...state, loading : action.payload}
    case 'ERROR':
      return {...state, user: null, isAuthenticated: false, loading: false, error: action.payload}
    default:
      return state;
  }
}

//PROVIDER
export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return(
    <authContext.Provider value={{state, dispatch}}>
      {children}
    </authContext.Provider>
  )
}

//HOOK
export const useAuth = () => {
  
  const context = useContext(authContext);
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
  
}