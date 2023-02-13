import React, { useContext, useEffect, useState } from 'react'
import { loadDocument, loadDocumentSnapshot } from '../services/firestore/firestore';

const SystemContext = React.createContext<any>({
  currentUser: null,
  signup: null,
  signout: null,
  signin: null,
  verifyEmail: null,
});

const SystemProvider = ({children}: {children: any}) => {
  const [ SystemState, setSystemState ] = useState<any>(null);

  
  useEffect(() => {
    return loadDocumentSnapshot('SYSTEM/default', (snapshot: any) => {
      setSystemState(snapshot.data());
    });
  }, []);

  const value = {
    SystemState: SystemState,
  }
  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  return useContext(SystemContext);
}

export default SystemProvider;