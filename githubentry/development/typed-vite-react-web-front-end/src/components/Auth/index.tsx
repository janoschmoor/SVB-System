import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Signup from './signup';
import Signout from './signout';
import Signin from './signin';
import VerifyEmail from './verifyEmail';


export default function AuthComponent() {

    const [visitSignUp, setVisitSignUp] = useState(false);

    const { currentUser } = useAuth();

    const switchFunction = (arg: boolean) => {
        setVisitSignUp(arg);
    }

    return (
        <>  

            {currentUser && currentUser.emailVerified ? 
                "Willkommen " + currentUser.email
            :
                ""
            }

            {currentUser ? 
                (currentUser.emailVerified ? 
                    <Signout /> : 
                    <VerifyEmail />): 
                (visitSignUp ? 
                    <Signup switchFuntion={switchFunction}/> : 
                    <Signin switchFuntion={switchFunction}/> )}
            
        </>
    )
}
