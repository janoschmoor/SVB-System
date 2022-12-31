import React, { createRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"

export default function Signup(props: any) {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmRef = createRef<HTMLInputElement>();
  const { verifyEmail, signup } = useAuth();
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
//   const history = useHistory()

function handleSubmit(e:React.FormEvent) {
    e.preventDefault()

    if (passwordRef.current && passwordConfirmRef.current) {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match");
            return;
        }
    } else {
        setError("Unknown Error")
        return;
    }

    try {
        setError("")
        if (emailRef.current && passwordRef.current) {
            setLoading(true)
            signup(emailRef.current.value, passwordRef.current.value).then((user:any) => {
                setError("");
                setLoading(false);

                verifyEmail(user).then((arg:any) => {
                    setLoading(false);
                }).catch((err:any) => {
                    console.error(err)
                    setError(err.message);
                    setLoading(false);
                }) 

            }).catch((err: any) => {
                var errorMessage = err.message;
                setError(errorMessage);
                setLoading(false)

            });
            //   history.push("/") inside the then() oc
        } else {
            setError("Unknown Error")
            return;
        }
    } catch {
        setError("Failed to create an account")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Zugang einrichten</h2>
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
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control autoComplete="new-password" type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                Sign Up
                </Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Sie haben schon ein Konto? <span className="link-primary" onClick={() => {props.switchFuntion(false)}}>Login</span>
      </div>
    </>
  )
}
