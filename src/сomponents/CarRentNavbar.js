// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import CarsF from "../pages/CarsF";
import Reservations from "../pages/Reservations";
import NoPage from "../pages/NoPage";
import CarEdit from './CarEdit';
function CarRentNavbar() {
  return (
    <>
      {
          <BrowserRouter  bg="dark" variant="dark">
            <Routes className="me-auto">
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="cars" element={<CarsF />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path='/cars/:id' component={CarEdit}/>
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      /* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/cars">Cars</Nav.Link>
            <Nav.Link href="/reservations">Reservations</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */
      }
    </>
  );
}

export default CarRentNavbar;