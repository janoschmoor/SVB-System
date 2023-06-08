import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

export default function CollapseWrapper(props: {
    children: any,
    show: boolean,
    dimension: "width" | "height",
    minHeight?: string,
    width?: string,
}) {

    const [ show, setShow ] = useState(props.show);
    const [ minHeight, setMinHeight ] = useState(props.minHeight ?? "auto");
    const [ width, setWidth ] = useState(props.width ?? "auto");

    

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    return (
        <div style={{ minHeight: minHeight }}>
            <Collapse in={show} dimension={props.dimension}>
            <div id="example-collapse-text">
                <div style={{ width: width }}>
                    {props.children}
                </div>
            </div>
            </Collapse>
        </div>
    )
}
