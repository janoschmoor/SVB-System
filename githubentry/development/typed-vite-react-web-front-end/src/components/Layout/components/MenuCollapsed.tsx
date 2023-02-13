import { Button, Card, Collapse, ListGroup, ListGroupItem } from "react-bootstrap";
import { House, Journal, Person, PersonFillGear, SinaWeibo, Speedometer2 } from "react-bootstrap-icons";

export default function MenuCollapsed(props: {show: boolean}) {
  return (
    // <Card className="mt-2" bg="secondary" body>
    //     <ListGroup className="px-0" variant="flush">
    //         <ListGroupItem className="mb-2 rounded-5" action>
    //             <Button variant="outline-primary border-0"><SinaWeibo></SinaWeibo></Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-start" action>
    //             <Button variant="outline-primary border-0"><SinaWeibo></SinaWeibo></Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-circle" action>
    //             <Button variant="outline-primary border-0"><SinaWeibo></SinaWeibo></Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-pill border-end-radius-0" action>
    //             <Button variant="outline-primary border-0"><SinaWeibo></SinaWeibo></Button>
    //         </ListGroupItem>
    //     </ListGroup>
    // </Card>
    // <Card className="mt-3 p-0" bg="dark" body>
    //     <div className="d-flex flex-column">

    //     <Button className="d-flex align-items-center" variant="outline-light border-0">
    //         <House></House>
    //     </Button>
            
    //         <ListGroupItem className="mb-2 rounded-5" action>
    //             <Button className="d-flex align-items-center" variant="outline-light border-0">
    //                 <Speedometer2 className="me-2"></Speedometer2>
    //                     <Collapse in={props.show} dimension="width">
    //                         <div style={{ maxHeight: "30px", width: "150px"}}>
    //                             <span>
    //                             Dashboard
    //                             </span>
    //                         </div>
    //                     </Collapse>
    //             </Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-5" action>
    //             <Button className="d-flex align-items-center" variant="outline-light border-0">
    //                 <PersonFillGear className="me-2"></PersonFillGear>
    //                     <Collapse in={props.show} dimension="width">
    //                         <div style={{ maxHeight: "30px", width: "150px"}}>
    //                             <span>
    //                             SL
    //                             </span>
    //                         </div>
    //                     </Collapse>
    //             </Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-5" action>
    //             <Button className="d-flex align-items-center" variant="outline-light border-0">
    //                 <Person className="me-2"></Person>
    //                     <Collapse in={props.show} dimension="width">
    //                         <div style={{ maxHeight: "20px", width: "150px"}}>
    //                             <span>
    //                             Kunden
    //                             </span>
    //                         </div>
    //                     </Collapse>
    //             </Button>
    //         </ListGroupItem>
    //         <ListGroupItem className="mb-2 rounded-5" action>
    //             <Button className="d-flex align-items-center" variant="outline-light border-0">
    //                 <Journal className="me-2"></Journal>
    //                     <Collapse in={props.show} dimension="width">
    //                         <div style={{ maxHeight: "30px", width: "150px"}}>
    //                             <span>
    //                             Kurse
    //                             </span>
    //                         </div>
    //                     </Collapse>
    //             </Button>
    //         </ListGroupItem>
    //     </div>
    // </Card>

    <Card className="mt-3 p-0" bg="dark" body>

        <div className="d-flex flex-column">

            <div className="d-flex">
                <Button style={{width: "auto"}} variant="outline-light">
                    <House></House>
                </Button>
                <Collapse dimension={"width"} in={props.show}>
                    <div>
                        <Card body className="margin-0">
                            Home
                        </Card>
                    </div>
                </Collapse>
            </div>

            <Collapse dimension={"width"} in={props.show}>
                <div>
                    <Card body style={{width: "300px"}} className="d-flex justify-content-center">
                        Schwimmverein beider Basel
                    </Card>
                </div>
            </Collapse>

            
        </div>

    </Card>
  )
}
