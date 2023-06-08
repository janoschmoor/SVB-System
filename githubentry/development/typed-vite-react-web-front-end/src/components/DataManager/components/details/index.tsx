import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FieldDisplay from "../../../FieldDisplay/FieldDisplay";
import InputField from "../../../Inputs/InputField";

export default function EntityDetailsComponent(props: {
    defaultEntity: any;
    collection: "users" | "courses";
    disabled?: boolean;
    isNew?: boolean;
}) {

    const [ validated, setValidated ] = useState(true);
    const [ disabled, setDisabled ] = useState(true)

    // const keys = Object.keys(props.defaultEntity);
    const keys = {
        users: {
            all: ['country', 'city', 'date_of_birth', 'new_messages', 'roles', 'created_at', 'house_number', 'availability', 'parent_ids', 'sallary', 'country_ISO2', 'is_coach', 'is_admin', 'access_level', 'children', 'street', 'preffered_language', 'last_update', 'form_of_adress', 'id', 'portrait_url', 'email', 'linked', 'courses', 'invoice_delivery', 'phone_numbers', 'phone_number', 'is_client', 'postal_code', 'parents', 'status', 'first_name', 'last_name'],
            address: ['street', "house_number", "postal_code", "city", "country", "country_ISO2"],
            personal: ['form_of_adress', 'first_name', 'last_name', 'date_of_birth', 'preffered_language', 'phone_number', 'phone_numbers', 'email', 'portrait_url', "parents", "children", "availability"],
            admin: ['roles', "created_at", "last_update", "access_level", "is_admin", "is_coach", "is_client", "status", "linked", "sallary", "last_update", "id"],
            interactional: ['new_messages', "courses", "invoice_delivery"],
        },
        courses: {
            all: ["id", "base_cost", "category", "clients", "coaches", "code", "created_by", "dates", "duration", "end", "max_clients", "pool", "promotions", "repeat", "start", "start_day", "start_time", "status", "target_group", "training_intervall"],
        },
        logs: {
            all: ["id", "config", "courses", "error", "genId", "hasSucceeded", "msg", "period", "time", "upload"],
        },
        SYSTEM: {
            all: ["id", "events", "instructions", "courses"],
        }

    }

    useEffect(() => {
        props.disabled ? setDisabled(true) : setDisabled(false);
    }, [props.disabled])

    return (
        <Form noValidate validated={validated}>

            <Button onClick={() => {setDisabled(!disabled)}}>lock/unlock</Button>

            {
                keys[props.collection].all.map((key: any) => {

                    return (
                        
                        <Row key={key}>
                            <Col sm={6}>
                                <FieldDisplay showLabel defaultEntity={props.defaultEntity} keyName={key} />
                            </Col>
                            <Col sm={6}>
                                <InputField disabled={disabled} formId={`${props.collection}-${props.defaultEntity.id}`} defaultEntity={props.defaultEntity} keyName={key} />
                            </Col>
                        </Row>
                    )
                })
            }

        </Form>
    )
}
