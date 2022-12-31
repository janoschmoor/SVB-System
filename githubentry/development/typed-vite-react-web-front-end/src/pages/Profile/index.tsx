import React, { useState } from 'react'
import LayoutComponent from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Address from './address';

export default function ProfilePage() {

    const { currentUser } = useAuth();

    return (
        <LayoutComponent>

            {/* {currentUser ? currentUser.email : ""} */}
            <Container>
                <Row>
                    <Col md={3}>
                        <Image src="profile-picture.jpg" rounded />
                    </Col>
                    <Col md={9}>
                        <h4>Profil</h4>
                        <h2>{"name"}</h2>
                        <Address />
                    </Col>
                </Row>
            </Container>
            
        </LayoutComponent>
    )
}
