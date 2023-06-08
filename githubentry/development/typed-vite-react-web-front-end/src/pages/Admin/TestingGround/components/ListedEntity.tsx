import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button } from 'react-bootstrap';
import { ArrowsAngleExpand, Chat, CheckCircle, CheckCircleFill, CheckSquareFill, DashSquareFill, ExclamationTriangle, HourglassSplit, Pause, PauseBtnFill, PauseCircle, PauseCircleFill, TelephoneOutbound, XCircle } from 'react-bootstrap-icons';

export default function ListedEntityPreview(props: {systemstate: any, tableSettings: Array<any>, entity: any, onClick: any, type: string}) {

    const [ didUpdate, setDidUpdate ] = useState(false);

    useEffect(() => {
        setDidUpdate(true);
        setTimeout(() => {setDidUpdate(false)}, 1000);
    }, [props.entity]);

    const renderStatus = () => {
        switch (props.entity.status) {
            case "created":
                return <Badge bg="info">Neu</Badge>
            case "active":
                return <Badge bg="success">Aktiv</Badge>
            case "issue":
                return <Badge bg="warning">Problem</Badge>
            case "error":
                return <Badge bg="danger">Fehler</Badge>

            default:
                return <ExclamationTriangle color='rgb(255,100,100)'/>
        }
            
    }

    if (props.type == "users") {
        return (//
            <tr className={didUpdate ? "table-primary" : ""} onClick={() => {props.onClick(props.entity)}}>
                <>
                    {props.tableSettings ?
                        props.tableSettings.map((el:any) => {
                            if (el.key == "status") {
                                return <td key={el.key}>{renderStatus()}</td>
                            }
                            if (el.type == "boolean") {
                                return <td key={el.key}>{eval(`props.entity.${el.key}`) ? <CheckCircleFill color='rgb(0,200,0)' /> : <XCircle color='rgb(200,0,0)' /> }</td>
                            }
                            if (el.type == "select") {
                                var prototype = eval(`props.systemstate.query.${props.type}`).keys.find((k: any) => k.key == el.key);
                                if (!prototype) {return <Alert variant='danger'>Prototype not found</Alert>}
                                var option = prototype.selectOptions.find((o: any) => {o.key == eval(`props.entity.${el.key}`)});
                                if (!option) {return <Alert variant='danger'>Option not found</Alert>}
                                return <td key={el.key}>{option.disp}</td>
                            }
                            return <td key={el.key}>{eval(`props.entity.${el.key}`)}</td>
                        })    
                    :
                        <td><ExclamationTriangle color='rgb(255,100,100)'/></td>
                    }
                    <td>
                        {
                            props.entity.phone_number && props.entity.phone_number != "" ?
                                    <Button variant='outline-success' onClick={(e: any) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(`tel:${props.entity.phone_number}`);
                                    }} size="sm"><TelephoneOutbound /></Button>
                                :
                                    <Button variant='outline-secondary' size="sm"><Chat /></Button>

                        }
                    </td>
                </>
            </tr>
        )
    }
    return null;
}

