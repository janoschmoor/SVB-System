import { useEffect, useRef, useState } from "react";
import { Button, Form, Card, Col, Container, FormGroup, FormLabel, FormSelect, Row, Table, Nav, NavItem, NavLink, Tabs, Tab, Modal, FormText, FormControl, OverlayTrigger, Popover, PopoverHeader, PopoverBody, Spinner, InputGroup, Alert } from "react-bootstrap";
import { ArrowBarRight, ArrowRight, Check, CheckCircleFill, CheckLg, ExclamationTriangle, Plus, PlusLg, XCircle } from "react-bootstrap-icons";
import QueryOptionSelectorComponent from "./QueryOptionSelectorComponent";
import { loadCollection, loadCollectionSnapshot, loadDocument } from "../../../../services/firestore/firestore";
import { Unsubscribe } from "firebase/firestore";
import ListedEntityPreview from "./ListedEntity";
import EntityDetails from "./EntityDetails";
import { useSystem } from "../../../../contexts/systemContext";
import TableHeadComponent from "./TableHeadComponent";
import FormRange from "react-bootstrap/esm/FormRange";
import { buildConstraintStringDynamically } from "../../../../services/firestore/util/constraintBuilder";
import { useElementOnScreen } from "./visibiliser";

export default function CollectionInspectorComponent(props: {settings: {
    allowLoadMore?: boolean,
    limit?: number,
    showActionbar?: boolean,
    defaultTableSettings?: any
    queryConstructor?: any,
}}) {

    const settings = Object.assign({
        limit: 10,
        allowLoadMore: true,
        showActionbar: true,
    }, props.settings);
    const limit = settings.limit;

    const [ loading, setLoading ] = useState(false);
    const [ queryConstructor, setQueryConstructor ] = useState<any>(null);
    const [ tabKey, setTabKey ] = useState('users');
    const [ queryCollection, setQueryCollection ] = useState("users")
    const [ showEntityDetails, setShowEntityDetails ] = useState(-1);
    const [ selectedTableHeadIndex, setSelectedTableHeadIndex ] = useState<number>(0);
    
    const { SystemState } = useSystem();
    const [ tableSettings, setTableSettings ] = useState<any>(null);

    const [ queriedEntities, setQueriedEntities ] = useState<any>([]);
    const [ needsQueryConstructorUpdate, setNeedsQueryConstructorUpdate ] = useState(true);
    const [ unsubscribeFunctions, setUnsubscribeFunctions ] = useState<Array<Unsubscribe>>([]);
    const [ lastDocument, setLastDocument ] = useState<any>(null);
    const [ queryId, setQueryId ] = useState<number>(-1);
    const [ reachedEndOfQuery, setReachedEndOfQuery ] = useState(false)

    const queriedEntitiesRef = useRef<Array<any>>();
    queriedEntitiesRef.current = queriedEntities;

    const searchbarRef = useRef<HTMLInputElement>(null);
    const operatorRef = useRef<HTMLSpanElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const booleanRef = useRef<HTMLButtonElement>(null);

    const [ containerRef, isVisible ] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold:1.0
    })

    // useEffect(() => {
    //     if (searchbarRef.current) {
    //         searchbarRef.current.addEventListener("keypress", function(e:any) {
    //             if (e.key === "Enter") {
    //                 e.preventDefault();
    //                 loadMore();
    //             }
    //         });
    //     }
    // })

    useEffect(() => {
        if (isVisible) {
            loadMore();
        }
    }, [isVisible])

    useEffect(() => {
        if (SystemState) {
            if (settings.defaultTableSettings) {
                setTableSettings(settings.defaultTableSettings)
                return;
            }
            var table: Array<any> = [];
            var keys = eval(`SystemState.query.${queryCollection}.keys`);
            keys.forEach((element:any) => {
                if (element.isDefaultTable) {
                    table.push(element);
                }
            });

            setTableSettings(table);
        }
    }, [SystemState, queryCollection])

    useEffect(() => {
        if (queryConstructor) {
            runQuery();
        }
    }, [queryConstructor])

    const runQuery = () => {
        setLoading(true);
        var unsubscribe = loadCollectionSnapshot({path: queryCollection, options: queryConstructor, callback: queryUpdate, queryId: queryId});
        setUnsubscribeFunctions([unsubscribe]);
    }

    const queryUpdate = (snapshots: any, id: number) => {
        setLoading(false)
        if (queryId == id) {
            if (snapshots.empty) {
                setReachedEndOfQuery(true);
                return;
            }
            var qec = [...queriedEntitiesRef.current as Array<any>];
            var lastNewDocument: any = null;
    
            snapshots.docChanges().forEach((change:any) => {
                var data = change.doc.data();
                var i = qec.findIndex((entity: any) => entity.id === data.id);
                if (i != -1) {
                    qec[i] = data;
                    if (i == queriedEntities.length-1) {
                        lastNewDocument = change.doc;
                    }
                } else {
                    qec.push(data);
                    lastNewDocument = change.doc;
                }
            });
    
            setQueriedEntities(qec)
            if (lastNewDocument) {
                setLastDocument(lastNewDocument);
            }
            if (snapshots.size < limit) {
                setReachedEndOfQuery(true);
            }
        }
    }
    const loadMore = () => {
        if (!loading && (!reachedEndOfQuery || needsQueryConstructorUpdate)) {
            if (queryConstructor && !needsQueryConstructorUpdate) {
                if (settings.allowLoadMore) {
                    setLoading(true);
                    var unsubscribe = loadCollectionSnapshot({path: queryCollection, options: queryConstructor, callback: queryUpdate, queryId: queryId, lastDocument: lastDocument});
                    setUnsubscribeFunctions([...unsubscribeFunctions, unsubscribe]);
                }
                    
            } else {
                resetEntries();
                setQueryId((prev: number) => prev+1);
                if (settings.queryConstructor) {
                    setQueryConstructor(settings.queryConstructor)
                } else {
                    setQueryConstructor(buildQuery());
                }
                setNeedsQueryConstructorUpdate(false);
            }
        }
    }
    
    const resetEntries = () => {
        setReachedEndOfQuery(false);
        setQueriedEntities([]);
        setLastDocument(null);
        unsubscribeFunctions.forEach((f: any) => {f()})
        setUnsubscribeFunctions([]);
    }

    const buildQuery = () => {
        const queryConstructor: Array<any> = [
            {type: "limit", value: limit}
        ]
        for (let i = 0; i < tableSettings.length; i++) {
            if (tableSettings[i].isSelected) {
                var orderByElements: HTMLCollection = document.getElementsByClassName("data-container-order-by");
                for (let j = 0; j < orderByElements.length; j++) {
                    var element = orderByElements[j] as HTMLElement;
                    if (element.dataset.key == tableSettings[i].key) {
                        var constraint = {
                            type: "orderBy",
                            operator: element.dataset.sortdirection,
                            key: element.dataset.key,
                        };
                        switch (element.dataset.type) {
                            case "date":
                                constraint.key = `${element.dataset.key}_numeric`;
                                break;
                        }
                            
                        queryConstructor.push(constraint);
                    }
                }
                i = tableSettings.length;
            }
        }
        var whereElements: HTMLCollection = document.getElementsByClassName("data-container-where");
        for (let i = 0; i < whereElements.length; i++) {
            var element = whereElements[i] as HTMLElement;
            var wconstraint: {type: string, key: string, value: number | string, operator: string} = {
                type: element.dataset.type as string,
                key: element.dataset.key as string,
                value: element.dataset.whereconstraintvalue as string | number,
                operator: element.dataset.whereconstraintoperator as string,
            };
            switch (element.dataset.type) {
                case "date":
                    wconstraint.value = Date.parse(element.dataset.whereconstraintvalue as string);
                    wconstraint.key += "_numeric";
                    break;
            }
            queryConstructor.push(wconstraint);

        }
        return queryConstructor;
    }


    // const createNewSelector = () => {
    //     setSelectors([...selectors, selectors.length]);
    // }
    // const removeSelector = (index: number) => {
    //     var arr = [...selectors];
    //     arr.splice(index, 1);
    //     setSelectors(arr);
    // }

    const inspectEntity = (index: number) => {
        console.log(index)
        setShowEntityDetails(index);
    }

    const selectTableHead = (index: number) => {
        var settings = [...tableSettings];
        settings.forEach((element: any, i: number) => {
            i == index ? element.isSelected = true : element.isSelected = false;
            i == index ? setSelectedTableHeadIndex(index) : null;
        });
        setTableSettings(settings);
        setNeedsQueryConstructorUpdate(true);
    }

    const renderVisibiliser = () => {
        if (!settings.allowLoadMore && containerRef != false && containerRef != true) {
            return <div ref={containerRef}></div>
        }
        if (containerRef != false && containerRef != true && isVisible) {
            return <div ref={containerRef}>{reachedEndOfQuery ? "Alle ":""}{queriedEntities.length} Einträge geladen.</div>
        } else if (containerRef != false && containerRef != true) {
            return <div ref={containerRef}>{reachedEndOfQuery ? "Alle ":""}{queriedEntities.length} Einträge geladen.</div>
        }
    }

    const addTableColumn = (key: string) => {
        var keys = eval(`SystemState.query.${queryCollection}.keys`);
        var element = keys.find((k: any) => k.key == key);
        if (element) {

            setTableSettings((prev: any) => [...prev, element])
        }
    }

    const renderSearch = () => {
        if (!tableSettings[selectedTableHeadIndex]) {return <Alert variant="warning">Pending...</Alert>}
        switch (tableSettings[selectedTableHeadIndex].type) {
            case "text":
                return (
                    <FormGroup>
                        <FormLabel>Suche</FormLabel>
                        <InputGroup>
                            <InputGroup.Text>{tableSettings[selectedTableHeadIndex].disp}</InputGroup.Text>
                            <Form.Control
                            ref={searchbarRef}
                            type="text"
                            onBlur={(e: any) => {
                                e.target.value = "";
                            }} 
                            onChange={(e:any) => {
                                var list = [...tableSettings];
                                list[selectedTableHeadIndex].constraint = {value: e.target.value};
                                setTableSettings(list);
                                setNeedsQueryConstructorUpdate(true);
                            }}
                            placeholder={"enthält"}
                            />
                        </InputGroup>
                    </FormGroup>
                )
            case "date":
                const setConstraint = () => {
                    if (searchbarRef.current && operatorRef.current && typeof(Date.parse(searchbarRef.current.value)) == "number" ) {
                        var list = [...tableSettings];
                        var constraint = {
                            value: searchbarRef.current.value,
                            operator: operatorRef.current.innerText == "vor" ? "<=" : ">="
                        }
                        list[selectedTableHeadIndex].constraint = constraint;
                        setTableSettings(list);
                        setNeedsQueryConstructorUpdate(true);
                    }
                }
                return (
                    <FormGroup>
                        <FormLabel>Datum wählen</FormLabel>
                        <InputGroup>
                            <InputGroup.Text>{tableSettings[selectedTableHeadIndex].disp}</InputGroup.Text>
                            <InputGroup.Text ref={operatorRef} onClick={() => {
                                if (operatorRef.current) {
                                    operatorRef.current.innerText == "vor" ? operatorRef.current.innerHTML = "nach" : operatorRef.current.innerHTML = "vor";
                                    setConstraint();
                                }
                            }}>{"vor"}</InputGroup.Text>
                            <Form.Control
                            ref={searchbarRef}
                            type="text"
                            onChange={(e:any) => {
                                setConstraint()
                            }}
                            placeholder={"MM/TT/JJJJ"}
                            />
                        </InputGroup>
                    </FormGroup>
                );
            
            case "select":
                return (
                    <FormGroup>
                        <FormLabel>Auswählen</FormLabel>
                        <FormSelect ref={selectRef} onChange={() => {
                            var list = [...tableSettings];
                            var constraint = {
                                value: selectRef.current?.value
                            }
                            list[selectedTableHeadIndex].constraint = constraint;
                            setTableSettings(list);
                            setNeedsQueryConstructorUpdate(true);
                        }
                        }>
                            {tableSettings[selectedTableHeadIndex].selectOptions.map((opt: any) => {
                                return <option key={opt.key} value={opt.key}>{opt.disp}</option>
                            })}
                        </FormSelect>
                    </FormGroup>
                )
            
            case "boolean":
                return "";
            
            default:
                return <Alert variant="warning">Keine Optionen</Alert>
        }
    }



    const addCategoryPopover = (
        <Popover id="add-category-popover">
          <PopoverHeader as="h3">Zusätzliche Kategorien</PopoverHeader>
          <PopoverBody>
            <ul>
                {
                    SystemState && tableSettings
                    ?
                        eval(`SystemState.query.${queryCollection}.keys`).map((element: any, index: number) => {
                            var intersects = tableSettings.findIndex((e: any) => {e.key === element.key})
                            if (intersects) {
                                return <li onClick={() => {
                                    addTableColumn(element.key);
                                }} key={index}>{element.disp}</li>
                            }
                            return "";
                        })
                    :
                        ""
                }
            </ul>
          </PopoverBody>
        </Popover>
    )

    return (
        <>
            {
                tableSettings ?
                    <>
                        {
                            settings.showActionbar ?
                                <Row className="mb-3">
                                    <Col sm={9}>
                                        {renderSearch()}
                                    </Col>
                                    <Col sm={3} className="align-items-end d-flex">
                                        <Button className="w-100" disabled={loading || !needsQueryConstructorUpdate} onClick={() => {
                                            loadMore();
                                        }}>{loading ? "Loading..." : reachedEndOfQuery && !needsQueryConstructorUpdate ? <span>Alle {queriedEntities.length} geladen <CheckLg /></span> : <span>Laden <ArrowRight /></span>}</Button>
                                    </Col>
                                </Row>
                            :
                                ""
                        }


                        <Table size="sm" hover>
                            <thead>
                                <tr>
                                    {   
                                        tableSettings ? 
                                            tableSettings.map((element: {key:string, isDefaultTable?: boolean, type: string, disp: string, }, index: number) => {
                                                    return <th key={element.key} onClick={() => {
                                                        selectTableHead(index);
                                                    }}><TableHeadComponent key={element.key} tableSettingElement={element} /></th>
                                            })
                                        :
                                            <th>loading...</th>
                                    }
                                    <th>
                                        <OverlayTrigger trigger="focus" placement="left" overlay={addCategoryPopover}>
                                            <Button variant="outline-primary" size="sm"><PlusLg /></Button>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableSettings ? 
                                    queriedEntities.map((entity: any, index: number) => {
                                            return <ListedEntityPreview key={entity.id} tableSettings={tableSettings} type={queryCollection} entity={entity} onClick={() => {inspectEntity(index)}} />
                                        })
                                    :
                                        <tr></tr>
                                }
                            </tbody>
                        </Table>
                        
                        <Container fluid className="d-flex justify-content-center">
                            {renderVisibiliser()}
                        </Container>
                        {
                            loading ? 
                                <div className="d-flex justify-content-center">
                                    <Spinner></Spinner>
                                </div>
                            :
                                ""
                        }
                    </>
                    
                :
                    ""
            }
            
            <Modal show={showEntityDetails != -1} size="lg" onHide={() => {setShowEntityDetails(-1)}}>
                <EntityDetails type={queryCollection} entity={queriedEntities[showEntityDetails]} />
            </Modal>
        </>
    )

}