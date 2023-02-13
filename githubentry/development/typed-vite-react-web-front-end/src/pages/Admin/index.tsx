import React from 'react'
import LayoutComponent from '../../components/Layout';
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { Link, redirect, useNavigate } from "react-router-dom"
import { Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { CardHeading } from 'react-bootstrap-icons';
import CollectionInspectorComponent from './TestingGround/components/CollectionInspectorComponent';

export default function AdminPage() {

    const settings = {
        allowLoadMore: false,
        showActionbar: false,
        defaultTableSettings: [
            { key: "status", disp: "#", isDefaultTable: true, type: "select", selectOptions: [{key: "created", disp: "Neu"}, {key: "active", disp: "Aktiv"}, {key: "error", disp: "Fehler"}, {key: "issue", disp: "Problem"}]},
            { key: "first_name", disp: "Vorname", isDefaultTable: true, type: "text" },
            { key: "last_name", disp: "Nachname", isDefaultTable: true, type: "text" },
            { key: "date_of_birth", disp: "Geburtstag", isDefaultTable: true, type: "date" },
        ],
        queryConstructor: [
            {type: "limit", value: 5},
            {type: "orderBy", key: "created_at_numeric", operator: "desc"}
        ]
    }

    const navigate = useNavigate();
  
    return (
        <LayoutComponent>

            <Container fluid>
                <Row>
                    <Col sm="8">
                        <Card onClick={() => {
                                navigate("/admin/testing_ground")
                            }}>
                            <CardHeader>
                                Jüngste Mitglieder
                            </CardHeader>
                            <CollectionInspectorComponent settings={settings} />
                        </Card>

                    </Col>
                    <Col sm="4">
                        <Card onClick={() => {
                                // navigate("/admin")
                            }}>
                            <CardHeader>
                                Kurse heute
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container fluid>

                <Row>
                    <Col sm="6">
                        <Card onClick={() => {
                            // navigate("/admin")
                        }}>
                            <CardHeader>
                                Diesdas
                            </CardHeader>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card onClick={() => {
                            // navigate("/admin")
                        }}>
                            <CardHeader>
                                ananas
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </LayoutComponent>
    )
}
