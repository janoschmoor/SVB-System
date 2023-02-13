import React, { useState } from 'react'
import LayoutComponent from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Address from './address';
import AuthComponent from '../../components/Auth';

export default function ProfilePage() {

    const { currentUser } = useAuth();

    return (
        <LayoutComponent>

            {/* {currentUser ? currentUser.email : ""} */}
            <Container fluid>
                <AuthComponent></AuthComponent>
            </Container>
            
        </LayoutComponent>
    )
}
