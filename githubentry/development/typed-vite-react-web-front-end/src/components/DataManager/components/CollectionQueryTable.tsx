import { Unsubscribe } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, OverlayTrigger, Popover, PopoverBody, PopoverHeader, ProgressBar, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { Check, CheckCircle, CheckLg, PlusLg, XCircle, XLg } from "react-bootstrap-icons";
import { useAuth } from "../../../contexts/AuthContext";
import DataUI from "../../../schema/DataUI";
import { ChangeMerger } from "../../../schema/mergeManager";
import { loadCollectionSnapshot, addDocument, updateDocument } from "../../../services/firestore/firestore";
import ModalWrapper from "../../Wrappers/ModalWrapper";
import TableHeadComponent from "./TableHeadComponent";
import { buildFromChanges, getProperties, getProperty, IProperty } from "../../../schema/interpreter";
import { useElementOnScreen } from "./visibiliser";
import CollapseWrapper from "../../Wrappers/CollapseWrapper";

export default function CollectionQueryTableComponent(props: 
    {
        settings: {
            allowLoadMore?: boolean,
            limit?: number,
            showActionbar?: boolean,
            defaultTableSettings?: any
            queryConstructor?: any,
            onSelectEntity?: Function,
        },
        collection: string;
        active: boolean;
    }) {

        const [ testData, setTestData ] = useState<any>(null)

        const settings = Object.assign({
            limit: 10,
            allowLoadMore: true,
            showActionbar: true,
        }, props.settings);

        const { currentUser, currentUserCustomClaims } = useAuth();

        var collectionProperty: IProperty | undefined = getProperty("db/"+props.collection);
        var docProperty: IProperty | undefined = getProperty("db/"+props.collection+"/**");
        var docProperties: IProperty[] | undefined = getProperties("db/"+props.collection+"/**", currentUserCustomClaims?.access_level);

        const [ loading, setLoading ] = useState(false);
        const [ uploading, setUploading ] = useState(false);
        const [ queryId, setQueryId ] = useState(0);

        const [ sortDirection, setSortDirection ] = useState<"asc" | "desc">("asc");
        const [ queryConstraint, setQueryConstraint ] = useState<any>(undefined);
        
        const [ tableHeadKeys, setTableHeadKeys ] = useState(docProperties?.slice(0,5));
        const [ selectedTableColumn, setSelectedTableColumn ] = useState(0);

        const [ queriedEntities, setQueriedEntities ] = useState<Array<any>>([]);
        const [ lastDocument, setLastDocument ] = useState(null);
        const [ unsubscribeFunctions, setUnsubscribeFunctions ] = useState<Array<Unsubscribe>>([]);
        const queriedEntitiesRef = useRef<Array<any>>();
        queriedEntitiesRef.current = queriedEntities;

        const [ showDetails, setShowDetails ] = useState(false);
        const [ selectedEntity, setSelectedEntity ] = useState<any>(null);

        const [containerRef, isVisible] = useElementOnScreen({root: null, rootMargin: "0px", threshold: 1.0});

        const [ toastController, setToastController ] = useState<any>({show: false});

        useEffect(() => {
            // collectionProperty = getProperty("db/"+props.collection);
            // docProperty = getProperty("db/"+props.collection+"/**");
            docProperties = getProperties("db/"+props.collection+"/**", currentUserCustomClaims?.access_level);
            setTableHeadKeys(docProperties?.slice(0,5));
        }, [currentUserCustomClaims])

        useEffect(() => {
            reset();
            if (queryConstraint) {
                loadEntities(true);
            }
        }, [queryId])

        useEffect(() => {
            if (isVisible && queryConstraint) {
                loadEntities();
            }
        }, [isVisible])

        useEffect(() => {
            if (selectedEntity) {
                var entity = queriedEntities.find((e: any) => e.path == selectedEntity.path)
                if (entity) {
                    setSelectedEntity(entity)
                }
            }
        }, [queriedEntities])

        useEffect(() => {
            if (queryConstraint) {
                setQueryId(queryId+1);
            }
        }, [queryConstraint])


        const addTableColumn = (key: string) => {
            setTableHeadKeys((prev: any) => [...prev, {key: key}])
        }

        const loadEntities = (forceReset?: boolean) => {
            if (!props.active) {
                return;
            }
            console.log("Log: LoadEntities")
            var instruction = docProperties?.find((f: any) => f.key == (tableHeadKeys ? tableHeadKeys[selectedTableColumn].key : null));
            if (instruction) {
                setLoading(true);
                const options = [
                    {type: "limit", value: 10},
                    {type: "orderBy", operator: sortDirection, key: tableHeadKeys ? tableHeadKeys[selectedTableColumn].key : ""},
                ];
                var unsubscribe = loadCollectionSnapshot({path: props.collection, options: [...options, queryConstraint], callback: update, queryId: queryId, lastDocument: forceReset ? null : lastDocument});
                setUnsubscribeFunctions([...unsubscribeFunctions, unsubscribe]);
            }
        }

        // const getWhereOptions = () => {
        //     var options = [];
        //     switch (searchQueryOptions.type) {
        //         case "string":
        //             return [{type: "where", operator: searchQueryOptions?.operator, key: searchQueryOptions?.field, value: searchQueryOptions?.value}];
            
        //         default:
        //             return [];
        //     }
        // }

        const update = (snapshots: any, id: number) => {
            setLoading(false)
            console.log("Log: Recieved Update("+id+")", props.collection, snapshots)
            if (queryId == id) {
                if (snapshots.empty) {
                    // setReachedEndOfQuery(true);
                    return;
                }

                var qec = [...queriedEntitiesRef.current as Array<any>];
                var lastNewDocument: any = null;
        
                snapshots.docChanges().forEach((change:any) => {
                    var data = change.doc.data();
                    var i = qec.findIndex((entity: any) => entity.data.id === data.id);
                    if (i != -1) {
                        qec[i] = {data: data, changes: [], path: 'db/'+props.collection+'/'+data.id};
                        if (i == queriedEntities.length-1) {
                            lastNewDocument = change.doc;
                        }
                    } else {
                        qec.push({data: data, changes: [], path: 'db/'+props.collection+'/'+data.id});
                        lastNewDocument = change.doc;
                    }
                });
        
                setQueriedEntities(qec);
                if (lastNewDocument) {
                    setLastDocument(lastNewDocument);
                }
                if (snapshots.size < settings.limit) {
                    // setReachedEndOfQuery(true);
                }
            }
        }

        const reset = () => {
            setQueriedEntities([]);
            setLastDocument(null);
            unsubscribeFunctions.forEach((unsub: Unsubscribe) => {unsub()})
            setUnsubscribeFunctions([]);
        }


        const upload = (form: any) => {
            uploadUpdate(form);
        }
        const uploadUpdate = (update: any) => {
            update.last_update = new Date();
            updateDocument(`${props.collection}/${selectedEntity.data.id}`, update).then(() => {
                console.log("gut");
                setUploading(false);
                setShowDetails(false);
                setToastController({
                    show: true,
                    header: "Erfolgreich",
                    body: "Die Änderungen wurden erfolgreich gespeichert.",
                    type: "success"
                });
            }).catch((e: any) => {
                console.log(e);
                setUploading(false);
                setShowDetails(false);
                setToastController({
                    show: true,
                    header: "Fehler",
                    body: "Die Änderungen konnten nicht gespeichert werden.",
                    type: "danger"
                });
            });
            setUploading(true);
        }

        const addCategoryPopover = (
            <Popover>
              <PopoverHeader as="h3">Weitere Kategorien</PopoverHeader>
              <PopoverBody>
                <ul style={{listStyleType: "none"}}>
                    {
                        docProperties?.map((cp: any) => {
                            const instruction = docProperties?.find((f: any) => f.key == cp.key);
                            return instruction && !tableHeadKeys?.find((thk: any) => thk.key == cp.key) ? 
                                <li style={{cursor: "pointer"}} onClick={() => {
                                    addTableColumn(cp.key);
                                }} key={instruction.key}>{instruction.display}</li>
                            :
                                ""
                        })
                    }        
                </ul>
              </PopoverBody>
            </Popover>
        )

        // const renderActionColumn = (entity: any) => {
        //     switch (props.collection) {
        //         case "users":
        //             return (
        //                 <td>
        //                     {
        //                         entity.phone_number && entity.phone_number != "" ?
        //                                 <Button variant='outline-success' onClick={(e: any) => {
        //                                     e.preventDefault();
        //                                     e.stopPropagation();
        //                                     window.open(`tel:${entity.phone_number}`);
        //                                 }} size="sm"><TelephoneOutbound /></Button>
        //                             :
        //                                 <Button variant='outline-secondary' size="sm"><Chat /></Button>

        //                     }
        //                 </td>
        //             )
        //         case "courses":
        //             return (
        //                 <td>
        //                     <Button variant='outline-success' onClick={(e: any) => {
        //                         e.preventDefault();
        //                         e.stopPropagation();
        //                         console.log("book this course", entity.id)
        //                         ManipulateCourse({action: "book", courseId: entity.id}).then((data:any) => console.log(data)).catch((e:any) => console.error(e));
        //                     }} size="sm"><CartPlus /></Button>
        //                     {(entity.clients.find((entity: any) => entity.id == currentUser?.uid)) ? <Button variant='outline-danger' onClick={(e: any) => {
        //                         e.preventDefault();
        //                         e.stopPropagation();
        //                         console.log("unbook this course", entity.id)
        //                         ManipulateCourse({action: "unbook", courseId: entity.id}).then((data:any) => console.log(data)).catch((e:any) => console.error(e));
        //                     }} size="sm"><CartX /></Button> : null}
        //                 </td>
        //             )

        //         default:
        //             return (<td></td>)
        //     }
        // }

        return (
            <>

                {/* // SEARCH */}
                
                <Row className={"mt-4"}>
                    {
                        tableHeadKeys && selectedTableColumn >= 0 ? 
                            <Col sm={9}>
                                <DataUI data={undefined} path={"db/"+props.collection+"/**/"+tableHeadKeys[selectedTableColumn].key} depth={1} onChange={(data: any) => {
                                    if (data.searchOption) {
                                        setSortDirection(data.searchOption.sortDirection);
                                    } else {
                                        setQueryConstraint(data.constraint);
                                    }
                                }} config={{}} />
                            </Col>
                        :
                            ""
                    }

                    <Col sm={3}>
                        {/* <div className="p-1 justify-content-between align-items-end d-flex">
                            <Button className="w-100 me-2" disabled={loading} onClick={(e: any) => {
                                // var form = CompileForm({isSearch: true, changesOnly: false, formId: `${props.collection}-query`})
                                // loadEntities(form);
                                
                                // get operator, key, value of search field
                                const field = tableHeadKeys ? tableHeadKeys[selectedTableColumn].key : undefined;
                                const operator = "desc";
                                const value = searchValue;
                                if (!field || !operator || !value) return;
                                loadEntities({field: field, operator: operator, value: value});

                            }}>{`(${queriedEntities.length})`} Einträge laden</Button>
                            <Button variant="outline-danger" disabled={loading} onClick={(e: any) => {
                                reset();
                            }}><ArrowRepeat /></Button>

                        </div>
                        <div>
                            <Button onClick={() => {
                                const template = getTemplate(props.collection)?.();
                                template ? setSelectedEntity(template): null;
                                template ? setShowDetails(true): null;
                                template ? setSelectedEntityIsNew(true): null;
                            }} size="sm" className="w-100 m-1" variant="outline-primary">Neu</Button>
                        </div> */}
                        {/* <div className="justify-content-between align-items-end d-flex">
                            {
                                collectionProperty?.actions?.filter((action: any) => action.id == "refresh").map((action: {id: string, render: Function}) => {
                                    return <action.render key={action.id} onClick={() => {
                                        loadEntities();
                                    }}/>
                                })
                            }
                        </div> */}
                        <div className="justify-content-between d-flex">
                            {
                                collectionProperty?.actions?.filter((action: any) => action.id != "refresh").map((action: {id: string, render: Function}) => {
                                    return <action.render key={action.id} onClick={() => {
                                        console.log(action.id)
                                    }}/>
                                })
                            }
                        </div>
                        
                    </Col>

                </Row>

                {/* // TABLE */}
                <div style={{overflow: "scroll"}} className={"mt-2"}>
                    <Table size="sm" hover>
                        <thead>
                            <tr>
                                
                                {
                                    tableHeadKeys ? 
                                        tableHeadKeys.map((element: { key: string }, index: number) => {
                                            const properties = docProperties?.find((f: any) => f.key == element.key);
                                            return properties ?
                                                <th key={element.key} onClick={() => {
                                                    setSelectedTableColumn(index);
                                                }}>
                                                    <TableHeadComponent sortDirection={sortDirection} isSelected={element.key == tableHeadKeys[selectedTableColumn].key} properties={properties} onChange={
                                                            () => {
                                                                sortDirection == "asc" ? setSortDirection("desc") : setSortDirection("asc");
                                                            }
                                                        } />
                                                </th>
                                            :
                                            <th key={element.key}><Alert variant="warning">Laden...</Alert></th>
                                        })
                                    :
                                        <th><Alert variant="warning">Laden...</Alert></th>
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
                                tableHeadKeys ? 
                                    queriedEntities.map((entity: any) => {
                                            return (
                                                <tr key={entity.data.id} onClick={() => {
                                                    if (props.settings.onSelectEntity) {
                                                        props.settings.onSelectEntity(entity);
                                                        return;
                                                    }
                                                    setSelectedEntity(entity)
                                                    setShowDetails(true);
                                                }}>
                                                    {
                                                        tableHeadKeys.map((element: { key: string }, index: number) => {
                                                            return <td key={element.key}>
                                                                <DataUI data={entity.data[element.key]} path={entity.path + "/" + element.key} depth={1} config={{disableLabel: true, disableEditable: true, disableInteraction: true}} onChange={(change: any) => {}} />
                                                            </td>
                                                        })
                                                    }

                                                    {
                                                        docProperty?.actions?.map((action: {id: string, render: Function}) => {
                                                            return (
                                                                <td key={action.id}>
                                                                    <action.render onClick={() => {
                                                                        console.log(action.id)
                                                                    }} phone={entity.data.phone_number} email={entity.data.email}/>
                                                                </td>
                                                            )
                                                        })
                                                    }

                                                </tr>
                                            )
                                        })
                                        :
                                        <tr></tr>
                            }
                        </tbody>
                    </Table>
                    {
                        queriedEntities.length == 0 ? 
                            <Alert variant="info">Keine Einträge</Alert>
                        :
                            ""
                    }
                    <div ref={containerRef}>
                        {
                            loading ? <Spinner animation="border" variant="primary" /> : `${queriedEntities.length} Einträge geladen.`
                        }
                        {
                            queryConstraint ? <span onClick={(e: any) => {if (queryConstraint) {loadEntities()}}} style={{color: "rgb(27, 115, 249)", cursor: "pointer"}}> mehr</span> : null
                        }
                    </div>
                </div>


                {/* INFO Toast */}
                <ToastContainer className="p-3" style={{ position: "fixed", top: "2em", right: "2em", zIndex: 100000 }}>
                    <Toast className={"p-0"} onClose={() => setToastController((p: any) => {
                        const c = {...p};
                        c.show = false;
                        return c;
                    })} show={toastController.show} delay={4000} autohide>
                        <Alert variant={toastController.type} className={"m-0"}>
                            {
                                toastController.type == "danger" ?
                                    <XCircle color={toastController.type}></XCircle>
                                :
                                    <CheckCircle color={toastController.type}></CheckCircle>
                            }
                            {"  "}
                            <b>{toastController.header}: </b>
                            <br />
                            {toastController.body}
                        </Alert>
                    </Toast>
                </ToastContainer>

                {/* // MODAL */}

                <ModalWrapper show={showDetails} onClose={() => {
                    setShowDetails(false);
                }} onSuccess={() => {
                    var form = buildFromChanges(selectedEntity.changes, selectedEntity.path, selectedEntity.data);
                    upload(form);
                }}>
                    {
                        selectedEntity?.data ? 
                            <DataUI data={selectedEntity.data} path={selectedEntity.path} depth={2} config={{}} onChange={(change: any) => {
                                console.log(change);
                                const newData = ChangeMerger({...selectedEntity.data}, selectedEntity.path, change.change, change.path);
                                const newChanges = [...selectedEntity.changes, change.path];
                                const newObj = {
                                    path: selectedEntity.path,
                                    data: newData,
                                    changes: newChanges
                                }
                                
                                const index = queriedEntities.findIndex((e: any) => e.path == selectedEntity.path);
                                if (index >= 0) {
                                    const newQueriedEntities = [...queriedEntitiesRef.current as Array<any>];
                                    newQueriedEntities[index] = newObj;
                                    setQueriedEntities(newQueriedEntities);
                                }
                                
                                
                            }} />
                        :
                            "Keine Daten gefunden"
                    }
                    {
                        <CollapseWrapper show={uploading} dimension={"height"}>
                            <Container fluid><b><ProgressBar variant="primary" className={"w-100"} label={"Upload"} animated now={100} /></b></Container>
                        </CollapseWrapper>
                    }
                </ModalWrapper>

            </>

        )
}

