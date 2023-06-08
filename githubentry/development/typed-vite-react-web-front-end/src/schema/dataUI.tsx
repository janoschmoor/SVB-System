import { useEffect, useState } from "react";
import { Alert, Col } from "react-bootstrap";

import Interpreter from "./interpreter";

import ArrayTemplate from "./template/array";
import BooleanTemplate from "./template/boolean";
import DateTemplate from "./template/date";
import EmailTemplate from "./template/email";
import NumberTemplate from "./template/number";
import ObjectTemplate from "./template/object";
import SelectTemplate from "./template/select";
import StringTemplate from "./template/string";

import UserTemplate from "./template/custom/user";
import PhotoURLTemplate from "./template/photourl";
import TextareaTemplate from "./template/textarea";
import UserPreviewTemplate from "./template/custom/userPreview";
import CoursePreviewTemplate from "./template/custom/coursePreview";

export default function DataUI(props: 
{
    data: any,
    path: string | undefined,
    depth: number,
    onChange?: (data: any) => void,
    config: {
        disableLabel?: boolean,
        disableEditable?: boolean,
        editMode?: boolean,
        disableInteraction?: boolean,
    }
}) {

    const onChange = (change: any) => {
        if (props.onChange) {
            props.onChange(change);
        } else {
            console.warn("No onChange handler for DataUI");
        }
    }

    const [ schema, setSchema ] = useState<any>(Interpreter(props.path, props.data));
    const [ childConfig, setChildConfig ] = useState<any>(Object.assign({}, props.config));

    useEffect(() => {
        setChildConfig(Object.assign({}, props.config));
    }, [props.config]);

    useEffect(() => {
        setSchema(Interpreter(props.path, props.data));
    }, [props.data, props.path]);
    

    if (!schema) {
        return <Alert variant="warning">Schema for type <b>{props.data ? props.data.toString() : "_undefined"}</b> for path <b>{props.path ? props.path : "_undefined"}</b> not found.</Alert>
    }

    switch (schema.type) {
        case "string":
            return (<StringTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
        
        case "textarea":
            return (<TextareaTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
            
        case "email":
            return (<EmailTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
        
        case "boolean":
            return (<BooleanTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
                
        case "number":
            return (<NumberTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
        
        case "select":
            return (<SelectTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
        
        case "date":
            return (<DateTemplate data={props.data} path={props.path} depth={props.depth} schema={schema} onChange={(e: any) => {onChange(e)}} config={childConfig}/>);
                   
        case "object":
            if (schema.preview) {
                switch (schema.preview) {
                    case "users":
                        return (<UserPreviewTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
                    case "courses":
                        return (<CoursePreviewTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
                    default:
                        break;
                }
            }
            return (<ObjectTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);

        case "array":
            return (<ArrayTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);

        case "photoUrl":
            return (<PhotoURLTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
    


        case "customUserObject":
            return (<UserTemplate data={props.data} path={props.path || undefined} depth={props.depth} schema={schema} onChange={(e:any) => {onChange(e)}} config={childConfig}/>);
    

        default:
            return (<Alert variant="warning">Schema returned with unknown type <b>{schema ? schema.type : undefined}</b> on <b>{schema ? schema.display : undefined}</b></Alert>);
    };

}