import { JSXElementConstructor, useEffect, useState } from "react";
import { Modal, Form, Button, Tabs, Tab, ModalHeader, ModalTitle, Row, Col, Alert, Container, TabPane, ModalFooter, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Pen, Unlock } from "react-bootstrap-icons";
import { useSystem } from "../../../../contexts/systemContext";


export default function EntityDetails(props: {type: string, entity: any}) {

    const [ validated, setValidated ] = useState(false);
    const [ lastValidationFailed, setLastValidationFailed ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ tabKey, setTabKey ] = useState("personal");

    const SystemState = useSystem();

    useEffect(() => {
        console.log(SystemState)
    }, [SystemState])
    
    const Input = (key: string, systemstate: any) => {
        if (!systemstate) return <p>also no</p>
        var prot = eval(`systemstate.query.${props.type}.keys.find((k: any) => k.key == ${key})`)
        return prot ?
            (
                <FormGroup as={Col}>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl disabled={!editing} defaultValue={props.entity.first_name} name="firstName" placeholder="Vorname" required />
                </FormGroup>
            )
        :  <p>no</p>
    }
    
    const onSubmit = (e:any) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            setLastValidationFailed(true);
            // console.log(event, form)
        } else {
            setLastValidationFailed(false);
            uploadEntityData(new FormData(form));
        }
        setValidated(true);
    }
    const uploadEntityData = (form: any) => {

        console.log(form)
        // const updates = compileUpdates(form, props.entity);
        // var userUpdate = {...props.entity, ...updates};

        // updateUser({user: userUpdate}).then((data) => {
            
        // }).catch((err) => console.error(err.message))
    }

    const renderUser = () => {
        if (!props.entity) {
            return <Alert variant="danger">Daten konnten nicht geladen werden</Alert>
        }
        return (
            <Tabs
            className="mb-3"
            activeKey={tabKey}
            onSelect={(k) => {
                if (typeof(k) == 'string') {
                    setTabKey(k)
                }
            }}
            >
                <Tab eventKey="personal" title="Person">
                    <Container fluid>
                        <Row className="mb-1">
                            {Input("last_name", SystemState)}
                            

                            

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Nachname</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.last_name} name="lastName" placeholder="Nachname" required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group sm="3" as={Col} controlId="formGridFormOfAdress">
                                <Form.Label>Anrede</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.form_of_adress} name="formOfAdress" placeholder="Anrede" required />
                            </Form.Group>
                            <Form.Group sm="9" as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.email} name="email" placeholder="Email" type="email" required />
                                <Form.Control.Feedback type="invalid">Email ist ungültig</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group sm="9" as={Col} controlId="formGridPhoneNumbers">
                                <Form.Label>Telefonnummer</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.phone_numbers.default} name="phoneNumbers" placeholder="Telefonnummer" required/>
                            </Form.Group>
                            <Form.Group sm="3" as={Col} controlId="formGridPrefferedLanguage">
                                <Form.Label>Sprache</Form.Label>
                                <Form.Select disabled={!editing} defaultValue={props.entity.preffered_language} name="prefferedLanguage" placeholder="Sprache">
                                    {["d", "f", "i", "e"].map(s => {return (<option key={s}>{s}</option>)})}
                                </Form.Select>
                                {/* <Form.Control disabled={!editing} defaultValue={props.entity.status} name="status" placeholder="Status" required /> */}
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridPortrait">
                                <Form.Label>Portrait URL</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.portrait_url ? props.entity.portrait_url : "" } name="portraitUrl" placeholder="Portrait URL" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridNote">
                                <Form.Label>Notiz</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.note} name="note" placeholder="Notiz" />
                            </Form.Group>
                        </Row>
                    </Container>

                </Tab>
                <Tab eventKey="adress" title="Adresse">

                    <Container fluid>
                        <Row className="mb-1">
                            <Form.Group sm="9" as={Col} controlId="formGridStreet">
                                <Form.Label>Strasse</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.street} name="street" placeholder="Strasse" required />
                            </Form.Group>

                            <Form.Group sm="3" as={Col} controlId="formGridHouseNumber">
                                <Form.Label>Nr.</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.house_number} name="houseNumber" type="text" placeholder="Nr." required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-1">
                            <Form.Group sm="4" as={Col} controlId="formGridPostalCode">
                                <Form.Label>PLZ</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.postal_code} name="postalCode" placeholder="PLZ" required />
                            </Form.Group>
                            <Form.Group sm="4" as={Col} controlId="formGridCity">
                                <Form.Label>Stadt</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.city} name="city" placeholder="Stadt" required />
                            </Form.Group>
                            <Form.Group sm="4" as={Col} controlId="formGridCountry">
                                <Form.Label>Land</Form.Label>
                                <Form.Control disabled={!editing} defaultValue={props.entity.country} name="country" placeholder="Land" required />
                            </Form.Group>
                        </Row>
                    </Container>

                </Tab>
                <Tab eventKey="contact" title="Kontakt">
                    feld3
                </Tab>
                <Tab eventKey="config" title="Konfig">
                    

                    <Container fluid>
                        <Row className="mb-1">
                            <Form.Group as={Col} sm={8} controlId="formGridId">
                                <Form.Label>UID</Form.Label>
                                <Form.Control disabled defaultValue={props.entity.id} placeholder="Universal Identifier" />
                            </Form.Group>

                            {/* <Form.Group as={Col} sm={4} controlId="formGridRoles">
                                <Form.Label>Rollen</Form.Label>
                                <br></br>
                                {
                                    editing ?
                                        <Form.Control defaultValue={props.entity.roles} type="array" name="roles" placeholder="Rollen" required/>
                                    :
                                        props.entity.roles.map((role, index) => {return <Fragment key={index}><Badge className='mr-1' pill bg="primary">{role.toUpperCase()}</Badge>{" "}</Fragment>})
                                }
                                
                            </Form.Group> */}
                        </Row>
                        <Row className="mb-1">
                            <Form.Group sm={4} as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select size="sm" disabled={!editing} defaultValue={props.entity.status} name="status" placeholder="Status" required>
                                    {["active", "passive"].map(s => {return (<option key={s}>{s}</option>)})}
                                </Form.Select>
                                {/* <Form.Control disabled={!editing} defaultValue={props.entity.status} name="status" placeholder="Status" required /> */}
                            </Form.Group>
                        </Row>
                    </Container>

                </Tab>


                <Tab eventKey="raw" title="JSON">
                    <Container fluid>
                        {   
                            JSON.stringify(props.entity, undefined, 2)
                        }
                    </Container>
                </Tab>
            </Tabs>
        );
    }

    const renderType = () => {
        if (!props.entity) {
            return <Alert variant="danger">Daten konnten nicht geladen werden</Alert>
        }
        switch (props.type) {
            case "users":
                return renderUser();

            default:
                return "idfk"
        }
    }
    
    return (
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <ModalHeader closeButton>
                <ModalTitle>
                    {
                        editing ? 
                            <Button onClick={() => {setEditing(!editing)}} variant="outline-dark" className="mr-4"><Unlock/></Button> 
                        :
                            <Button onClick={() => {setEditing(!editing)}} variant="outline-dark" className="mr-4"><Pen/></Button>
                    } {" "}
                    Inspektor
                </ModalTitle>
            </ModalHeader>

            {renderType()}
            
            {/* {
                user ?
                    <Modal.Body>
                        <InspectUser user={user} editing={editing} />
                    </Modal.Body>
                : 
                    <Alert variant='danger'>Nutzer nicht definiert</Alert>
            } */}
            
            <ModalFooter>
                <Row className='w-100'>
                    <Col sm="7">
                        {
                            lastValidationFailed ? 
                            <Alert variant="danger">Nicht alle Pflichtfelder wurden ausgefüllt</Alert>
                            :
                            ""
                        }
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Sichern
                        </Button>
                    </Col>
                </Row>
            </ModalFooter>
        </Form>
        
    )
}
