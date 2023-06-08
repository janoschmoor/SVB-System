import React, { createRef, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
// import { Link, useHistory } from "react-router-dom"

export default function Signup(props: any) {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const { signin } = useAuth();
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
//   const history = useHistory()

function handleSubmit(e:React.FormEvent) {
    e.preventDefault()

    setError("")
    if (emailRef.current && passwordRef.current) {
        setLoading(true)
        signin(emailRef.current.value, passwordRef.current.value).then(() => {
            setError("");
            setLoading(false)
        }).catch((err: any) => {
            var errorMessage = err.message;
            setError(errorMessage);
            setLoading(false)
        });
        //   history.push("/") inside the then() oc
    } else {
        setError("Unbekannter Fehler")
        return;
    }
  }

  return (
    <>
      <Card body>
          <h2 className="text-center mb-4">Einloggen</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete="email" type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete="new-password" type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Einloggen
                </Button>
            </Form>
      </Card>
      <div className="w-100 text-center mt-2">
        Noch kein Konto? <span className="link-primary" onClick={() => {props.switchFuntion(true)}}>Konto einrichten</span>
      </div>
    </>
  )
}
