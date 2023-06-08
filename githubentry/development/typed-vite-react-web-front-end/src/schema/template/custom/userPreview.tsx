import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { ArrowUpRight, CaretDown, CaretUp } from "react-bootstrap-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CollectionQueryTableComponent from "../../../components/DataManager/components/CollectionQueryTable";
import CollapseWrapper from "../../../components/Wrappers/CollapseWrapper";
import ModalWrapper from "../../../components/Wrappers/ModalWrapper";
import DataUI from "../../DataUI";
import { getProperties } from "../../interpreter";

export default function UserPreviewTemplate(props: 
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
    const [ localData, setLocalData ] = useState<any>(props.data);
    const [ hasChanged, setHasChanged ] = useState(false);
    const [ showSearch, setShowSearch ] = useState(false);

    const properties = getProperties(props.path ? props.path : "");

    useEffect(() => {
        if (hasChanged) {
            props.onChange({change: localData, path: props.path});
        }
    }, [localData]);
    useEffect(() => {
        setLocalData(props.data);
        setHasChanged(false);
    }, [props.data]);


    if (!props.data) {
        return (
            <>
                <Button variant="outline-primary" onClick={
                    () => {
                        setShowSearch(true);
                    }
                }>Nutzer suchen <ArrowUpRight /></Button>

                <ModalWrapper show={showSearch} onClose={() => {setShowSearch(false)}} title="Nutzer suchen">
                    <CollectionQueryTableComponent collection={props.schema.preview} active={true} settings={{onSelectEntity: (entity: any) => {
                        const newObj: any = {};
                        // console.log(properties)
                        properties?.forEach((property: any) => {
                            newObj[property.key] = entity.data[property.key];
                        });
                        console.log(newObj)
                        setLocalData(newObj);
                        setHasChanged(true);
                        setShowSearch(false);
                    }}}></CollectionQueryTableComponent>
                </ModalWrapper>
            </>
        )
    }
            

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
                    localData ?
                        <CollapseWrapper dimension="height" show={!(props.depth <= 0 && !forceShowMore)}>
                            
                            {
                                props.data.photo_url ?
                                    <Row>
                                        <Col sm={6}>
                                            <DataUI data={props.data.first_name} path={props.path ? props.path+"/first_name" : ""} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={{...props.config, disableEditable: true}} />
                                        </Col>
                                    </Row>
                                :
                                    null
                            }
                            <Row>
                                <Col sm={6}>
                                    <DataUI data={props.data.first_name} path={props.path ? props.path+"/first_name" : ""} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={{...props.config, disableEditable: true}} />
                                </Col>
                                <Col sm={6}>
                                    <DataUI data={props.data.last_name} path={props.path ? props.path+"/last_name" : ""} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={{...props.config, disableEditable: true}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <DataUI data={props.data.phone_number} path={props.path ? props.path+"/phone_number" : ""} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={{...props.config, disableEditable: true}} />
                                </Col>
                                <Col sm={6}>
                                    <DataUI data={props.data.date_of_birth} path={props.path ? props.path+"/date_of_birth" : ""} depth={props.depth-1} onChange={(e:any) => {props.onChange(e)}} config={{...props.config, disableEditable: true}} />
                                </Col>
                            </Row>
                            
                        </CollapseWrapper>
                    :
                        <p>Keine Einträge</p>
                }
            </Card>
        </>
    );
}