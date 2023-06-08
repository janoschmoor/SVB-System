import { createUserWithEmailAndPassword, onAuthStateChanged, onIdTokenChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, Unsubscribe, User, UserCredential } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { loadDocumentSnapshot } from '../services/firestore/firestore';

interface IProviderValues {
  currentUser: User | null;
  currentUserData: any | null;
  currentUserCustomClaims: any | null;
  signup: any | null;
  signout: any | null;
  signin: any | null;
  verifyEmail: any | null;
}

const AuthContext = React.createContext<IProviderValues>({
  currentUser: null,
  currentUserData: null,
  currentUserCustomClaims: null,
  signup: null,
  signout: null,
  signin: null,
  verifyEmail: null,
});

const AuthProvider = ({children}: {children: any}) => {
  const [ currentUser, setCurrentUser ] = useState<User | null>(null);
  const [ currentUserData, setCurrentUserData ] = useState(null);
  const [ currentUserCustomClaims, setCurrentUserCustomClaims ] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged(auth, async (user) => {
  //     console.log("hello")
  //     if (user) {
  //       console.log("nr1")
  //       const tokenResult = await user.getIdTokenResult(true);
  //       console.log(tokenResult)
  //       setCurrentUserCustomClaims(tokenResult.claims);
  //     } else {
  //       console.log("nr2")
  //       setCurrentUserCustomClaims(null);
  //     }
  //   });
  //
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        setCurrentUserCustomClaims(idTokenResult.claims);
      });
  } else {
    setCurrentUserData(null);
  }
  }, [ currentUser ])

  useEffect(() => {
    if (currentUserCustomClaims)  {
      const unsubscribe = loadDocumentSnapshot(`users/${currentUserCustomClaims.doc_id}`, (snapshot: any) => {
        setCurrentUserData(snapshot.data())
      })
      return unsubscribe;
    } else {
      setCurrentUserData(null);
    }
  }, [ currentUserCustomClaims ]);

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
    currentUserData: currentUserData,
    currentUserCustomClaims: currentUserCustomClaims,
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