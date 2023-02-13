import React from 'react'
import { Container, Spinner, Button } from 'react-bootstrap'
import LayoutComponent from '../../components/Layout';

export default function LoadingPage() {
  return (
    // <LayoutComponent>
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            {/* <Button variant="primary">
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            </Button> */}

            <img width={90} height={90} src='/mico_loading2.png'></img>

        </Container>
    // </LayoutComponent>
  )
}
