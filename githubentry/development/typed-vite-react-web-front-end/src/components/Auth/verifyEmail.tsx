import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail( props : {switchFunction: Function}) {
    const navigate = useNavigate();
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const { verifyEmail, currentUser, signout } = useAuth();

    const handleVerification = () => {
        setLoading(true);
        setError("");
        verifyEmail(currentUser).then((arg:any) => {
            console.log(arg)
            console.log("resolves positive")
            setLoading(false);
        }).catch((err:any) => {
            console.error(err)
            setError(err.message);
            setLoading(false);
        })
    }

    return (
        <>
            <h2>Verifizieren Sie Ihre Email</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <button type="button" className='btn w-100 btn-outline-primary' onClick={() => {handleVerification()}}>Erneut senden</button>
            <div className="w-100 text-center mt-2">
                Email bestätigt? Dann können Sie sich jetzt <span className="link-primary" onClick={() => {props.switchFunction(true);signout()}}>Anmelden</span>
            </div>
        </>
    )
}
