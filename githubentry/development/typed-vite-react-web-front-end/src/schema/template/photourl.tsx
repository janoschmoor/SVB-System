import { useEffect, useState } from "react";
import { Alert, Button, FormControl, FormGroup, FormLabel, FormText, Image as Img, InputGroup, ProgressBar } from "react-bootstrap";
import { ArrowRight, Pen } from "react-bootstrap-icons";
import { Form } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function PhotoURLTemplate(props: 
    {
        data: string | undefined,
        path: string | undefined,
        depth: number,
        schema: any,
        onChange: (data: any) => void,
        config: {
            disableLabel?: boolean,
            disableEditable?: boolean,
            editMode?: boolean,
        },
    }
) {
    // CONSTANTS
    const searchOptions = [
        {operator: ".", display: "enthält"}
    ];
    const defaultData = "";

    // STATES
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [downloadURL, setDownloadURL] = useState<string>("");


    // FUNCTIONS
    const parseToDisplay = (input: string): string => {
        return input;
    }
    const parseFromDisplay = (input: string): string => {
        return input;
    }
    const validate = () => {
        if (isValid()) {
            setInputIsValid(true);
        } else {
            setInputIsValid(false);
        }
    }
    const isValid = () => {
        const valid = (typeof localData === "string" && ((localData.length > 0) || (props.schema.optional == true) || (props.data == undefined)))
        return valid;
    }
    const tryEndEditMode = () => {
        if (editMode) {
            if (inputIsValid) {
                startPropagation();
                setEditMode(false);
            }
        }
    }
    const tryEnterEditMode = () => {
        if (!editMode) {
            if (!props.schema.disableChange && allowEdit() && !props.config.disableEditable) {
                setEditMode(true);
            }
        }
    }
    const allowView = () => {
        if (props.schema.minViewLevel > 0) {
            if (!currentUserCustomClaims) { return false; }
            return currentUserCustomClaims.access_level >= props.schema.minViewLevel;
        } else {
            return true;
        }
    }
    const allowEdit = () => {
        if (props.schema.minEditLevel > 0) {
            if (!currentUserCustomClaims) { return false; }
            return currentUserCustomClaims.access_level >= props.schema.minEditLevel;
        } else {
            return true;
        }
    }
    const startPropagation = () => {
        if (inputIsValid && (hasChanges || props.data == undefined)) {
            if (typeof props.data == "undefined") {
                props.onChange({constraint: {
                    type: "text",
                    value: parseFromDisplay(localData),
                    key: props.schema.key,
                }});
            } else {
                props.onChange({change: parseFromDisplay(localData), path: props.path});
            }
        }
    }
    const onChange = (value: string) => {
        setLocalData(value);
    }
    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    }


    const handleFileUpload = async () => {
        if (selectedFile) {
            const fileRef = ref(storage, "profile/" + props.path?.split("/")[2]);

            // Create an HTML image element
            const img = new Image();

            // Set the source of the image to the selected file
            img.src = URL.createObjectURL(selectedFile);

            // Wait for the image to load
            await new Promise((resolve) => {
            img.onload = resolve;
            });

            // Create a canvas element
            const canvas = document.createElement("canvas");

            // Set the canvas dimensions to the desired size
            const width = 512;
            const height = (img.height / img.width) * width;
            canvas.width = width;
            canvas.height = height;

            // Draw the image onto the canvas
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            // Convert the canvas to a Blob
            canvas.toBlob(async (blob) => {
                if (!blob) { return; }
                // Upload the resized image to Firebase Storage and update setUploadProgress state
                const uploadTask = uploadBytesResumable(fileRef, blob);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => console.log(error),
                    () => {
                        setUploadProgress(0)
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            props.onChange({ change: downloadURL, path: props.path });
                        }
                    )}
                )

                
                
                // await uploadBytesResumable(fileRef, blob).on(
                //     "state_changed",
                //     (snapshot) => {
                //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //         setUploadProgress(progress);
                //     },
                //     (error) => console.log(error),
                //     () => setUploadProgress(0)
                // )


                // // Get the download URL for the resized image
                // const downloadURL = await getDownloadURL(fileRef);

                // // Update the data with the resized image URL
                // props.onChange({ change: downloadURL, path: props.path });
            }, "image/jpeg", 0.9);
        }
    };


    // RENDER HELPER FUNCTIONS
    const getLabel = () => {
        if (props.config.disableLabel && !editMode) {
            return "";
        } else {
            return (
                !props.schema.isGeneric ? 
                    <>{hasChanges && props.data != undefined ?
                        <Pen /> 
                    :
                        null}
                    {" "}<b>{props.schema.display}: </b></>
                :
                    <>{hasChanges && props.data != undefined ?
                        <Pen />
                    :
                        null}
                    {" "}<b>{props.schema.key.split("/")[props.schema.key.split("/").length-1]}: </b></>

            );
        }
    }

    // STATE
    const { currentUserCustomClaims } = useAuth();

    const [ localData, setLocalData ] = useState(props.data === undefined ? defaultData : parseToDisplay(props.data));
    const [ initialData, setInitialData ] = useState(localData);
    const [ inputIsValid, setInputIsValid ] = useState(false);
    const [ hasChanges, setHasChanges ] = useState(false);
    const [ editMode, setEditMode ] = useState(!!props.config.editMode);

    const [ searchOption, setSearchOption ] = useState(0);

    // EFFECTS
    useEffect(() => {
        validate();
        localData != initialData ? setHasChanges(true) : setHasChanges(false);
    }, [localData]);
    useEffect(() => {
        setLocalData(props.data === undefined ? defaultData : parseToDisplay(props.data));
        setInitialData(props.data === undefined ? defaultData : parseToDisplay(props.data));
        setHasChanges(false);
    }, [props.data])



    // RENDER

    // SEARCH
    if (props.data === undefined) {
        return (
            <div>
                <Form noValidate onSubmit={(e) => {e.preventDefault(); startPropagation()}}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Text>{getLabel()}</InputGroup.Text>
                            <InputGroup.Text style={{cursor: "pointer"}} onClick={() => {
                                setSearchOption((searchOption+1) % searchOptions.length)
                            }}>{searchOptions[searchOption].display}</InputGroup.Text>
                            <FormControl
                                type="text"
                                defaultValue={localData}
                                onChange={(e) => onChange(e.target.value)}
                                isValid={inputIsValid && hasChanges}
                                isInvalid={!inputIsValid && hasChanges}
                                />
                            {
                                <Button disabled={!inputIsValid} onClick={() => {startPropagation()}} variant={"primary"}>
                                    Suchen
                                </Button>
                            }                            
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    if (!allowView()) {
        return (<Alert variant="danger">Error: Permission denied</Alert>)
    }

    // EDIT
    if (editMode) {
        return (
            <FormGroup>
                {!props.config.disableLabel && <FormLabel>{getLabel()}</FormLabel>}
                <InputGroup>
                    <img onClick={() => {tryEnterEditMode()}} style={{width: "100%", height: "auto", borderRadius: "2em"}} src={localData}></img>
                    {uploadProgress > 0 && <ProgressBar now={uploadProgress} label={`${uploadProgress.toFixed(0)}%`} />}
                    <InputGroup className="w-100">
                        <FormControl type="file" id="photo-upload" onChange={handleFileSelection} accept="image/*" />
                        <Button variant="primary" onClick={handleFileUpload} disabled={!selectedFile}>Upload</Button>
                    </InputGroup>
                </InputGroup>
            </FormGroup>
        );
    }

    // VIEW

    if (localData === "") {
        return <p onClick={() =>{tryEnterEditMode()}}>Kein Bild vorhanden</p>
    }

    return (
        // <img style={{width: "100px", height: "100px", borderRadius: "10%"}} src={localData}></img>
        // display the image but set the size to a small profile picture style image with rounded corners and maintain the aspect ratio
        
        <img onClick={() => {tryEnterEditMode()}} style={{width: "100%", height: "auto", borderRadius: "2em"}} src={localData}></img>
        

    );
    
}