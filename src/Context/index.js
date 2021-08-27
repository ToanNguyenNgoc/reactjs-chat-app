import React, {useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase/config'

export const AuthContext = React.createContext();
export default function AuthProvider({children}){
      const [user, setUser] = useState({})
      const history = useHistory();
      useEffect(()=>{
            const unSubscribed = auth.onAuthStateChanged((user)=>{
                  console.log(user);
                  if(user){
                        const {displayName, email, photoURL, uid} = user;
                        setUser({
                              displayName, email, photoURL, uid
                        });
                        history.push('/home');
                  }else{
                        setUser({});
                        history.push('/login')
                  }
            });
            return ()=>{
                  unSubscribed();
            }
      },[history])
      return (
            <AuthContext.Provider value={{user}}>
                  {children}
            </AuthContext.Provider>
      )
}