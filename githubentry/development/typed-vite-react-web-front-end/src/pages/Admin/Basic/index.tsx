import React, { ReactNode, useEffect, useState, useRef } from 'react'
import LayoutComponent from '../../../components/Layout';
import { Container, Table, Modal, Button, Alert, Row, Col, Form, FormControl, ButtonGroup, Toast, ToastContainer } from 'react-bootstrap';
import { getCollectionRealTime } from '../../../services/firestore/firestore';
import { updateEntity } from '../../../services/functions';

import IUser, { IUserPreview } from '../../../interfaces/user/user';
import ListedUserPreview from '../../../components/User/Listed';
import InspectUser from '../../../components/User/Inspect';

import { Pen, Unlock } from "react-bootstrap-icons";
import { auth, firestore } from '../../../firebase';

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { useAuth } from '../../../contexts/AuthContext';


export default function BasicPage() {

    const queryCollections = [
        {key: "users", disp: "Nutzer"},
        {key: "courses", disp: "Kurse"},
        {key: "pools", disp: "Hallenbäder"},
    ];
    const [ selectedQueryCollection, setSelectedQueryCollection] = useState<undefined | {key:string, disp:string}>(queryCollections[0]);

    const [ loading, setLoading ] = useState(false);
    const [ entities, setEntities ] = useState<IUser[]>([]);
    const [ displayEntities, setDisplayEntities ] = useState<IUser[]>([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        setLoading(true);
        // const unsubscribe = getCollectionRealTime("users", onUserSnapshotChanges, textSearch, queryCollections.find(so => so.key == sortOption));
        // return unsubscribe;
    }, [])

    const testCallUpdateEntity = () => {
        // setDoc(doc(firestore, "users", "me"), {
        //     name: "Jano",
        //     state: "CH",
        //     age: 15,
        //     balance: 200,
        //     id: "me"
        //   });
        if (currentUser) {
            // getDoc(doc(firestore, "users/"+"Gb18ju8uGlrKVrCMC10PpQjLYKbf")).then(doc => console.log(doc.data())).catch(err=>console.error(err))
            // getDoc(doc(firestore, "users/"+currentUser.uid)).then(doc => console.log(doc.data())).catch(err=>console.error(err))
            updateDoc(doc(firestore, "users", currentUser.uid), {
                last_update_numeric: Date.now(),
                first_name: "Olli",
            }).then((res:any) => {console.log(res)}).catch((err:any) => {console.error(err)});
        } else {
            console.error("not signed in")
        }
        // getDoc(doc(firestore, "users/me")).then((res) => {console.log(res)}).catch(err => console.error(err));
        
        
        // updateEntity({
        //     entity: selectedQueryCollection?.key,
        //     entityId: "micha",
        //     entityUpdate: {id: "micha"},
        //     action: "update"
        // }).then((idk) => {console.log(idk)}).catch((e) => {console.error(e)})
        console.log("test sent!")
    }

    const runQuery = () => {

    }
    const handleModalShow = () => {
        
    }
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQueryCollection(queryCollections.find(c => c.key == event.target.value))
    }
    
    
    return (
        <>
            <LayoutComponent>
                <Container fluid>
                    <Form>
                        <h2>Category</h2>
                        <Row>
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>Collection</Form.Label>
                                    <Form.Select
                                    onChange={handleSortChange}
                                    >
                                        {
                                            queryCollections.map(col => {
                                                return <option key={col.key} value={col.key}>{col.disp}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            {loading ? <Alert variant='info'>Daten werden geladen…</Alert> : ""}
                            {entities.length == 0 ? <Alert variant='warning'>Keine Ergebnisse</Alert> : ""}

                            <Col md={2}>1</Col>
                            <Col md={8}>
                                <Table bordered className='table-hover table-striped table-sm'>
                                    <thead>
                                        <tr>
                                            {queryCollections.map((c, index): ReactNode => {
                                                return <th key={c.key}>{c.disp}</th>
                                            })}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayEntities.map((user, index): ReactNode => {
                                            return <ListedUserPreview key={user.id} onClick={handleModalShow} user={user}/>
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={2}>3</Col>
                        </Row>
                    </Form>
                </Container>
                <Button onClick={()=>{testCallUpdateEntity()}}>updateEntity</Button>
            </LayoutComponent>
        </>
    )
}