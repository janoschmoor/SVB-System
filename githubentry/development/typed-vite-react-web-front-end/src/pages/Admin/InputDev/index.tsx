import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FieldDisplay from '../../../components/FieldDisplay/FieldDisplay';
import { CompileForm } from '../../../components/Inputs/CompileForm';
import InputField, { EvaluateInput } from '../../../components/Inputs/InputField';
import LayoutComponent from '../../../components/Layout';

export default function InputDevPage() {

    const testEntityData = {
        first_name: "Janosch",
        last_name: "Moor",
        email: "janosch.moor@gmail.com",
        date_of_birth: Date.parse("5/15/2002"),
        is_admin: true,
        status: "issue",
        generic_map_users: {
            id: "09m3l5khd62m509893nbcze",
            first_name: "Paul",
            last_name: "Göldi",
            date_of_birth: 2000000536,
            phone_number: "0797360091",
            email: "paul.goeldi@svbasel.ch"
        },
        generic_number: 69,
        generic_list_number: [59, 79, 49, 89, 39, 99, 49],
        generic_list_select: [
            "created","issue"
        ],
        generic_list_text: [
            "hello world",
            "item2",
            "item3",
            "item4",
            "item5",
            "item6",
            "item7",
            "item8",
            "item9",
            "item0",
        ],
        generic_list_boolean: [
            true,
            true,
            false,
            false,
            true,
            false,
            false,
            false,
            true,
            true,
        ],
        generic_list_date: [
            10000,
            100000,
            1000000,
            10000000,
            100000000,
            1000000000,
            10000000000,
            100000000000,
            1000000000000,
            10000000000000,
        ],
        generic_list_map_users: [
            {
                id: "09m3l5khd62m509893nbcze",
                first_name: "Paul",
                last_name: "Göldi",
                date_of_birth: 2000053681381,
                phone_number: "0797360091",
                email: "paul.goeldi@svbasel.ch"
            },
            {
                id: "i8eLu57wmQoer7bzHrt1swN",
                first_name: "David",
                last_name: "Moor",
                date_of_birth: 53681381,
                phone_number: "0792597519",
                email: "david.moor@gmx.ch"
            },
            {
                id: "pp93j4h5v5dgsk1kdfhj3h4",
                first_name: "Nina",
                last_name: "Moor",
                date_of_birth: -54430000,
                phone_number: "0792597518",
                email: "nina.moor@edubs.ch"
            },
            {
                id: "bobobobobobobobobobobob",
                first_name: "Micol",
                last_name: "Paganini",
                date_of_birth: 9210845236029,
                phone_number: "0799630713",
                email: "micol.paganini@icloud.com"
            }
        ],
        parents: [{
            id: "i8eLu57wmQoer7bzHrt1swN",
            first_name: "David",
            last_name: "Moor",
            date_of_birth: 53681381,
            phone_number: "0792597519",
            email: "david.moor@gmx.ch"
        },
        {
            id: "pp93j4h5v5dgsk1kdfhj3h4",
            first_name: "Nina",
            last_name: "Moor",
            date_of_birth: -54430000,
            phone_number: "0792597518",
            email: "nina.moor@edubs.ch"
        }]
    }

    const [ testEntity, setTestEntity ] = useState(testEntityData);

    return (
        <LayoutComponent>

            <h3>Search</h3>

            <Form noValidate>
                <Row>
                    {/* <Col sm="4">
                        <InputField keyName="first_name" formId="form1" isSearch />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="last_name" formId="form1" isSearch />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="email" formId="form1" isSearch />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="date_of_birth" formId="form1" isSearch />
                    </Col>
                    <Col sm="2">
                        <InputField keyName="isAdmin" formId="form1" isSearch />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="status" formId="form1" isSearch />
                    </Col>
                    <Col sm="6">
                        <InputField keyName="parents" formId="form1" isSearch />
                    </Col> */}
                    {/* <Col sm="6">
                        <InputField keyName="generic_map_users" formId="form1" isSearch />
                    </Col>
                    <Col sm="3">
                        <InputField keyName="generic_list_text" formId="form1" isSearch />
                    </Col> */}
                </Row>
            </Form>


            <h3>Input</h3>

            <Form noValidate validated={true}>
                <Row>
                    {/* <Col sm="4">
                        <InputField keyName="first_name" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="last_name" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="email" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="date_of_birth" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="2">
                        <InputField keyName="isAdmin" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="4">
                        <InputField keyName="status" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="6">
                        <InputField keyName="parents" defaultEntity={testEntity} />
                    </Col> */}
                    {/* <Col sm="6">
                        <InputField keyName="generic_map_users" defaultEntity={testEntity} />
                    </Col>*/}
                    {/* <Col sm="6">
                        <InputField keyName="status" defaultEntity={testEntity} />
                    </Col>  */}
                    {/* <Col sm="2">
                        <InputField keyName="is_admin" defaultEntity={testEntity} />
                    </Col> */}
                    {/* <Col sm="4">
                        <InputField keyName="date_of_birth" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="6">
                        <InputField keyName="generic_list_date" defaultEntity={testEntity} />
                    </Col> */}
                    <Col sm="6">
                        <InputField keyName="generic_number" defaultEntity={testEntity} />
                    </Col>
                    <Col sm="6">
                        <InputField keyName="generic_list_number" defaultEntity={testEntity} />
                    </Col>
                </Row>
            </Form>


            <h3>Display</h3>

            {/* <Row>
                <Col sm="3">
                    <FieldDisplay keyName="first_name" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="3">
                    <FieldDisplay keyName="last_name" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="email" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="3">
                    <FieldDisplay keyName="date_of_birth" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="3">
                    <FieldDisplay keyName="isAdmin" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="3">
                    <FieldDisplay keyName="status" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="12">
                    <FieldDisplay keyName="parents" defaultEntity={testEntity} enableInteraction onListSelect={(e: any) => {
                        console.log("Recieved!", e)
                    }} />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="generic_map_users" defaultEntity={testEntity} enableInteraction />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="generic_list_text" defaultEntity={testEntity} showMax={3} enableInteraction onListSelect={(e: any) => {
                        console.log("Recieved!", e)
                    }} />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="generic_list_boolean" defaultEntity={testEntity} showMax={3} enableInteraction onListSelect={(e: any) => {
                        console.log("Recieved!", e)
                    }} />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="generic_list_date" defaultEntity={testEntity} showMax={3} enableInteraction onListSelect={(e: any) => {
                        console.log("Recieved!", e)
                    }} />
                </Col>
                <Col sm="6">
                    <FieldDisplay keyName="generic_list_map_users" defaultEntity={testEntity} showMax={3} enableInteraction onListSelect={(e: any) => {
                        console.log("Recieved!", e)
                    }} />
                </Col>
            </Row> */}




            <Button className='mt-5 mb-5' onClick={() => {
                var update = CompileForm({ isSearch: false, formId: "default", changesOnly: true })
                console.log(update);
                var copy = {...testEntity}
                Object.assign(copy, update);
                setTestEntity(copy)
            }}>Read "default" Values</Button>

        </LayoutComponent>
    )
}
