import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { EnvelopeAt, TelephoneOutbound } from "react-bootstrap-icons";
import { useAuth } from "../../../contexts/AuthContext";
import DataUI from "../../DataUI";

export default function UserTemplate(props:
{
    data: any,
    path: string | undefined,
    depth: number,
    schema: any,
    onChange: (data: any) => void,
    config: {
        disableLabel?: boolean,
        disableEditable?: boolean,
        editMode?: boolean,
        disableInteraction?: boolean,
    },
}) {

    const getTabContent = (tab: any) => {
        switch (tab) {
            case "general":
                return (
                    <>
                        <Row className="mb-4 mt-3">
                            <Col sm={4} className={"d-flex justify-content-center"}>
                                <DataUI data={props.data.is_client} path={props.path + "/is_client"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4} className={"d-flex justify-content-center"}>
                                <DataUI data={props.data.is_coach} path={props.path + "/is_coach"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4} className={"d-flex justify-content-center"}>
                                <DataUI data={props.data.is_admin} path={props.path + "/is_admin"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col sm={4}>
                                <DataUI data={props.data.form_of_adress} path={props.path + "/form_of_adress"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.first_name} path={props.path + "/first_name"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.last_name} path={props.path + "/last_name"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}>
                                <DataUI data={props.data.street} path={props.path + "/street"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.house_number} path={props.path + "/house_number"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.postal_code} path={props.path + "/postal_code"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={4}>
                                <DataUI data={props.data.city} path={props.path + "/city"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.district} path={props.path + "/district"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.country} path={props.path + "/country"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>


                        <Row className="mb-4">
                            <Col sm={6}>
                                <DataUI data={props.data.status} path={props.path + "/status"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={6}>
                                <DataUI data={props.data.preferred_language} path={props.path + "/preferred_language"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col sm={6}>
                                <DataUI data={props.data.email} path={props.path + "/email"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={6}>
                                <DataUI data={props.data.phone_number} path={props.path + "/phone_number"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>


                        <DataUI data={props.data.country_ISO2} path={props.path + "/country_ISO2"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                        <DataUI data={props.data.date_of_birth} path={props.path + "/date_of_birth"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>

                        <DataUI data={props.data.roles} path={props.path + "/roles"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>

                        <DataUI data={props.data.bio} path={props.path + "/bio"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                        
                    </>
                );

            case "administration":
                return (
                    <>

                        <Row className="mb-2 mt-3">
                            <Col sm={4}>
                                <DataUI data={props.data.access_level} path={props.path + "/access_level"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.created_at} path={props.path + "/created_at"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.last_update} path={props.path + "/last_update"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                    </>
                );
            
            case "invoices":
                return (
                    <>
                        <Row className="mb-2 mt-3">
                            <Col sm={4}>
                                <DataUI data={props.data.discount} path={props.path + "/discount"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.special_pass_name} path={props.path + "/special_pass_name"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.special_pass_valid_until} path={props.path + "/special_pass_valid_until"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col sm={4}>
                                <DataUI data={props.data.special_pass_reduction} path={props.path + "/special_pass_reduction"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.invoice_delivery} path={props.path + "/invoice_delivery"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={4}>
                                <DataUI data={props.data.sallary} path={props.path + "/sallary"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                    </>
                );
            
            case "family":
                return (
                    <>
                        <Row className="mb-2 mt-3">
                            <Col sm={6}>
                                <DataUI data={props.data.parents} path={props.path + "/parents"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={6}>
                                <DataUI data={props.data.children} path={props.path + "/children"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                    </>
                );

            case "courses":
                return (
                    <>
                        <Row className="mb-2 mt-3">
                            <Col sm={6}>
                                <DataUI data={props.data.booked_courses} path={props.path + "/booked_courses"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                            <Col sm={6}>
                                <DataUI data={props.data.coached_courses} path={props.path + "/coached_courses"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                            </Col>
                        </Row>
                    </>
                );


        }
    }


    const { currentUserCustomClaims } = useAuth();
    const [ tabs, setTabs ] = useState<any[]>([]);
    const [ activeTab, setActiveTab ] = useState<string>("general");

    useEffect(() => {
        setTabs(() => {
            const t = [{key: "general", display: "Allgemein", level: 0},
            {key: "administration", display: "Administration", level: 2000},
            {key: "invoices", display: "Rechnungen", level: 0},
            {key: "family", display: "Familie", level: 0},
            {key: "courses", display: "Kurse", level: 0},]
            return t.filter((tab) => {
                return currentUserCustomClaims?.access_level >= tab.level;
            })
        })
    }, [currentUserCustomClaims])

    return (
        <Container fluid>
            <h1>{props.schema.display} ({currentUserCustomClaims?.access_level})</h1>
            <Row>
                <Col sm={3}>
                    <DataUI data={props.data.photo_url} path={props.path + "/photo_url"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{}}/>
                </Col>
                <Col sm={9}>
                    <Row>
                        <Col className={"d-flex justify-content-between"}>
                            <div className={"d-flex"}>
                                <div className="me-2">
                                    <b><DataUI data={props.data.first_name} path={props.path + "/first_name"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: true}}/></b>
                                </div>
                                <div>
                                    <b><DataUI data={props.data.last_name} path={props.path + "/last_name"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: true}}/></b>
                                </div>
                            </div>
                            <div>
                                <DataUI data={props.data.status} path={props.path + "/status"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: true}}/>
                            </div>
                        </Col>
                    </Row>

                    <DataUI data={props.data.roles} path={props.path + "/roles"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: true}}/>
                    
                    <div className={"d-flex"}>
                        <div className="me-2">
                            <DataUI data={props.data.id} path={props.path + "/id"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>
                        </div>
                        <div>
                            <DataUI data={props.data.auth_id} path={props.path + "/auth_id"} depth={props.depth} onChange={(e:any) => {props.onChange(e)}} config={{disableLabel: false}}/>

                        </div>
                    </div>

                    <div className={"d-flex"}>
                        <Button className="me-2" variant={"primary"} onClick={() => {window.open('mailto:'+props.data.email)}}><EnvelopeAt /> E-Mail schreiben</Button>
                        <Button className="me-2" variant={"primary"} onClick={() => {window.open('tel:'+props.data.phone_number)}}><TelephoneOutbound /> Anrufen</Button>
                    </div>

                    <br />
    
                    <div className="mb-5">
                        <Tabs
                        
                        activeKey={activeTab}
                        onSelect={(k: any) => {
                            setActiveTab(k);
                        }}
                        >
                            {
                                tabs?.map((element: any, index: number) => {
                                    return (
                                        <Tab key={index} eventKey={element.key} title={element.display}>
                                            {getTabContent(element.key)}
                                        </Tab>
                                    )
                                })
                            }
                        </Tabs>
                    </div>
    

                </Col>
            </Row>
        </Container>
    )
}