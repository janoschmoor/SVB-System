import React, { createRef, useState } from 'react'
import { Card, Alert, Form, Button } from 'react-bootstrap';

export default function Address() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const firstName = createRef<HTMLInputElement>();
    const lastName = createRef<HTMLInputElement>();

    function handleSubmit() {

    }

  return (
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Addresse</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete="email" type="email" ref={firstName} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete="new-password" type="password" ref={lastName} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Einloggen
                </Button>
            </Form>
        </Card.Body>
    </Card>
  )
}
