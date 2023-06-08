import FieldDisplay from "./FieldDisplay";
import EntityPreview from "./mapTo/EntityPreview";

export default function MapField(props: {
    defaultEntry: any;
    keyName: string;
    instruction: any;
    showLabel: boolean | undefined;
    enableInteraction: boolean | undefined;
    preview: boolean | undefined;
    mapTo?: string;
    onClick?: any;
}) {

    var mapTo = props.mapTo;
    !mapTo ? mapTo = props.instruction.mapTo : null;

    return mapTo ? 
        <>
            {
                props.showLabel ? 
                    <div><strong>{props.instruction.disp != "Objekt" ? props.instruction.disp : ""}</strong></div>
                :
                    ""
            }
            <EntityPreview onClick={props.onClick} entity={props.defaultEntry} maxDetails={5} mapTo={mapTo} />
        </>
    :
        <div className="d-flex justify-content-between">
            {
                props.showLabel ? 
                    <div><strong>{props.instruction.disp}</strong></div>
                :
                    ""
            }
            <div>
                {
                    props.preview ? 
                        <div style={{ maxHeight: "80px", overflow: "scroll" }}>
                            {
                                Object.keys(props.defaultEntry).map((key: any) => {
                                    return <FieldDisplay key={key} defaultEntity={props.defaultEntry} keyName={key} enableInteraction={props.enableInteraction} />
                                })
                            }
                        </div>
                    :
                        
                        <>
                            {
                                Object.keys(props.defaultEntry).map((key: any) => {
                                    return <FieldDisplay key={key} defaultEntity={props.defaultEntry} keyName={key} showLabel={props.showLabel} enableInteraction={props.enableInteraction} />
                                })
                            }
                        </>
                }
            </div>
        </div>
}