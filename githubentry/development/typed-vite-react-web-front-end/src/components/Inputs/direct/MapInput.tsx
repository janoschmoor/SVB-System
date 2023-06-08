import { useEffect, useRef, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel, InputGroup, Overlay, Popover, PopoverBody, PopoverHeader } from "react-bootstrap";
import { Pen, Trash } from "react-bootstrap-icons";
import { CONVERTERS, ENTITY_PREVIEW_FIELDS } from "../../../contexts/SystemContext";
import CollectionQueryTableComponent from "../../DataManager/components/CollectionQueryTable";
import FieldDisplay from "../../FieldDisplay/FieldDisplay";
import CollapseWrapper from "../../Wrappers/CollapseWrapper";
import ModalWrapper from "../../Wrappers/ModalWrapper";

export default function MapInput(props: {
    formId: string | number;
    instruction: any;
    keyName: string,
    hideLabel: boolean | undefined;
    isSearch: boolean | undefined,
    defaultEntry: any | undefined;
    disabled: boolean | undefined;
    pFeedback: string | undefined;
    nFeedback: string | undefined;
    onChange: Function | undefined;
    onBlur: Function | undefined;
    onSubmit: Function | undefined;
    clearOnBlur?: boolean;
    forceDirect?: boolean;
    hasChange?: boolean;
}) {

    const initialSearchTextIndicesArray = () => {
        var list: Array<number> = [];
        props.instruction.searchTextConfig?.forEach(() => {list.push(0)})
        return list;
    }
    const getCurrentTextAsString = () => {
        var str = "";
        props.instruction.searchTextConfig?.forEach((list: Array<{key: string, disp: string}>, index: number) => {str+="-"+list[searchTextIndices[index]].key})
        return str;
    }

    const [ searchTextIndices, setSearchTextIndices ] = useState<Array<number>>(initialSearchTextIndicesArray());
    const [ value, setValue ] = useState(props.defaultEntry ? props.defaultEntry : null);
    const [ hasChange, setHasChange ] = useState(false);
    const [ hasForceChange, setHasForceChange ] = useState(props.hasChange);
    const [ hasTyped, setHasTyped ] = useState(false);

    const [ defaultEntityTemplate, setDefaultEntityTemplate ] = useState(null);
    const [ hoveringValue, setHoveringValue ] = useState(false);

    const [ showModalSearch, setShowModalSearch ] = useState(false)

    useEffect(() => {
        value != props.defaultEntry ? setHasChange(true) : setHasChange(false);
        setValue(props.defaultEntry);
    }, [props.defaultEntry])

    useEffect(() => {
        if (typeof(props.hasChange) == "boolean") {
            setHasForceChange(props.hasChange);
        }
    }, [props.hasChange])

    useEffect(() => {
        value != props.defaultEntry ? setHasChange(true) : setHasChange(false);
        setDefaultEntityTemplate((prev: any) => {
            if (value) {
                let t: any = {};
                t[props.keyName] = value;
                return t;
            } else {
                return prev;
            }
        })
    }, [value])

    const newEntity = (entity: any) => {
        var update: any = {};
        ENTITY_PREVIEW_FIELDS[props.instruction.mapTo as "users" | "messages" | "courses" | "pools"].forEach((key: string) => {
            update[key] = entity[key];
        })
        props.instruction.structure == "direct" ? setValue(update) : props.onSubmit ? props.onSubmit(JSON.stringify(update)) : console.error("onSubmit not defined");
        
        setShowModalSearch(false);
    }

    return (
        <>
            <FormGroup className={!props.forceDirect ? "INPUTGROUP" : ""} data-key={props.keyName} data-formid={props.formId} data-type="map" data-haschange={hasChange} data-value={CONVERTERS.toString(value)} data-text={getCurrentTextAsString()}>

                {/* LABEL */}

                {
                    !props.hideLabel ? 
                        props.isSearch ? <FormLabel>Suche</FormLabel> : <FormLabel>{props.instruction.disp} {(hasChange && typeof(hasForceChange) == "undefined") || hasForceChange ? <Pen /> : ""}</FormLabel>
                    :
                        ""
                }
                <InputGroup>

                    {/* TEXT */}

                    {
                        props.isSearch ? 
                            props.instruction.searchTextConfig?.map((list: Array<{key: string, disp: string}>, index: number) => {
                                return (<InputGroup.Text style={{ cursor: "pointer" }} onClick={() => {
                                    setSearchTextIndices((prev: Array<number>) => {
                                        var copy: Array<number> = [...prev];
                                        copy[index] = (copy[index]+1) % list.length;
                                        return copy;
                                    })
                                }} key={index}> {list[searchTextIndices[index]].disp} </InputGroup.Text>)
                            })
                        :
                            ""
                    }

                    {/* INPUT */}
                    
                    <Button
                    variant="outline-primary"
                    disabled={props.disabled}
                    onClick={() => {
                        setShowModalSearch(true);
                    }}
                    >Suchen</Button>

                    {/* FEEDBACK */}

                    {props.pFeedback ? <FormControl.Feedback>{props.pFeedback}</FormControl.Feedback>:null}
                    {props.nFeedback ? <FormControl.Feedback type="invalid">{props.nFeedback}</FormControl.Feedback>:null}
                
                </InputGroup>
            </FormGroup>

            {
                defaultEntityTemplate && !props.forceDirect ?
                    <CollapseWrapper dimension="height" show={!props.isSearch && !! value}>
                        <div className="d-flex align-items-center justify-content-between" onMouseOver={() => {setHoveringValue(true)}} onMouseOut={() => {setHoveringValue(false)}}>
                            
                            <>
                                <FieldDisplay
                                defaultEntity={defaultEntityTemplate}
                                keyName={props.keyName}
                                enableRemoveListItems={!props.disabled}
                                />
                                <CollapseWrapper show={hoveringValue} dimension="width">
                                    <Button variant="outline-danger" className="border-0" onClick={(e: any) => {
                                            e.stopPropagation();
                                            setValue(null);
                                            setHoveringValue(false);
                                        }}><Trash /></Button>
                                </CollapseWrapper>
                            </>
                        </div>
                    
                    </CollapseWrapper>
                :
                    null
            }
            {/* {
                !props.isSearch && defaultEntityTemplate ?
                    
                :
                    ""
            } */}

            <ModalWrapper show={showModalSearch} onClose={() => {setShowModalSearch(false)}}>
                <CollectionQueryTableComponent settings={{onSelectEntity: (entity: any) => {
                    newEntity(entity);
                }}} collection={props.instruction.mapTo} active />
            </ModalWrapper>

        </>
    )
}

export const EvaluateMap = (input: any) => {
    return CONVERTERS.fromString(input.value);
}