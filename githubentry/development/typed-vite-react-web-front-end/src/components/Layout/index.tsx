import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthComponent from '../Auth';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom"

export default function LayoutComponent({children}: {children: any}) {
    const { currentUser } = useAuth();
    const [ showAuth, setShowAuth ] = useState(false);

    const handleCloseAuth = () => setShowAuth(false);
    const handleShowAuth = () => setShowAuth(true);

    return (
        <>
            <Navbar className='mb-2' bg="light shadow-sm p-3 rounded" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand><Link style={{ textDecoration: 'none' }} to="/">SVB</Link></Navbar.Brand>
                    <Button variant='outline-secondary' onClick={handleShowAuth}>
                    {currentUser !== null && currentUser.email ? 
                        currentUser.displayName ? currentUser.displayName : currentUser.email.split("@")[0]
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        </svg>
                    }
                    </Button>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto outline">
                        <Nav.Item><Link style={{ textDecoration: 'none' }} to="/home">Home</Link></Nav.Item>
                        <Nav.Item><Link style={{ textDecoration: 'none' }} to="/admin">Admin</Link></Nav.Item>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Offcanvas placement={'end'} show={showAuth} onHide={handleCloseAuth}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Authentifizierung</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AuthComponent />
                </Offcanvas.Body>
            </Offcanvas>

            {children}
        </>
    )
}
