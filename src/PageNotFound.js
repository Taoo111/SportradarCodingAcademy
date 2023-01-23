import Container from "react-bootstrap/Container";

export default function PageNotFound(params) {
  return (
    <Container style={{width:'100%', marginTop: "200px"}} className="mx-auto text-center">
      <h1 className="display-5">404 - Page Not Found</h1>
      <p className="lead ">
        Sorry, the page doesn't exist.
      </p>
    </Container>
  );
}
