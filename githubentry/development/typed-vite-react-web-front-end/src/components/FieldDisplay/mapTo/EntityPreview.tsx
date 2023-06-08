import { ENTITY_PREVIEW_FIELDS } from "../../../contexts/SystemContext";
import FieldDisplay from "../FieldDisplay";

export default function EntityPreview(props: {
    entity: any;
    mapTo: any;
    maxDetails: number;
    onClick?: Function;
}) {
    
    var c: any = {...ENTITY_PREVIEW_FIELDS};
    const fields: Array<string> = c[props.mapTo];
    
    return (
        <div className="d-flex justify-content-between w-100 shadow-sm flex-wrap border rounded mt-1 p-2" style={{ cursor: "pointer" }} onClick={(e: any) => {
            navigator.clipboard.writeText(`users/${props.entity.id}`);
            props.onClick ? props.onClick(e) : null;
        }}>
            {
                fields.map((key: string, index: number) => {
                    return (index < Math.min(fields.length, props.maxDetails)) ?
                        <FieldDisplay key={index} defaultEntity={props.entity} keyName={key} />
                    :
                        ""
                })
            }

        </div>
    )
}
