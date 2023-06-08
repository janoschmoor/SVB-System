import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import JSONRenderer from '../../components/JSONRenderer';

export default function TestPage() {

    const [ tEdit, setTEdit ] = useState(false);
    const [ tAllowEdit, setTAllowEdit ] = useState(false);
    const [ tLabel, setTLabel ] = useState(false);

    const sampleObj = {
        "first_name": "Janosch",
        "last_name": "Moor",
        // "date": new Date(),
        // "number": 1,
        // "true": true,
        // "false": false,
        // "null": null,
        // "arrayOfStrings": ["a", "b", "c", "d"],
        // "arrayOfNumbers": [1, 2, 3, 4, 5],
        // "arrayOfBooleans": [true, false, true, false],
        // "arrayOfObjects": [{ "a": 1 }, { "a": 2}],
        // "object": {
        //   "anyKey": "anyValue"
        // },
        // "any": {
        //     "array": [1, 2, 3, 4, 5],
        //     "string": "Pluralsight",
        // }
    }

    const change = (data: any) => {
        console.log(data);
    }

    return (
        // react bootstrap flex vertical
        <>
            <Button variant={tEdit ? "primary" : "danger"} onClick={() => {setTEdit(!tEdit)}}>
                Edit: {tEdit.toString()}
            </Button>
            <Button variant={tAllowEdit ? "primary" : "danger"} onClick={() => {setTAllowEdit(!tAllowEdit)}}>
                AllowEdit: {tAllowEdit.toString()}
            </Button>
            <Button variant={tLabel ? "primary" : "danger"} onClick={() => {setTLabel(!tLabel)}}>
                Label: {tLabel.toString()}
            </Button>
            
            <div className='d-flex flex-column'>
                <JSONRenderer data={sampleObj} keyName="users/id" settings={{label: tLabel, render: "full", edit: tEdit, allowEdit: tAllowEdit}} onChange={change} />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <JSONRenderer data={sampleObj} keyName="users/id" settings={{label: true, render: "list"}} onChange={change} />
                    </tbody>
                </Table>

                <JSONRenderer data={sampleObj} keyName="users/id" settings={{label: true, render: "custom"}} onChange={change} />
            </div>
        </>
    )
}
