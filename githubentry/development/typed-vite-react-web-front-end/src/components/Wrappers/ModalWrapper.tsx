import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

export default function ModalWrapper(props: {
    children: any,
    show: boolean,
    onClose: Function,
    onSuccess?: Function,
    title?: string,
}) {

    const [ show, setShow ] = useState(props.show);

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    return (
        <Modal scrollable className="shadow" size="xl" fullscreen={"sm"} show={show} onHide={() => {props.onClose()}}>
            {
                props.title ?
                    <ModalHeader closeButton>
                        <ModalTitle>{props.title}</ModalTitle>
                    </ModalHeader>
                :
                    ""
            }

            <ModalBody className={"p-0"}>
                {props.children}
            </ModalBody>

            {
                props.onSuccess ? 
                    <ModalFooter>
                        <Button className={"w-100"} variant={"outline-primary"} onClick={() => {props.onSuccess ? props.onSuccess() : null}}>Sichern</Button>
                    </ModalFooter>
                :
                    ""
            }

        </Modal>
    )
}
