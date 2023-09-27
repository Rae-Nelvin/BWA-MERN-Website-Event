import React from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace={true} />;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Semina</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Categories</Nav.Link>
            <Nav.Link href="#pricing">Talents</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <SBreadcrumb />
        <SButton>Tambah</SButton>

        <Table className="mt-3" striped bordered hover variant="dark">
          <thead></thead>
          <tbody></tbody>
        </Table>
      </Container>
    </>
  );
}
