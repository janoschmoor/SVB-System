import { CONVERTERS } from "../../contexts/systemContext";

export default function DateField(props: {
    defaultEntry: any;
    keyName: string;
    instruction: any;
    showLabel: boolean | undefined;
    enableInteraction: boolean | undefined;
    onClick?: any;
}) {
  return (
    <div onClick={props.onClick} className="d-flex justify-content-between">

        {/* LABEL */}

        {
            props.showLabel ? 
                <div><strong>{props.instruction.disp}</strong></div>
            :
                ""
        }

        {/* ENTRY */}

        <div style={{ cursor: "pointer" }} onClick={() => {
            props.enableInteraction ? navigator.clipboard.writeText(CONVERTERS.toDate(props.defaultEntry)) : null;
        }}>
            {CONVERTERS.toDate(props.defaultEntry)}
        </div>
    </div>
)
}