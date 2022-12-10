import React, { ReactNode, useEffect, useState } from 'react'
import LayoutComponent from '../../../components/Layout';
import { Container, Table, Modal, Button } from 'react-bootstrap';
import getCollectionSnapshot from '../../../services/firestore';

import IUser from '../../../interfaces/user/user';
import { ttt } from '../../../services/functions';

export default function UsersPage() {

    const [showUserModal, setShowUserModal] = useState(false);

    const handleClose = () => setShowUserModal(false);
    const handleShow = () => setShowUserModal(true);

    const [queriedUsers, setQueriedUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getCollectionSnapshot("users").then(snapshot => {
            let userdata: IUser[] = [];
            snapshot.forEach((doc) => {
                userdata.push(doc.data() as IUser)
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                });
            setQueriedUsers(userdata);
        });
    }, [])


    const test = ttt().then(things => console.log(things))


  return (
    <LayoutComponent>

        <Container>
            <Table className='table-hover table-striped table-sm'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    </tr>
                </thead>

                <tbody>

                    {queriedUsers.map((user, index): ReactNode => {
                        return (
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
        </Container>

        <Modal show={showUserModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    </LayoutComponent>
  )
}
