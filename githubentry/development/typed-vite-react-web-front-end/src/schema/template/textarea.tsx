import { useEffect, useState } from "react";
import { Alert, Button, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { ArrowRight, Pen } from "react-bootstrap-icons";
import { Form } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function TextareaTemplate(props: 
    {
        data: string | undefined,
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
        {operator: ".", display: "enthält"}
    ];
    const defaultData = "";


    // FUNCTIONS
    const parseToDisplay = (input: string): string => {
        return input;
    }
    const parseFromDisplay = (input: string): string => {
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
        const valid = (typeof localData === "string" && ((localData.length > 0) || (props.schema.optional == true) || (props.data == undefined)))
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
                    type: "text",
                    value: parseFromDisplay(localData),
                    key: props.schema.key,
                }});
            } else {
                props.onChange({change: parseFromDisplay(localData), path: props.path});
            }
        }
    }
    const onChange = (value: string) => {
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
                    {" "}<b>{props.schema.display}: </b></>
                :
                    <>{hasChanges && props.data != undefined ?
                        <Pen />
                    :
                        null}
                    {" "}<b>{props.schema.key.split("/")[props.schema.key.split("/").length-1]}: </b></>

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
                        <InputGroup>
                            <InputGroup.Text>{getLabel()}</InputGroup.Text>
                            <InputGroup.Text style={{cursor: "pointer"}} onClick={() => {
                                setSearchOption((searchOption+1) % searchOptions.length)
                            }}>{searchOptions[searchOption].display}</InputGroup.Text>
                            <FormControl
                                type="text"
                                defaultValue={localData}
                                onChange={(e) => onChange(e.target.value)}
                                isValid={inputIsValid && hasChanges}
                                isInvalid={!inputIsValid && hasChanges}
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
                        <InputGroup>
                            <InputGroup.Text>{getLabel()}</InputGroup.Text>
                            <FormControl
                                type="text"
                                disabled={props.schema.disableChange}
                                defaultValue={localData}
                                placeholder={initialData}
                                onChange={(e) => onChange(e.target.value)}
                                isValid={inputIsValid && hasChanges}
                                isInvalid={!inputIsValid && hasChanges}
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
            {getLabel()}{localData.length > 0 ? localData : <i style={{color: "gray"}}>Keine Angabe</i>}
        </div>
    );
    
}