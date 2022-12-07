import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

interface IProviderValues {
  currentUser: User | null;
  signup: any | null;
  signout: any | null;
  signin: any | null;
  verifyEmail: any | null;
}

const AuthContext = React.createContext<IProviderValues>({
  currentUser: null,
  signup: null,
  signout: null,
  signin: null,
  verifyEmail: null,
});

const AuthProvider = ({children}: {children: any}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  
  useEffect(() => {
    // console.warn("AuthUseEffect")
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.warn("AuthOnAuthStateChanged", user)
      setCurrentUser(user); 
    })
    return unsubscribe;
  }, []);

  function signup( email: string, password: string ):Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signin( email: string, password: string ):Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signout() {
    return signOut(auth);
  }
  function verifyEmail(user: User) {
    return sendEmailVerification(user);
  }

  const value = {
    currentUser: currentUser,
    signup: signup,
    signout: signout,
    signin: signin,
    verifyEmail: verifyEmail,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;