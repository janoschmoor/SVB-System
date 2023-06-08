import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserPreviewComponent(props: {openAuth: Function}) {
    
    const { currentUser, currentUserData } = useAuth();
  
    return (
        currentUser ?
            <div className="d-flex align-items-center" onClick={() => {props.openAuth()}}>
                <img src={currentUser.photoURL ? currentUser.photoURL : undefined}></img>
                <>
                    {currentUserData ? `${currentUserData?.first_name} ${currentUserData?.last_name}`: "Laden..."}
                </>
            </div>
        :
            <>
                <Button variant='outline-secondary' onClick={() => {
                    props.openAuth();
                }}>
                    Login
                </Button>
            </>
    )
}
