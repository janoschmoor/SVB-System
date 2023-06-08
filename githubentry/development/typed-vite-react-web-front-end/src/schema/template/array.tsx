import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { CaretDown, CaretUp, CaretUpSquare, PlusLg, XLg } from "react-bootstrap-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CollapseWrapper from "../../components/Wrappers/CollapseWrapper";
import DataUI from "../DataUI";

export default function ArrayTemplate(props: 
    {
        data: any,
        path: string | undefined,
        depth: number,
        schema: any,
        onChange: (data: any) => void,
        config: {
            disableLabel?: boolean,
            disableEditable?: boolean,
            editMode?: boolean,
            disableInteraction?: boolean,
        },
    }
) {

    const [ showPreview, setShowPreview ] = useState(false);
    const [ localData, setLocalData ] = useState<any>(props.data);
    const [ draggedItem, setDraggedItem ] = useState<any>(null);
    const [ hasChanged, setHasChanged ] = useState(false);
    const [ hoverItem, setHoverItem ] = useState<number>(-1);
    // const [ forceShowAll, setForceShowAll ] = useState(false);

    useEffect(() => {
        if (hasChanged) {
            props.onChange({change: localData, path: props.path});
        } else {
            setHasChanged(true);
        }
    }, [localData]);

    const createNewEntry = () => {
        const newDataEntry = props.schema.template;
        setLocalData((p: any) => {
            return [...p, newDataEntry];
        })
    }
    const handleDragStart = (e: any, index: number) => {
        setDraggedItem(localData[index]);
        // e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', e.target.parentNode);
        // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
      };
    
      const handleDragOver = (e: any, index: number) => {
        e.preventDefault();
        const newItems = [...localData];
        const draggedItemIndex = newItems.indexOf(draggedItem);
        newItems.splice(draggedItemIndex, 1);
        newItems.splice(index, 0, draggedItem);
        setLocalData(newItems);
      };
    
      const handleDragEnd = () => {
        setDraggedItem(null);
      };



    if (!localData) {
        return <Alert variant="warning">Keine Listensuche</Alert>
    }

    return (
        <>
            {
                props.config.disableLabel ?
                    
                    localData.length == 0 ?
                        <i style={{color: "gray"}}>Keine Einträge</i>
                    :
                        <></>
                    
                :
                    <div className={"d-flex justify-content-between"}>
                        <div>
                            <b>{props.schema.display}: </b>
                            {
                                localData.length == 0 ?
                                    <i style={{color: "gray"}}>Keine Einträge</i>
                                :
                                    <></>
                            }
                        </div>
                        
                        <div>
                            <Button size="sm" variant={"outline-primary"} onClick={() => {createNewEntry()}}><PlusLg /></Button>
                            <Button size="sm" variant={"outline-primary"} onClick={() => {setShowPreview(!showPreview)}}>{!showPreview ? <CaretUp /> : <CaretDown />}</Button>
                        </div>
                    </div>
            }

            {
                localData.length == 0 ?
                    <></>
                :
                    <CollapseWrapper show={!showPreview} dimension={"height"}>
                        <div className={"d-flex"} onMouseOut={() => {setHoverItem(-1)}}>
                            {
                                localData.map((entry: any, index: number) => {
                                    return (
                                        <div
                                        draggable={!props.config.disableInteraction}
                                        key={entry+index}
                                        onMouseOver={() => {setHoverItem(index)}}
                                        className="me-1 d-flex"
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnd={handleDragEnd}
                                        >
                                            <DataUI data={entry} path={props.path+"/"+index} depth={props.depth-1} onChange={(e:any)=>{props.onChange(e)}} config={{...props.config, disableLabel: true}} />
                                            <CollapseWrapper show={hoverItem == index && !props.config.disableInteraction} dimension="width">
                                                <Button size="sm" variant={"outline-danger"} onClick={() => {
                                                    setLocalData((p: any) => {
                                                        const newP = [...p];
                                                        newP.splice(index, 1);
                                                        return newP;
                                                    })
                                                }}><XLg></XLg></Button>
                                            </CollapseWrapper>
                                            ,
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </CollapseWrapper>
            }

            
        </>
    );
}