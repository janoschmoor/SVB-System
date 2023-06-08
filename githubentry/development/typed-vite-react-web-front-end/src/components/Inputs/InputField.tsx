import { Alert } from "react-bootstrap";

import { FIELD_TYPES } from "../../contexts/SystemContext";
import BooleanInput, { EvaluateBoolean } from "./direct/BooleanInput";
import DateInput, { EvaluateDate } from "./direct/DateInput";
import EmailInput, { EvaluateEmail } from "./direct/EmailInput";
import MapInput, { EvaluateMap } from "./direct/MapInput";
import NumberInput, { EvaluateNumber } from "./direct/NumberInput";
import SelectInput, { EvaluateSelect } from "./direct/SelectInput";
import TextInput, { EvaluateText } from "./direct/TextInput";
import ListInput, { EvaluateList } from "./list/ListInput";

export default function InputField(props: {
    keyName: string,
    formId?: string | number;
    hideLabel?: boolean,
    isSearch?: boolean,
    defaultEntity?: any;
    disabled?: boolean;
    pFeedback?: string;
    nFeedback?: string;
    onChange?: Function;
    onBlur?: Function;
    onSubmit?: Function;
    forceDirect?: boolean;
    hasChange?: boolean;
}) {
    
    const formId = props.formId ? props.formId : "default";

    const instruction = FIELD_TYPES.find((inst: any) => inst.key ==  props.keyName)
    if (!instruction) {
        return <Alert variant="danger">Instruction {props.keyName} not found</Alert>
    }

    if (instruction.structure == "direct" || props.forceDirect) {
        switch (instruction.type) {
            case "text":
                return (
                    <TextInput
                    formId={formId}
                    instruction={instruction}
                    keyName={props.keyName}
                    hideLabel={props.hideLabel}
                    isSearch={props.isSearch}
                    disabled={props.disabled}
                    defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                    pFeedback={props.pFeedback}
                    nFeedback={props.nFeedback}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onSubmit={props.onSubmit}
                    forceDirect={props.forceDirect}
                    hasChange={props.hasChange}
                    />
                )
            case "number":
                return (
                    <NumberInput
                    formId={formId}
                    instruction={instruction}
                    keyName={props.keyName}
                    hideLabel={props.hideLabel}
                    isSearch={props.isSearch}
                    disabled={props.disabled}
                    defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                    pFeedback={props.pFeedback}
                    nFeedback={props.nFeedback}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onSubmit={props.onSubmit}
                    forceDirect={props.forceDirect}
                    hasChange={props.hasChange}
                    />
                )
            case "email":
                return (
                    <EmailInput
                    formId={formId}
                    instruction={instruction}
                    keyName={props.keyName}
                    hideLabel={props.hideLabel}
                    isSearch={props.isSearch}
                    disabled={props.disabled}
                    defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                    pFeedback={props.pFeedback}
                    nFeedback={props.nFeedback}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onSubmit={props.onSubmit}
                    forceDirect={props.forceDirect}
                    hasChange={props.hasChange}
                    />
                )
            case "date":
                return (
                    <DateInput
                    formId={formId}
                    instruction={instruction}
                    keyName={props.keyName}
                    hideLabel={props.hideLabel}
                    isSearch={props.isSearch}
                    disabled={props.disabled}
                    defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                    pFeedback={props.pFeedback}
                    nFeedback={props.nFeedback}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onSubmit={props.onSubmit}
                    forceDirect={props.forceDirect}
                    hasChange={props.hasChange}
                    />
                )
            case "boolean":
                return (
                    <BooleanInput
                    formId={formId}
                    instruction={instruction}
                    keyName={props.keyName}
                    hideLabel={props.hideLabel}
                    isSearch={props.isSearch}
                    disabled={props.disabled}
                    defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                    pFeedback={props.pFeedback}
                    nFeedback={props.nFeedback}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onSubmit={props.onSubmit}
                    forceDirect={props.forceDirect}
                    hasChange={props.hasChange}
                    />
                )
            case "select":
                return <SelectInput
                        formId={formId}
                        instruction={instruction}
                        keyName={props.keyName}
                        hideLabel={props.hideLabel}
                        isSearch={props.isSearch}
                        disabled={props.disabled}
                        defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                        pFeedback={props.pFeedback}
                        nFeedback={props.nFeedback}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        onSubmit={props.onSubmit}
                        forceDirect={props.forceDirect}
                        hasChange={props.hasChange}
                        />

            case "map":
                return <MapInput
                        formId={formId}
                        instruction={instruction}
                        keyName={props.keyName}
                        hideLabel={props.hideLabel}
                        isSearch={props.isSearch}
                        disabled={props.disabled}
                        defaultEntry={props.defaultEntity ? props.defaultEntity[props.keyName] : undefined}
                        pFeedback={props.pFeedback}
                        nFeedback={props.nFeedback}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        onSubmit={props.onSubmit}
                        forceDirect={props.forceDirect}
                        hasChange={props.hasChange}
                        />
            default:
                return <Alert variant="warning">Not found</Alert>
        }
    }
    if (instruction.structure == "list") {
        return <ListInput
            formId={formId}
            instruction={instruction}
            keyName={props.keyName}
            hideLabel={props.hideLabel}
            isSearch={props.isSearch}
            disabled={props.disabled}
            defaultEntity={props.defaultEntity ?? undefined}
            pFeedback={props.pFeedback}
            nFeedback={props.nFeedback}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onSubmit={props.onSubmit}
            />
            
    }
    return <Alert variant="warning">Structure {instruction.structure} not found</Alert>
}

export const EvaluateInput = (input: any) => {

    var instruction = FIELD_TYPES.find((f: any) => f.key == input.key);
    if (instruction?.structure == "list") {
        return EvaluateList(input);
    }

    switch (input.type) {
        case "text":
            return EvaluateText(input);
        case "number":
            return EvaluateNumber(input);
        case "email":
            return EvaluateEmail(input);
        case "select":
            return EvaluateSelect(input);
        case "date":
            return EvaluateDate(input);
        case "boolean":
            return EvaluateBoolean(input);
        case "map":
            return EvaluateMap(input);
    
        default:
            console.error("Input type "+input.type+" not found")
            return undefined;
    }
}