import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CollapseWrapper from "../../components/Wrappers/CollapseWrapper";
import DataUI from "../DataUI";

export default function ObjectTemplate(props: 
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
    }
) {

    const [ forceShowMore, setForceShowMore ] = useState(false);

    return (
        <>
            <Card style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                <CardHeader>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                        {props.schema.display && !props.config.disableLabel && <h5>{props.schema.display}</h5>}
                        {
                            props.depth <= 0 ? forceShowMore ?
                                <Button size="sm" variant="outline-primary" onClick={() => {setForceShowMore(!forceShowMore)}}>
                                    <CaretDown />
                                </Button>
                            :
                                <Button size="sm" variant="outline-primary" onClick={() => {setForceShowMore(!forceShowMore)}}>
                                    <CaretUp />
                                </Button>
                            :
                                <></>
                        }
                    </div>
                </CardHeader>

                {
                    props.data ?
                        <CollapseWrapper dimension="height" show={!(props.depth <= 0 && !forceShowMore)}>
                            
                            <Row>
                                {
                                    Object.keys(props.data).sort((a, b) => a.localeCompare(b)).map((key: string) => {

                                        return (
                                            <Col key={key} sm={props.depth > 1 ? 4 : 12}>
                                                <DataUI data={props.data[key]} path={props.path ? props.path+"/"+key : key} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={props.config} />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                            
                        </CollapseWrapper>
                    :
                        <p>Keine Einträge</p>
                }
            </Card>
        </>
    );
}