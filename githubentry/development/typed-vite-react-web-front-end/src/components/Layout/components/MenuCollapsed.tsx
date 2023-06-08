import { Button, Card, Collapse, ListGroup, ListGroupItem } from "react-bootstrap";
import { House, Journal, Person, PersonFillGear, SinaWeibo, Speedometer2 } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function MenuCollapsed() {

    const navigate = useNavigate();
    const location = useLocation();

  return (

    <Card className="mt-3 p-0" body>

        <div style={{minWidth: "200px"}} className="d-flex flex-column">

            <Button onClick={() => {navigate("/home")}} className="mb-1" variant={location.pathname == "/home" ? "primary" : "dark"}>
                Home
            </Button>
            <Button onClick={() => {navigate("/admin")}} className="mb-1" variant={location.pathname == "/admin" ? "primary" : "dark"}>
                Admin
            </Button>
            <Button onClick={() => {navigate("/admin/data-manager")}} className="mb-1" variant={location.pathname == "/admin/data-manager" ? "primary" : "dark"}>
                Datamanager
            </Button>
            
        </div>

    </Card>
  )
}
