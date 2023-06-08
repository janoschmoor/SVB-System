import { useEffect, useState } from "react";
import { CONVERTERS } from "../../../contexts/SystemContext";
import FieldDisplay from "../../FieldDisplay/FieldDisplay";
import InputField, { EvaluateInput } from "../InputField";

export default function ListInput(props: {
    formId: string | number;
    instruction: any;
    keyName: string,
    hideLabel: boolean | undefined;
    isSearch: boolean | undefined,
    defaultEntity: any | undefined;
    disabled: boolean | undefined;
    pFeedback: string | undefined;
    nFeedback: string | undefined;
    onChange: Function | undefined;
    onBlur: Function | undefined;
    onSubmit: Function | undefined;
    clearOnBlur?: boolean;
}) {

    const [ value, setValue ] = useState(props.defaultEntity ? props.defaultEntity[props.keyName] : null)
    const [ hasChange, setHasChange ] = useState(false);
    const [ defaultEntityTemplate, setDefaultEntityTemplate ] = useState(props.defaultEntity ? props.defaultEntity[props.keyName] : null)

    useEffect(() => {
        // console.log(value, props.defaultEntity ? props.defaultEntity[props.keyName]: "keine")
        if (props.defaultEntity) {
            CONVERTERS.toString(value) != CONVERTERS.toString(props.defaultEntity[props.keyName]) ? setHasChange(true) : setHasChange(false)
        }
        var t: any = {}
        t[props.keyName] = value;
        setDefaultEntityTemplate(t)
    }, [value, props.defaultEntity])

    return (
        <div className={"INPUTGROUP"} data-key={props.keyName} data-formid={props.formId} data-type={props.instruction.type} data-haschange={hasChange} data-value={CONVERTERS.toString(value)} data-text={"-title"}>
            <InputField disabled={props.disabled} hasChange={hasChange} defaultEntity={props.defaultEntity} keyName={props.keyName} forceDirect onSubmit={(v:any) => {
                if (!props.isSearch) {
                    setValue((prev: any) => {
                        return [...prev, EvaluateInput({
                            type: props.instruction.type,
                            value: v,
                        })]
                    })
                } else {
                    setValue(EvaluateInput({
                        type: props.instruction.type,
                        value: v,
                    }))
                }
            }} />
            
            {
                !props.isSearch && defaultEntityTemplate ? 
                    <FieldDisplay showMax={3} enableRemoveListItems={!props.disabled} defaultEntity={defaultEntityTemplate} keyName={props.keyName} onListSelect={(e: any) => {
                        if (e.delete) {
                            setValue((prev: any) => {
                                var c = [...prev];
                                c.splice(e.index, 1)
                                return c
                            })
                        }
                    }} />
                :
                    null
            }
                
        </div>
    );
}
export const EvaluateList = (input: any) => {
    return CONVERTERS.fromString(input.value);
}
