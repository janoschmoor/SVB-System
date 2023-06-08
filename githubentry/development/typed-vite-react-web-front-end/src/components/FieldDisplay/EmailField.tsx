import { Button } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";

export default function EmailField(props: {
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
                {props.defaultEntry}
            </div>

            {/* INTERACTION */}

            {props.enableInteraction ?
                <Button variant="outline-secondary" size="sm">
                    <BoxArrowUpRight onClick={() => {
                        window.open("mailto:"+props.defaultEntry);
                    }} /> 
                </Button>
            :
                ""
            }
        </div>
    )
}
