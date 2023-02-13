import { useEffect, useState } from "react";
import { Badge, Button, Col, FormControl, FormGroup, FormText, Row } from "react-bootstrap";
import { ArrowDown, CaretDown, CaretUp, FilterLeft, SortDown, SortUp, X, XLg } from "react-bootstrap-icons";

export default function TableHeadComponent(props: {tableSettingElement: any}) {
    
    const [ constraint, setConstraint ] = useState<any>(null);
    const [ sortDirection, setSortDirection ] = useState("asc");

    useEffect(() => {
        setConstraint(props.tableSettingElement.constraint);
        // if (props.tableSettingElement.constraint) {
        //     props.tableSettingElement.constraint.operator == ">=" ? setSortDirection("asc") : setSortDirection("desc");
        // }
    }, [props.tableSettingElement.constraint])
  
    return (
        <>
            <Row className="data-container-order-by mb-1" data-key={`${props.tableSettingElement.key}`} data-type={props.tableSettingElement.type} data-sortdirection={sortDirection}>
                <Col>
                    {props.tableSettingElement.disp}{" "}
                    {
                        constraint ? 
                            <Badge 
                            className="data-container-where"
                            data-key={`${props.tableSettingElement.key}`}
                            data-type={`${props.tableSettingElement.type}`}
                            data-whereconstraintvalue={`${constraint.value}`}
                            data-whereconstraintoperator={`${constraint.operator}`}
                            onClick={() => {
                                setConstraint(null)
                            }}>{constraint.operator} {constraint.value} <XLg /></Badge>
                        :
                            ""
                    }
                </Col>
                <Col md="auto" className="d-flex justify-content-end">
                    {
                        props.tableSettingElement.isSelected ? 
                            sortDirection == "asc" ? 
                                <Button  onClick={() => {
                                    sortDirection == "asc" ? setSortDirection("desc"): setSortDirection("asc")
                                }} size="sm" variant="primary"><CaretDown /></Button>
                            :   
                                <Button onClick={() => {
                                    sortDirection == "asc" ? setSortDirection("desc"): setSortDirection("asc")
                                }} size="sm" variant="primary"><CaretUp /></Button>

                        :
                            // <Button size="sm" variant="outline-secondary"><FilterLeft /></Button>
                            ""
                            
                    }
                </Col>
            </Row>
            {/* {
                renderType(props, constraint, (obj:any) => {
                    setConstraint(obj);
                    // props.needsUpdate();
                })
            } */}
        </>
    )
}
const renderType = (props: any, constraint: any, callback: Function) => {
    if (props.type == "text") {
        return renderText(props, callback);
    }
}
const renderText = (props: any, callback: Function) => {
    return (
        <Row>
            <Col>
                {
                    props.isSelected ?
                        <FormGroup>
                            <FormControl onBlur={(e: any) => {
                                e.target.value = "";
                            }} onChange={(e: any) => {
                                callback(e.target.value != "" ? {value: e.target.value} : null)
                            }} disabled={false} size="sm" placeholder="enthält" type="text" />
                        </FormGroup>
                    :
                        <FormGroup>
                            <FormControl disabled={true} size="sm" placeholder="" />
                        </FormGroup>
                }
            </Col>
        </Row>
    );
}
