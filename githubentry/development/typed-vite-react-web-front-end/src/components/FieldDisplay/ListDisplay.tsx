import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Trash, Trash2, XLg } from "react-bootstrap-icons";
import CollapseWrapper from "../Wrappers/CollapseWrapper";
import FieldDisplay from "./FieldDisplay";
import TextField from "./TextField";

export default function ListDisplay(props: {
    defaultEntity: any;
    keyName: string;
    instruction: any;
    showLabel: boolean | undefined;
    enableInteraction: boolean | undefined;
    preview: boolean | undefined;
    showMax: number | undefined;
    onListSelect: Function | undefined;
    enableRemoveListItems?: boolean,
}) {

    const [ showAll, setShowAll ] = useState(false);
    const [ showRemoveForIndex, setShowRemoveForIndex ] = useState(-1);

    return (
        <div onMouseOut={() => {setShowRemoveForIndex(-1)}}>
            {
                props.showLabel ? 
                    <div><strong>{props.instruction.disp}</strong></div>
                :
                    ""
            }
            {
                props.defaultEntity && props.defaultEntity[props.keyName] ?
                props.defaultEntity[props.keyName].map((element: any, index: number) => {

                    var entity: any = {};
                    entity[props.instruction.type] = element;

                    return showAll || !props.showMax || (props.showMax && index < props.showMax) ? 
                        <CollapseWrapper key={index} dimension="height" show={true}>

                            <div className="d-flex align-items-center justify-content-between" onMouseOver={() => {setShowRemoveForIndex(index)}}>
                                <FieldDisplay
                                defaultEntity={entity}
                                keyName={props.instruction.type}
                                showLabel={props.showLabel}
                                label={`${index+1})`}
                                enableInteraction={props.enableInteraction}
                                mapTo={props.instruction.mapTo}
                                onClick={(e: any) => {
                                    props.onListSelect ? props.onListSelect({
                                        event: e,
                                        element: element,
                                        index: index,
                                        delete: false,
                                    }) : null;
                                }}
                                />

                                <CollapseWrapper dimension="width" show={!!props.enableRemoveListItems && index == showRemoveForIndex} >
                                    <Button size="sm" variant="outline-danger" className="border-0" onClick={(e: any) => {
                                            e.stopPropagation()
                                            props.onListSelect ? props.onListSelect({
                                                event: e,
                                                element: element,
                                                index: index,
                                                delete: true,
                                            }) : null;
                                        }}><Trash /></Button>
                                </CollapseWrapper>
                                
                            </div>
                        
                        </CollapseWrapper>
                        :
                            null
                })
                :
                null
            }
            {
                !showAll && props.showMax && props.defaultEntity && props.defaultEntity[props.keyName] && props.defaultEntity[props.keyName].length > props.showMax ? 
                    <div style={{ cursor: "pointer" }} onClick={() => {
                        setShowAll((prev: boolean) => !prev);
                    }}>
                        {props.defaultEntity[props.keyName].length - props.showMax} weitere
                    </div>
                :
                    ""
            }
            {
                showAll ? 
                    <div style={{ cursor: "pointer" }} onClick={() => {
                        setShowAll((prev: boolean) => !prev);
                    }}>
                        reduzieren
                    </div>
                :
                    ""
            }
            {
                props.defaultEntity && props.defaultEntity[props.keyName] && props.defaultEntity[props.keyName].length == 0 ? "Keine" : ""
            }
        </div>
    );
}
