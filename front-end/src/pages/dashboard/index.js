import React from "react";
import { Container, Table } from "react-bootstrap";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <SNavbar />

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
