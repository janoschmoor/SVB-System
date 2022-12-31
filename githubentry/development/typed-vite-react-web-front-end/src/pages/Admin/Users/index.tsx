import React, { ReactNode, useEffect, useState, useRef } from 'react'
import LayoutComponent from '../../../components/Layout';
import { Container, Table, Modal, Button, Alert, Row, Col, Form, FormControl, ButtonGroup, Toast, ToastContainer } from 'react-bootstrap';
import { getCollectionRealTime } from '../../../services/firestore';
import { updateUser } from '../../../services/functions';

import IUser, { IUserPreview } from '../../../interfaces/user/user';
import ListedUserPreview from '../../../components/User/Listed';
import InspectUser from '../../../components/User/Inspect';

import { Pen, Unlock } from "react-bootstrap-icons";
import compileUpdates from './helper/compileUpdate';

export default function UsersPage() {

    const sortOptions = [
        {key: "last_name", disp: "Nachname", options: [ {type: "limit", value: 20}, {type: "orderBy", value: "last_name"} ]},
        {key: "date_of_birth_numeric", disp: "Geburtsdatum", options: [ {type: "limit", value: 20}, {type: "orderBy", value: "date_of_birth_numeric"} ]},
    ];

    const [ loading, setLoading ] = useState(false);
    const [ lastValidationFailed, setLastValidationFailed ] = useState(false);
    const [ toast, setToast ] = useState<{title?: string, msg?: string, time?: string, show: boolean}>({show: false});
    const [ editing, setEditing ] = useState(false);
    const [ validated, setValidated ] = useState(false);
    const [ showUserModal, setShowUserModal ] = useState(false);
    const [ sortOption, setSortOption ] = useState<string>(sortOptions[0].key);
    const [ forceUpdateData, setForceUpdateData ] = useState(false);
    const [ textSearch, setTextSearch ] = useState<string>("");
    const [ user, setUser ] = useState<IUser>();
    const [ displayDataIsNew, setDisplayDataIsNew ] = useState(false);

    const handleModalClose = () => {
        setShowUserModal(false);
    };
    const handleModalShow = (user: IUser) => {
        setUser(user);
        setValidated(false);
        setEditing(false)
        setLastValidationFailed(false);
        setShowUserModal(true);
    };

    const [ queriedUsers, setQueriedUsers ] = useState<IUser[]>([]);
    const [ displayUsers, setDisplayUsers ] = useState<IUser[]>([]);

    
    useEffect(() => {
        setLoading(true);
        const unsubscribe = getCollectionRealTime("users", onUserSnapshotChanges, textSearch, sortOptions.find(so => so.key == sortOption));
        return unsubscribe;
    }, [sortOption, forceUpdateData])
    
    function onUserSnapshotChanges(snapshot: any) {
        setLoading(false);
        let userdata: IUser[] = [];
        snapshot.forEach((doc: any) => {
            userdata.push(doc.data() as IUser)
        });
        setQueriedUsers(userdata);
        setDisplayUsers([...userdata]);
        setDisplayDataIsNew(true);
    }
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value)
    }
    const handleTextSearchChange = (event: any) => {
        setTextSearch(event.target.value);
        const filteredList: Array<IUser> = [];
        queriedUsers.map(user => {
            if (eval(`user.${sortOption}.toString().toLowerCase().includes('${event.target.value.toLowerCase()}')`)) {
                filteredList.push(user);
            }
        })
        setDisplayUsers(filteredList);
        setDisplayDataIsNew(false);
    }
    const handleTextSearch = (event: React.ChangeEvent<any>) => {
        setForceUpdateData(!forceUpdateData);
    }
    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setLastValidationFailed(true);
            // console.log(event, form)
        } else {
            setLastValidationFailed(false);
            uploadUserData(new FormData(form));
        }
        setValidated(true);
    };
    const uploadUserData = (form: any) => {

        const updates = compileUpdates(form, user);
        var userUpdate = {...user, ...updates};

        updateUser({user: userUpdate}).then((data) => {
            var currentTime = new Date();
            var hours = currentTime.getHours().toString();
            var minutes = currentTime.getMinutes().toString();
            handleModalClose();
            if (minutes.length <= 1) {
                minutes = "0" + minutes;
              }
            setToast({show: true, title: "title", msg: JSON.stringify(data), time: hours + ":" + minutes})
        }).catch((err) => console.error(err.message))
    }
    


    return (
        <>
            <LayoutComponent>
                <Container fluid>
                    <Form>
                        <Row>
                            <Col sm={3}></Col>
                            <Col sm={6}>
                                <Form.Group className="d-flex">
                                    <Form.Control
                                    type="search"
                                    placeholder={sortOptions.find(opt => opt.key == sortOption) ? sortOptions.find(opt => opt.key == sortOption)?.disp + " durchsuchen" : "Suchen"}
                                    className="me-2"
                                    aria-label="Suchen"
                                    onChange={handleTextSearchChange}
                                    />
                                    <Button disabled={loading} onClick={handleTextSearch} variant="outline-primary">Suchen</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>Sortieren</Form.Label>
                                    <Form.Select
                                    onChange={handleSortChange}
                                    >
                                        {
                                            sortOptions.map(opt => {
                                                return <option key={opt.key} value={opt.key}>{opt.disp}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {/* {
                                sortOption == ""
                            } */}
                        </Row>
                    </Form>
                </Container>


                <Container>

                    {loading ? <Alert variant='info'>Daten werden geladen</Alert> : ""}
                    
                    <Table bordered className='table-hover table-striped table-sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vorname</th>
                                <th>Nachname</th>
                                <th>Email</th>
                                <th>Geb.</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayUsers.map((user, index): ReactNode => {
                                return <ListedUserPreview key={user.id} onClick={handleModalShow} user={user}/>
                            })}
                        </tbody>
                    </Table>
                    {queriedUsers.length == 0 ? <Alert variant='info'>Keine Nutzer gefunden</Alert> : ""}
                </Container>

                <Modal size="lg" show={showUserModal} onHide={handleModalClose}>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <Modal.Header closeButton>
                            {
                                editing ? 
                                    <Button onClick={() => {setEditing(!editing)}} variant="outline-dark" className="mr-4"><Unlock/></Button> 
                                :
                                    <Button onClick={() => {setEditing(!editing)}} variant="outline-dark" className="mr-4"><Pen/></Button>
                            }
                            <Modal.Title>
                                Nutzeransicht
                            </Modal.Title>
                        </Modal.Header>
                        {
                            user ?
                                <Modal.Body>
                                    <InspectUser user={user} editing={editing} />
                                </Modal.Body>
                            : 
                                <Alert variant='danger'>Nutzer nicht definiert</Alert>
                        }
                        
                        <Modal.Footer>
                            <Row className='w-100'>
                                <Col sm="7">
                                    {
                                        lastValidationFailed ? 
                                        <Alert variant="danger">Nicht alle Pflichtfelder wurden ausgefüllt</Alert>
                                        :
                                        ""
                                    }
                                </Col>
                                <Col sm="5">
                                    <Button variant="secondary" onClick={handleModalClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Sichern
                                    </Button>
                                </Col>
                            </Row>
                            

                        </Modal.Footer>
                    </Form>
                </Modal>
                

                <ToastContainer className='position-fixed' position={'bottom-end'}>
                    <Container className='p-5'>
                        <Toast show={toast.show} onClose={() => {setToast({show:false})}} delay={5000} autohide>
                            <Toast.Header>
                                {/* <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                                /> */}
                                <strong className="me-auto">{toast?.title}</strong>
                                <small>{toast?.time}</small>
                            </Toast.Header>
                            <Toast.Body>{toast?.msg}</Toast.Body>
                        </Toast>
                    </Container>
                    
                </ToastContainer>
            </LayoutComponent>

        </>
    )
}