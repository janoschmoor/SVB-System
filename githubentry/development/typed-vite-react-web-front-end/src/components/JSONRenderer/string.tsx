import { useEffect, useState } from 'react'
import { getDepth } from './helper';

export default function String(props: {
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

    const checkAllowEdit = () => {
        if (props.settings.allowEdit) {
            setEdit(!edit);
        }
    }



    




    if (edit) {
        return (
            <input 
            type="text" 
            autoFocus
            value={data} 
            placeholder={originalData}
            onChange={(e) => {setData(e.target.value)}} 
            onBlur={(e) => {props.settings.edit ? null : setEdit(false)}}
            />
        )
    }
    return (
        <span
        onDoubleClick={() => {checkAllowEdit()}}
        >
            {getDepth(depth)}{props.settings.label ? props.keyName+": " : null}"{data.toString()}"
        </span>

    )
}