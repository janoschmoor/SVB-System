import { Badge, Button, Col, Row } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";

export default function TableHeadComponent(props: {properties: any, isSelected: boolean, onChange: Function, sortDirection: string}) {
    
    return (
        <Row className="mb-1">
            <Col className="d-flex align-items-end">
                {props.properties.display}
            </Col>
            <Col md="auto" className="d-flex justify-content-end">
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
