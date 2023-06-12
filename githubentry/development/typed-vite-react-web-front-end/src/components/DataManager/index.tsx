import { useState } from "react";
import { Alert, Container, Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getProperties } from "../../schema/interpreter";
import CollectionQueryTableComponent from "./components/CollectionQueryTable";

export default function DataManagerComponent(props: {
    settings: any,
    defaultCollection: string;
}) {

    const { state } = useLocation();

    const [ collection, setCollection ] = useState(state && state.requestedCollection ? state.requestedCollection : props.defaultCollection);

    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Container fluid><Alert variant="info">Im Umgang mit dem Datenmanager musst du eingeloggt sein.</Alert></Container>
    }

    const dbProperties = getProperties("db");
  
    return (
        <div className="mb-5">
            <Tabs
            
            activeKey={collection}
            onSelect={(k: any) => {
                setCollection(k);
            }}
            >
                {
                    dbProperties?.map((element: any, index: number) => {
                        return (
                            <Tab key={index} eventKey={element.key} title={element.display}>
                                <CollectionQueryTableComponent active={element.key == collection} settings={state ? {...props.settings, queryConstructor: state.constraint} : props.settings} collection={element.key} />
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </div>
    )
}
