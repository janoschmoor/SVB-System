import { Badge } from "react-bootstrap";

export default function SelectField(props: {
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
            props.enableInteraction ? navigator.clipboard.writeText(props.instruction.selectOptions.find((o: any) => o.key == props.defaultEntry).disp) : null;
        }}>
            {
                props.instruction.selectOptions.find((o: any) => o.key == props.defaultEntry)?.variant?
                    <Badge bg={props.instruction.selectOptions.find((o: any) => o.key == props.defaultEntry).variant}>{props.instruction.selectOptions.find((o: any) => o.key == props.defaultEntry).disp}</Badge>
                :
                    props.instruction.selectOptions.find((o: any) => o.key == props.defaultEntry)?.disp
            }
        </div>
    </div>
)
}