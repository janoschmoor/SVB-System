import { useRouteError } from "react-router-dom";
import LayoutComponent from "../../components/Layout";
import Container from "react-bootstrap/Container";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <LayoutComponent>
      <Container fluid>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>

      </Container>
    </LayoutComponent>
  );
}