import React from 'react'
import LayoutComponent from '../../components/Layout';
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

export default function AdminPage() {
  
  return (
    <LayoutComponent>

        <Container fluid>
          <Card>
            <Card.Body>
              c1
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              c2
            </Card.Body>
          </Card>
        </Container>
        
        <Link to="/admin/users">Users</Link>

    </LayoutComponent>
  )
}
