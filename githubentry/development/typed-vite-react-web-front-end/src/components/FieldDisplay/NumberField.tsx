export default function NumberField(props: {
    defaultEntry: string;
    keyName: string;
    instruction: any;
    showLabel: boolean | undefined;
    label?: string;
    enableInteraction: boolean | undefined;
    onClick?: any;
}) {
  return (
    <div onClick={props.onClick} className="d-flex justify-content-between">

        {/* LABEL */}

        {
            props.showLabel ? 
                <div><strong>{props.label ? props.label : props.instruction.disp}</strong></div>
            :
                ""
        }

        {/* ENTRY */}

        <div style={{ cursor: "pointer" }} onClick={() => {
            props.enableInteraction ? navigator.clipboard.writeText(props.defaultEntry) : null;
        }}>
            {props.defaultEntry}
        </div>
    </div>
)
}