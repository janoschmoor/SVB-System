import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { ArrowRight, DropletHalf, Pen } from "react-bootstrap-icons";
import { Form } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function DateTemplate(props: 
    {
        data: Timestamp | Date | undefined,
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

    // FUNCTIONS
    const parseToDisplay = (input: Timestamp | Date): string => {
        if (input == null) {
            return "Kein Datum";
        } else if (input instanceof Timestamp) {
            return input.toDate().toLocaleString("de-DE");
        } else {
            return input.toLocaleString("de-DE");
        }
    }
    const parseFromDisplay = (input: string): Date | undefined => {
        const dateParts = input.split(".");
        if (dateParts.length != 3) {return undefined}
        const timeParts = dateParts[2].split(" ");
        if (timeParts.length != 2) {return undefined}
        const time = timeParts[1].split(":");
        if (time.length != 3) {return undefined}
        const date = new Date(parseInt(timeParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[0]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
        return date;
    }
    const validate = () => {
        if (isValid()) {
            setInputIsValid(true);
        } else {
            setInputIsValid(false);
        }
    }
    const isValid = () => {
        const date = parseFromDisplay(localData);
        const valid = date instanceof Date;
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
                    type: "date",
                    value: parseFromDisplay(localData),
                    key: props.schema.key,
                    operator: searchOptions[searchOption].operator,
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
    const formatDeltaTime = (deltaTime: number) => {
        const seconds = Math.floor(deltaTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        if (years > 0) {
            return `vor ${years}` + (!(years == 1) ? " Jahren" : "em Jahr");
        } else if (months > 0) {
            return `vor ${months}` + (!(months == 1) ? " Monaten" : "em Monat");
        } else if (days > 0) {
          return `vor ${days}` + (!(days == 1) ? " Tagen" : "em Tag");
        } else if (hours > 0) {
          return `vor ${hours}` + (!(hours == 1) ? " Stunden" : "er Stunde");
        } else if (minutes > 0) {
          return `vor ${minutes}` + (!(minutes == 1) ? " Minuten" : "er Minute");
        } else {
          return `vor ${seconds}` + (!(seconds == 1) ? " Sekunden" : "er Sekunde");
        }
    }

    // CONSTANTS
    const searchOptions = [
        {operator: ">=", display: "nach", sortDirection: "asc"},
        {operator: "<=", display: "vor", sortDirection: "desc"},
    ];
    const defaultData = parseToDisplay(new Date());

    // STATE
    const { currentUserCustomClaims } = useAuth();

    const [ localData, setLocalData ] = useState(props.data === undefined ? defaultData : parseToDisplay(props.data));
    const [ deltaTime, setDeltaTime ] = useState("");
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
        const dispDate = props.data === undefined ? defaultData : parseToDisplay(props.data)
        setLocalData(dispDate);
        setInitialData(dispDate);
        setHasChanges(false);
        if (props.schema.timeMode == "delta") {
            const interval = setInterval(() => {
                const t = parseFromDisplay(dispDate);
                if (t) {
                    const fixedTime = t.getTime(); // fixed time in milliseconds
                    const currentTime = new Date().getTime(); // current time in milliseconds
                    setDeltaTime(formatDeltaTime(currentTime - fixedTime)); // calculate delta time and update state
                } else {
                    setDeltaTime("Kein Datum");
                }
            }, 1000);
            return () => clearInterval(interval);
        }
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
                                props.onChange({searchOption: searchOptions[(searchOption+1) % searchOptions.length]})
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
                            {!inputIsValid ? <FormControl.Feedback type="invalid">Datum erfordert (TT.MM.JJJJ, HH:MM:SS)</FormControl.Feedback>: null}
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
                                
                            {!inputIsValid ? <FormControl.Feedback type="invalid">Datum erfordert (TT.MM.JJJJ, HH:MM:SS)</FormControl.Feedback>: null}
                            
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
            {getLabel()}{props.schema.timeMode == "delta" ? deltaTime : localData}
        </div>
    );
}