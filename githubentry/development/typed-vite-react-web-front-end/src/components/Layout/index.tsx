import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthComponent from '../Auth';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Link, useNavigate } from "react-router-dom"
import { Bell, ChevronLeft, House, List, MenuButton, Person, PersonFillCheck, Sliders } from 'react-bootstrap-icons';
import { Card, Col, Collapse, FormControl, NavbarBrand, NavItem, NavLink, Row } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import UserPreviewComponent from './components/UserPreviewComponent';
import MenuCollapsed from './components/MenuCollapsed';

export default function LayoutComponent({children}: {children: any}) {
    const { currentUser } = useAuth();
    const [ showAuth, setShowAuth ] = useState(false);
    const [ menuIsOpen, setMenuIsOpen ] = useState(false);

    const toggleAuth = () => setShowAuth(!showAuth);
    const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

    const navigate = useNavigate();

    return (
        <>
            <Container fluid>
                <Row className="row justify-content-center">
                    <Col className="col-auto">

                        {/* <div style={{ minWidth: "10" }}>idk</div> */}
                        <div style={{minWidth: 'auto' }}>
                            
                            <MenuCollapsed show={menuIsOpen} />
                        </div>
                    
                    </Col>
                    <Col>
                        <Navbar className="sticky-top shadow-sm p-3 mb-2 bg-white rounded">

                            <Button variant="outline-primary" className='me-2' onClick={toggleMenu}>{menuIsOpen ? <ChevronLeft></ChevronLeft> : <List></List>}</Button>
                            <NavbarBrand>SVB</NavbarBrand>

                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <NavLink href="#action1">Home</NavLink>
                                <NavLink href="#action2">Link</NavLink>
                                

                            </Nav>
                            <div className='rounded mr'><Bell></Bell></div>
                            <UserPreviewComponent openAuth={() => {toggleAuth()}} />

                        </Navbar>

                        { children }
                    
                    </Col>
                </Row>
            </Container>

            <Offcanvas placement={'end'} show={showAuth} onHide={toggleAuth}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Authentifizierung</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AuthComponent />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
