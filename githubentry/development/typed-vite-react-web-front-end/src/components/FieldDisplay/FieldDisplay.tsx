import { Alert } from "react-bootstrap";
import { FIELD_TYPES } from "../../contexts/SystemContext";
import BooleanField from "./BooleanField";
import DateField from "./DateField";
import EmailField from "./EmailField";
import ListDisplay from "./ListDisplay";
import MapField from "./MapField";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import TextField from "./TextField";

export default function FieldDisplay(props: {
    defaultEntity: any,
    keyName: string,
    showLabel?: boolean,
    label?: string,
    enableInteraction?: boolean,
    preview?: boolean,
    showMax?: number,
    mapTo?: string,
    onClick?: any,
    onListSelect?: Function,
    enableRemoveListItems?: boolean,
}) {

    const instruction: any = FIELD_TYPES.find((inst: any) => inst.key ==  props.keyName)
    if (!instruction) {
        return <Alert variant="danger">Instruction {props.keyName} not found</Alert>
    }

    if (instruction.structure == "direct") {
        switch (instruction.type) {
            case "text":
                return <TextField 
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
            case "number":
                return <NumberField
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
    
            case "email":
                return <EmailField 
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
    
            case "date":
                return <DateField 
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
            case "boolean":
                return <BooleanField 
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
            case "select":
                return <SelectField
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    onClick={props.onClick}
                    />
            case "map":
                return <MapField
                    defaultEntry={props.defaultEntity[props.keyName]}
                    keyName={props.keyName}
                    instruction={instruction}
                    showLabel={props.showLabel}
                    enableInteraction={props.enableInteraction}
                    preview={props.preview}
                    mapTo={props.mapTo}
                    onClick={props.onClick}
                    />
        
            default:
                return <Alert variant="warning">Key {props.keyName} not found on entity</Alert>
        }

    
    }
    if (instruction.structure == "list") {

        return <ListDisplay
            defaultEntity={props.defaultEntity}
            keyName={props.keyName}
            instruction={instruction}
            showLabel={props.showLabel}
            enableInteraction={props.enableInteraction}
            preview={props.preview}
            showMax={props.showMax}
            onListSelect={props.onListSelect}
            enableRemoveListItems={props.enableRemoveListItems}
            />
        
    }


    return <Alert variant="warning">Instruction structure not found</Alert>
}
