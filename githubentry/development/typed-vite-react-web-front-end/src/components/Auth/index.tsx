import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Signup from './signup';
import Signout from './signout';
import Signin from './signin';
import VerifyEmail from './verifyEmail';

import { setUserAccessLevel } from '../../services/functions';
import { Button, Container, Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';



export default function AuthComponent() {

    const [visitSignUp, setVisitSignUp] = useState(false);
    const { currentUser } = useAuth();

    const [ loading, setLoading ] = useState(false);

    const switchFunction = (arg: boolean) => {
        setVisitSignUp(arg);
    }

    const changeAccessLevel = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setUserAccessLevel({
            newClaims: {roles: [], access_level: parseInt(e.target[0].value)},
            userId: e.target[1].value ? e.target[1].value : currentUser?.uid,
        }).then((res:any) => {
            setLoading(false);
            console.log(res)
        }).catch((err:any)=> {console.error(err); setLoading(false)});
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
                        <Signout /> : 
                        <VerifyEmail />): 
                    (visitSignUp ? 
                        <Signup switchFuntion={switchFunction}/> : 
                        <Signin switchFuntion={switchFunction}/> )}
            </Container>
                    
            {currentUser && currentUser.email == "janosch.moor@gmail.com" ? 
                <Container className='mt-5'>
                    <Form onSubmit={changeAccessLevel}>
                        <FormSelect aria-label="Default select example">
                            <option value="0">Client</option>
                            <option value="1000">Coach</option>
                            <option value="2000">Admin</option>
                        </FormSelect>
                        <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
                            <FormLabel>User Id</FormLabel>
                            <FormControl placeholder="leave empty for currentUser.uid"/>
                        </FormGroup>
                        <Button disabled={loading} variant="primary" type="submit">
                            {loading ? "loading...":"Request Access"}
                        </Button>
                    </Form>
                </Container>
            : 
            <></>
            }
            
            
        </>
    )
}
