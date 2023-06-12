import { Badge, Button, Col, Row } from "react-bootstrap";
import { CaretDown, CaretUp, XLg } from "react-bootstrap-icons";
import CollapseWrapper from "../../Wrappers/CollapseWrapper";
import { useState } from "react";

export default function TableHeadComponent(props: {properties: any, isSelected: boolean, onDelete: Function, onChange: Function, sortDirection: string}) {
    
    const [ isHovering, setIsHovering ] = useState(false);

    return (
        <Row className="mb-1" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Col className="d-flex align-items-end">
                {props.properties.display}
            </Col>
            <Col md="auto" className="d-flex justify-content-end">
                <CollapseWrapper dimension="width" show={isHovering}>
                    {/* <Button size="sm"> */}
                        <XLg onClick={(e:any) => props.onDelete(e)} color="red" style={{cursor:"pointer"}}></XLg>
                    {/* </Button> */}
                </CollapseWrapper>
                {
                    props.isSelected ? 
                        
                        <Button 
                            onClick={() => {
                                props.onChange();
                            }}
                            size="sm"
                            variant="outline-primary"
                            className="border-0"
                            >
                            {props.sortDirection == "asc" ? <CaretDown />:<CaretUp />}
                        </Button>

                    :
                        ""
                        
                }
            </Col>
        </Row>
    )
}
