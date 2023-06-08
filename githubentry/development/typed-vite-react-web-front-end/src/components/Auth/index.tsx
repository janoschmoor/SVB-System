import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Signup from './signup';
import Signout from './signout';
import Signin from './signin';
import VerifyEmail from './verifyEmail';

import { Container } from 'react-bootstrap';



export default function AuthComponent() {

    const [ visitSignUp, setVisitSignUp ] = useState(false);
    const { currentUser } = useAuth();

    const switchFunction = (arg: boolean) => {
        setVisitSignUp(arg);
    }

    return (
        <>  
            <Container fluid>

                {currentUser && currentUser.emailVerified ? 
                    "Willkommen " + currentUser.email
                :
                    ""
                }

                {currentUser ? 
                    (currentUser.emailVerified ? 
                        <Signout />
                    : 
                        <VerifyEmail switchFunction={()=>{switchFunction}} />)
                : 
                    (visitSignUp ? 
                        <Signup switchFuntion={switchFunction}/>
                    : 
                        <Signin switchFuntion={switchFunction}/> )}
            </Container>        
        </>
    )
}
