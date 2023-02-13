import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Badge, Button } from 'react-bootstrap';
import { ArrowsAngleExpand, CheckCircle, CheckCircleFill, CheckSquareFill, DashSquareFill, ExclamationTriangle, HourglassSplit, Pause, PauseBtnFill, PauseCircle, PauseCircleFill, XCircle } from 'react-bootstrap-icons';

export default function ListedEntityPreview(props: {tableSettings: Array<any>, entity: any, onClick: any, type: string}) {

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
                            return <td key={el.key}>{eval(`props.entity.${el.key}`)}</td>
                        })    
                    :
                        <td><ExclamationTriangle color='rgb(255,100,100)'/></td>
                    }
                    <td><Button variant='outline-secondary' size="sm"><ArrowsAngleExpand /></Button></td>
                </>
            </tr>
        )
    }
    return null;
}

