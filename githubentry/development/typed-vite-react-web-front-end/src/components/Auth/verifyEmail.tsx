import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap"

export default function VerifyEmail() {
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const { verifyEmail, currentUser } = useAuth();

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
        </>
    )
}
