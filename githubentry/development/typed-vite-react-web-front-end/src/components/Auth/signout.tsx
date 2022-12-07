import React, { createRef, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
// import { Link, useHistory } from "react-router-dom"

export default function Signout() {

  const { signout, currentUser } = useAuth();
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
//   const history = useHistory()

function handleSignout() {
      setError("")
      setLoading(true)
      signout().then(() => {
          setError("");
          setLoading(false)
      }).catch((err: any) => {
          var errorMessage = err.message;
          setError(errorMessage);
          setLoading(false)
      });
      //   history.push("/") inside the then() oc
  }

  return (
    <>

          {error && <Alert variant="danger">{error}</Alert>}
            
            <Button disabled={loading} onClick={handleSignout} className="w-100 mt-2">
            {loading ? 'Laden…' : 'Ausloggen'}
            </Button>
    </>
  )
}
