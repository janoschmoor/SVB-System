import { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Card, Col, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, ToggleButton } from "react-bootstrap";
import { CardHeading, CardText, Trash, XLg } from "react-bootstrap-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormRange from "react-bootstrap/esm/FormRange";
import { render } from "react-dom";
import { useSystem } from "../../../../contexts/systemContext";

export default function QueryOptionSelectorComponent(props: {index: number, removeCallback: Function}) {

    const [ type, setType ] = useState<null|string>(null);

    const [ limit, setLimit ] = useState(10);

    const { SystemState } = useSystem();
    

    const renderType = () => {
        switch (type) {
            case "where":
                return whereFrag();
            case "limit":
                return limitFrag();
            case "orderBy":
                return orderByFrag();
        
            default:
                return ["limit", "where", "orderBy"].map((t, index) => {
                    return <Button key={t+index.toString()} variant="outline-secondary" onClick={() => {setType(t)}}>{t.toUpperCase()}</Button>
                })
        }
    }

    const whereFrag = () => {
        return (
            <>
                <FormGroup>
                    <FormLabel>Key</FormLabel>
                    <FormSelect required className="selector-input">
                        <option value={"last_name"}>Nachname</option>
                        <option value={"first_name"}>Vorname</option>
                        <option value={"date_of_birth"}>Geburtstag</option>
                    </FormSelect>
                    
                </FormGroup>
                <FormGroup>
                    <FormLabel>Operator</FormLabel>
                    <FormSelect required className="selector-input">
                        <option value={"=="}>gleich</option>
                        <option value={">="}>grösser-gleich</option>
                        <option value={"<="}>kleiner-gleich</option>
                        <option value={">"}>grösser</option>
                        <option value={"<"}>kleiner</option>
                        <option value={"!="}>ungleich</option>
                        <option value={"array-contains"}>liste-enthält</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Value</FormLabel>
                    <FormControl required type="text" className="selector-input" placeholder="Moor"/>
                    <FormControl.Feedback type="invalid">
                        Value is required!
                    </FormControl.Feedback>
                </FormGroup>
            </>
        )
    }
    const limitFrag = () => {
        return (
            <> 
                <FormGroup>
                    <FormLabel>Limit {limit}</FormLabel>
                    <FormRange onChange={(e) => {
                        setLimit(parseInt(e.target.value));
                    }} value={limit} min="5" max="50" step="5" className="selector-input" placeholder="last_name"/>
                </FormGroup>
            </>
        );
    }
    const orderByFrag = () => {

        console.log(SystemState.querySelector.orderBy)

        return (
            <> 
                <FormGroup>
                    <FormLabel>Key</FormLabel>
                    <FormSelect required className="selector-input">
                        {
                            SystemState.querySelector.orderBy.map((el:any) => {
                                return <option key={el.key} value={el.key}>{el.disp}</option>
                            })
                        }
                        {/* <option value={"last_name"}>Nachname</option>
                        <option value={"first_name"}>Vorname</option>
                        <option value={"date_of_birth"}>Geburtstag</option> */}
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Operator</FormLabel>
                    <FormSelect required className="selector-input">
                        <option value={"asc"}>aufsteigend</option>
                        <option value={"desc"}>absteigend</option>
                    </FormSelect>
                </FormGroup>
            </>
        );
    }

    return (
        <Col sm={3}>
            <Card className="selector-input-group">
                <>
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        {type ? <FormControl value={type} disabled className="selector-input" /> : "Select Type"}
                        <Button variant="outline-danger" onClick={() => {props.removeCallback(props.index)}}><XLg></XLg></Button>
                    </CardHeader>

                    {renderType()}
                </>
            </Card>
        </Col>
    )
}
