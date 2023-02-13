import { useState } from 'react';
import { Button, Container, Tab, Tabs } from 'react-bootstrap';
import LayoutComponent from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import CollectionInspectorComponent from './components/CollectionInspectorComponent';
import { firestorePenetrationTest } from './util/penetration';



export default function TestingGroundPage() {

    const { currentUser } = useAuth();
    const [ tabKey, setTabKey ] = useState("data");

    const settings = {}

    const switchTab = (k: string) => {
        setTabKey(k)
    }
    
    return (
        <LayoutComponent>

            <Tabs
            className="mb-3"
            activeKey={tabKey}
            onSelect={(k) => {
                if (typeof(k) == 'string') {
                    switchTab(k)
                }
            }}
            >
                <Tab eventKey="data" title="Daten">
                    <CollectionInspectorComponent settings={settings} />
                </Tab>
                <Tab eventKey="tests" title="Tests">
                    <Container fluid>
                        <Button onClick={() => {firestorePenetrationTest(currentUser)}}>Penetrate Firestore</Button>
                    </Container>
                </Tab>
            </Tabs>
        </LayoutComponent>
    )
}
