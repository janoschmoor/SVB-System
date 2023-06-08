import { useEffect, useState } from "react";
import { Alert, Button, FormCheck, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { ArrowRight, Check, Check2, CheckCircleFill, Pen, StopCircleFill } from "react-bootstrap-icons";
import { Form } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function BooleanTemplate(props: 
    {
        data: boolean | undefined,
        path: string | undefined,
        depth: number,
        schema: any,
        onChange: (data: any) => void,
        config: {
            disableLabel?: boolean,
            disableEditable?: boolean,
            editMode?: boolean,
        },
    }
) {
    // CONSTANTS
    const searchOptions = [
        {operator: ".", display: "ist"}
    ];
    const defaultData = false;


    // FUNCTIONS
    const parseToDisplay = (input: boolean): boolean => {
        return input;
    }
    const parseFromDisplay = (input: boolean): boolean => {
        return input;
    }
    const validate = () => {
        if (isValid()) {
            setInputIsValid(true);
        } else {
            setInputIsValid(false);
        }
    }
    const isValid = () => {
        const valid = (typeof localData === "boolean");
        return valid;
    }
    const tryEndEditMode = () => {
        if (editMode) {
            if (inputIsValid) {
                startPropagation();
                setEditMode(false);
            }
        }
    }
    const tryEnterEditMode = () => {
        if (!editMode) {
            if (!props.schema.disableChange && allowEdit() && !props.config.disableEditable) {
                setEditMode(true);
            }
        }
    }
    const allowView = () => {
        if (props.schema.minViewLevel > 0) {
            if (!currentUserCustomClaims) { return false; }
            return currentUserCustomClaims.access_level >= props.schema.minViewLevel;
        } else {
            return true;
        }
    }
    const allowEdit = () => {
        if (props.schema.minEditLevel > 0) {
            if (!currentUserCustomClaims) { return false; }
            return currentUserCustomClaims.access_level >= props.schema.minEditLevel;
        } else {
            return true;
        }
    }
    const startPropagation = () => {
        if (inputIsValid && (hasChanges || props.data == undefined)) {
            if (typeof props.data == "undefined") {
                props.onChange({constraint: {
                    type: "boolean",
                    value: parseFromDisplay(localData),
                    key: props.schema.key,
                }});
            } else {
                props.onChange({change: parseFromDisplay(localData), path: props.path});
            }
        }
    }
    const onChange = (value: boolean) => {
        setLocalData(value);
    }


    // RENDER HELPER FUNCTIONS
    const getLabel = () => {
        if (props.config.disableLabel && !editMode) {
            return "";
        } else {
            return (
                !props.schema.isGeneric ? 
                    <>{hasChanges && props.data != undefined ?
                        <Pen /> 
                    :
                        null}
                    {" "}<b>{props.schema.display}</b></>
                :
                    <>{hasChanges && props.data != undefined ?
                        <Pen />
                    :
                        null}
                    {" "}<b>{props.schema.key.split("/")[props.schema.key.split("/").length-1]}</b></>

            );
        }
    }

    // STATE
    const { currentUserCustomClaims } = useAuth();

    const [ localData, setLocalData ] = useState(props.data === undefined ? defaultData : parseToDisplay(props.data));
    const [ initialData, setInitialData ] = useState(localData);
    const [ inputIsValid, setInputIsValid ] = useState(false);
    const [ hasChanges, setHasChanges ] = useState(false);
    const [ editMode, setEditMode ] = useState(!!props.config.editMode);

    const [ searchOption, setSearchOption ] = useState(0);

    // EFFECTS
    useEffect(() => {
        validate();
        localData != initialData ? setHasChanges(true) : setHasChanges(false);
    }, [localData]);
    useEffect(() => {
        setLocalData(props.data === undefined ? defaultData : parseToDisplay(props.data));
        setInitialData(props.data === undefined ? defaultData : parseToDisplay(props.data));
        setHasChanges(false);
    }, [props.data])



    // RENDER

    // SEARCH
    if (props.data === undefined) {
        return (
            <div>
                <Form noValidate onSubmit={(e) => {e.preventDefault(); startPropagation()}}>
                    <FormGroup>
                        <InputGroup className={"d-flex justify-content-between"}>
                            <InputGroup.Text>{getLabel()}</InputGroup.Text>
                            <InputGroup.Text style={{cursor: "pointer"}} onClick={() => {
                                setSearchOption((searchOption+1) % searchOptions.length)
                            }}>{searchOptions[searchOption].display}</InputGroup.Text>

                            <FormCheck
                                type="checkbox"
                                defaultChecked={!!localData}
                                onChange={(e) => onChange(e.target.checked)}
                                />
                            {
                                <Button disabled={!inputIsValid} onClick={() => {startPropagation()}} variant={"primary"}>
                                    Suchen
                                </Button>
                            }                            
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    if (!allowView()) {
        return (<Alert variant="danger">Error: Permission denied</Alert>)
    }

    // EDIT
    if (editMode) {
        return (
            <div>
                <Form noValidate onSubmit={(e) => {e.preventDefault(); tryEndEditMode()}}>
                    <FormGroup>
                        <InputGroup className={"d-flex justify-content-between"}>
                            <FormCheck
                                type="switch"
                                label={getLabel()}
                                disabled={props.schema.disableChange}
                                defaultChecked={!!localData}
                                onChange={(e) => onChange(e.target.checked)}
                                />
                            {
                                <Button disabled={!hasChanges && inputIsValid} onClick={() => {tryEndEditMode()}} variant={"primary"}>
                                    <ArrowRight></ArrowRight>
                                </Button>
                            }
                                
                            {!isValid ? <FormControl.Feedback type="invalid">Texteingabe erfordert</FormControl.Feedback>: null}
                            
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    // VIEW

    return (
        <div onClick={(e: any) => {
            tryEnterEditMode();
            }}>
            {getLabel()} {localData ? <CheckCircleFill color={"rgb(10,200,10)"} /> : <StopCircleFill color={"red"} />}
        </div>
    );
    
}