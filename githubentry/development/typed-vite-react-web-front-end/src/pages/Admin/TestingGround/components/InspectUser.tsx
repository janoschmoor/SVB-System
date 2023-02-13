import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Form, Button, Nav, Tab, Tabs, Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import IUser from '../../../../interfaces/user/user';

export default function InspectUser(props: {user: IUser, editing: boolean}) {

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setEditing(props.editing);
    }, [props.editing]);

    return (
        <>
            <Tabs
            defaultActiveKey="personal"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
                <Tab eventKey="personal" title="Person">
                    

                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>Vorname</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.first_name} name="firstName" placeholder="Vorname" required />
                        </Form.Group>

                        

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Nachname</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.last_name} name="lastName" placeholder="Nachname" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group sm="3" as={Col} controlId="formGridFormOfAdress">
                            <Form.Label>Anrede</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.form_of_adress} name="formOfAdress" placeholder="Anrede" required />
                        </Form.Group>
                        <Form.Group sm="9" as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.email} name="email" placeholder="Email" type="email" required />
                            <Form.Control.Feedback type="invalid">Email ist ungültig</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group sm="9" as={Col} controlId="formGridPhoneNumbers">
                            <Form.Label>Telefonnummer</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.phone_numbers.default} name="phoneNumbers" placeholder="Telefonnummer" required/>
                        </Form.Group>
                        <Form.Group sm="3" as={Col} controlId="formGridPrefferedLanguage">
                            <Form.Label>Sprache</Form.Label>
                            <Form.Select disabled={!editing} defaultValue={props.user.preffered_language} name="prefferedLanguage" placeholder="Sprache">
                                {["d", "f", "i", "e"].map(s => {return (<option key={s}>{s}</option>)})}
                            </Form.Select>
                            {/* <Form.Control disabled={!editing} defaultValue={props.user.status} name="status" placeholder="Status" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridPortrait">
                            <Form.Label>Portrait URL</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.portrait_url ? props.user.portrait_url : "" } name="portraitUrl" placeholder="Portrait URL" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridNote">
                            <Form.Label>Notiz</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.note} name="note" placeholder="Notiz" />
                        </Form.Group>
                    </Row>
                    


                </Tab>
                <Tab eventKey="adress" title="Adresse">


                    <Row className="mb-1">
                        <Form.Group sm="9" as={Col} controlId="formGridStreet">
                            <Form.Label>Strasse</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.street} name="street" placeholder="Strasse" required />
                        </Form.Group>

                        <Form.Group sm="3" as={Col} controlId="formGridHouseNumber">
                            <Form.Label>Nr.</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.house_number} name="houseNumber" type="text" placeholder="Nr." required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-1">
                        <Form.Group sm="4" as={Col} controlId="formGridPostalCode">
                            <Form.Label>PLZ</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.postal_code} name="postalCode" placeholder="PLZ" required />
                        </Form.Group>
                        <Form.Group sm="4" as={Col} controlId="formGridCity">
                            <Form.Label>Stadt</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.city} name="city" placeholder="Stadt" required />
                        </Form.Group>
                        <Form.Group sm="4" as={Col} controlId="formGridCountry">
                            <Form.Label>Land</Form.Label>
                            <Form.Control disabled={!editing} defaultValue={props.user.country} name="country" placeholder="Land" required />
                        </Form.Group>
                    </Row>



                        {/* <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}

                        {/* <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                            </Form.Group>
                        </Row> */}

                </Tab>
                <Tab eventKey="contact" title="Kontakt">
                    feld3
                </Tab>
                <Tab eventKey="config" title="Konfig">
                    

                    <Container fluid>
                        <Row className="mb-1">
                            <Form.Group as={Col} sm={8} controlId="formGridId">
                                <Form.Label>UID</Form.Label>
                                <Form.Control disabled defaultValue={props.user.id} placeholder="Universal Identifier" />
                            </Form.Group>

                            {/* <Form.Group as={Col} sm={4} controlId="formGridRoles">
                                <Form.Label>Rollen</Form.Label>
                                <br></br>
                                {
                                    editing ?
                                        <Form.Control defaultValue={props.user.roles} type="array" name="roles" placeholder="Rollen" required/>
                                    :
                                        props.user.roles.map((role, index) => {return <Fragment key={index}><Badge className='mr-1' pill bg="primary">{role.toUpperCase()}</Badge>{" "}</Fragment>})
                                }
                                
                            </Form.Group> */}
                        </Row>
                        <Row className="mb-1">
                            <Form.Group sm={4} as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select size="sm" disabled={!editing} defaultValue={props.user.status} name="status" placeholder="Status" required>
                                    {["active", "passive"].map(s => {return (<option key={s}>{s}</option>)})}
                                </Form.Select>
                                {/* <Form.Control disabled={!editing} defaultValue={props.user.status} name="status" placeholder="Status" required /> */}
                            </Form.Group>
                        </Row>
                    </Container>

                </Tab>
            </Tabs>
        </>
    )
}