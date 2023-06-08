import { CheckCircleFill, XCircle } from "react-bootstrap-icons";

export default function BooleanField(props: {
    defaultEntry: string;
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
            props.enableInteraction ? navigator.clipboard.writeText(props.defaultEntry) : null;
        }}>
            {props.defaultEntry ? <CheckCircleFill color='rgb(0,200,0)' /> : <XCircle color='rgb(200,0,0)' />}
        </div>
    </div>
)
}