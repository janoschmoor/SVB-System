import React from 'react'
import { Container, Spinner, Button } from 'react-bootstrap'
import LayoutComponent from '../../components/Layout';

export default function LoadingPage() {
  return (
    // <LayoutComponent>
        <Container className="text-center">
            <Button variant="primary">
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                {/* Laden... */}
            </Button>
        </Container>
    // </LayoutComponent>
  )
}
