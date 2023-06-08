import { useEffect, useState } from "react";
import { Button, FormCheck, FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { Pen, PlusLg } from "react-bootstrap-icons";

export default function BooleanInput(props: {
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
    onSubmit: Function | undefined;
    onBlur: Function | undefined;
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
    const [ value, setValue ] = useState(props.defaultEntry ? props.defaultEntry : "");
    const [ hasChange, setHasChange ] = useState(false);
    const [ hasForceChange, setHasForceChange ] = useState(props.hasChange);
    const [ hasTyped, setHasTyped ] = useState(false);

    useEffect(() => {
        value != props.defaultEntry ? setHasChange(true) : setHasChange(false)
    }, [props.defaultEntry])

    useEffect(() => {
        if (typeof(props.hasChange) == "boolean") {
            setHasForceChange(props.hasChange);
        }
    }, [props.hasChange])

    return (
        <FormGroup className={!props.forceDirect ? "INPUTGROUP" : ""} data-key={props.keyName} data-formid={props.formId} data-type="boolean" data-haschange={hasChange} data-value={value} data-text={getCurrentTextAsString()}>

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

                <FormCheck
                    className="m-auto" 
                    disabled={props.disabled}
                    defaultChecked={props.defaultEntry && !(props.instruction.structure == "list") ? props.defaultEntry : false}
                    onChange={(e: any) => {
                        setValue(e.target.checked);
                        if (!props.isSearch) {
                            e.target.checked != props.defaultEntry ? setHasChange(true) : setHasChange(false)
                        }
                        props.onChange ? props.onChange(e) : null
                    }}
                    onBlur={(e: any) => {
                        props.onBlur ? props.onBlur(e) : null
                    }}
                />
                {
                    props.onSubmit ? 
                        <Button onClick={(e: any) => {
                            props.onSubmit ? props.onSubmit(value) : null;
                            setHasTyped(false);
                        }} disabled={props.disabled}><PlusLg></PlusLg></Button>
                    :
                        null
                }

                {/* FEEDBACK */}

                {props.pFeedback ? <FormControl.Feedback>{props.pFeedback}</FormControl.Feedback>:""}
                {props.nFeedback ? <FormControl.Feedback type="invalid">{props.nFeedback}</FormControl.Feedback>:""}
            
            </InputGroup>
        </FormGroup>
    )
}

export const EvaluateBoolean = (input: any) => {
    return (input.value === "true" || input.value === true)
}