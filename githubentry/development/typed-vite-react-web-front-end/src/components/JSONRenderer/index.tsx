import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { getDepth } from "./helper";
import String from "./string";

// A fully recursive fuction which renders any data type, allows change and lets a user update it
export default function JSONRenderer(props: {
    data: any,
    depth?: number,
    keyName?: string,
    schema?: any,
    settings: {
        label?: boolean,
        render?: string,
        edit?: boolean,
        allowEdit?: boolean,
    },
    onChange?: (data: any) => void,
}) {

    // find the type of the data and delegate to the correct renderer component

    const [ depth, setDepth ] = useState(props.depth ? props.depth : 0);
    const [ edit, setEdit ] = useState(props.settings.edit ? true : false);

    const [ originalData, setOriginalData ] = useState(props.data);
    const [ data, setData ] = useState(props.data);

    useEffect(() => {
        setData(props.data);
        setOriginalData(props.data);
    }, [props.data])

    useEffect(() => {
        setEdit(props.settings.edit ? true : false);
    }, [props.settings.edit])

    const getType = () => {
        const type = typeof(originalData);
        if (type == "object") {
            if (originalData == null) {
                return "null";
            }
            if (Array.isArray(originalData)) {
                return "array";
            }
            if (originalData instanceof Date) {
                return "date";
            }
            return "object";
        }
        return type;
    }


    switch (getType()) {
        case "string":
            return <String data={originalData} keyName={props.keyName} settings={props.settings} depth={depth} schema={props.schema} onChange={props.onChange} />
        case "date":
            return <String data={originalData.toString()} keyName={props.keyName} settings={props.settings} depth={depth} />
        case "number":
            return <span>{getDepth(depth)}{props.settings.label ? props.keyName+": " : null}{props.data.toString()}</span>
        case "boolean":
            return <span>{getDepth(depth)}{props.settings.label ? props.keyName+": " : null}{props.data.toString()}</span>
        case "null":
            return <span>{getDepth(depth)}{props.settings.label ? props.keyName+": " : null}null</span>
        case "array":
            return (
                <>
                    {getDepth(depth)}{props.settings.label ? props.keyName+": " : null}
                    [<br></br>
                    {props.data.map((item: any, index: number) => {
                        return <JSONRenderer key={index} data={item} keyName={index.toString()} settings={props.settings} depth={depth+1} />
                    })}
                    {getDepth(depth)}]<br></br>
                </>
            )
        case "object":
            return (
                <>
                    {getDepth(depth)}{props.settings.label ? props.keyName+": " : null}
                    {"{"}<br></br>
                    {Object.keys(props.data).map((key: any) => {
                        return <JSONRenderer key={key} data={props.data[key]} keyName={key} settings={props.settings} depth={depth+1} />
                    })}
                    {getDepth(depth)}{"}"}<br></br>
                </>
            )
        default:
            return <Alert variant="danger">Error: Invalid data type</Alert>

    }
}
