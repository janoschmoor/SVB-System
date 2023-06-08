import { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { Pen, PlusLg } from "react-bootstrap-icons";

export default function TextInput(props: {
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
        <FormGroup className={!props.forceDirect ? "INPUTGROUP" : ""} data-key={props.keyName} data-formid={props.formId} data-type="text" data-haschange={hasChange} data-value={value} data-text={getCurrentTextAsString()}>

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
                
                <FormControl
                    type="text"
                    placeholder={props.defaultEntry ? props.defaultEntry : "enthält"}
                    disabled={props.disabled}
                    defaultValue={props.defaultEntry && !(props.instruction.structure == "list") ? props.defaultEntry : ""}
                    onChange={(e: any) => {
                        setValue(e.target.value);
                        e.target.value != "" ? setHasTyped(true) : setHasTyped(false);
                        if (!props.isSearch) {
                            e.target.value != props.defaultEntry ? setHasChange(true) : setHasChange(false)
                        }
                        props.onChange ? props.onChange(e) : null
                    }}
                    onBlur={(e: any) => {
                        props.isSearch && props.clearOnBlur ? e.target.value = "" : null;
                        // props.isSearch ? setValue("") : null;
                        props.onBlur ? props.onBlur(e) : null
                    }}
                />
                {
                    props.onSubmit ? 
                        <Button onClick={(e: any) => {
                            props.onSubmit ? props.onSubmit(value) : null;
                            setHasTyped(false);
                        }} disabled={props.disabled || !hasTyped }><PlusLg></PlusLg></Button>
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

export const EvaluateText = (input: any) => {
    return input.value;
}
