import React, { useState, useEffect, Component } from "react";
import { Button, ButtonGroup, Container, Table, Form, FormGroup, InputGroup, FormLabel } from 'react-bootstrap';

function Reservations() {
    const [reservations,setReservations] = useState([]);
    const [editReservation,setEditReservation] = useState({    
    "reservationId": 0,
    "model": "",
    "number": "",
    "price": 0,
    "isAvaliable": true,
    "fuel": "",
    "reservations": []});
    const [showEdit, setShowEdit] = useState(false);
    const onEditClick = () => setShowEdit(true);

    const  remove = async (id) =>{
        console.log(id);
        await fetch(`https://localhost:7299/api/Reservations/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedReservations = reservations.filter(i => i.reservationId !== id);
            setReservations(updatedReservations);
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
    }
    const handleSave = (event) => {
        event.preventDefault();
        const reservationToSave = editReservation;
        reservationToSave.reservationId=0;
        setEditReservation(reservationToSave);
        console.log(editReservation);
        console.log(JSON.stringify(editReservation).replace("null","[]"));
         fetch('https://localhost:7299/api/Reservations', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReservation).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
        setEditReservation({
        "reservationId": 0,
        "carId": 0,
        "customerName": "",
        "customerSurname": "",
        "takeDate": "",
        "returnDate": "",
        "reservationStatus": ""});
        fetchData().catch(console.error);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(editReservation);
        console.log(JSON.stringify(editReservation).replace("null","[]"));
         fetch('https://localhost:7299/api/Reservations/' + editReservation.reservationId, {
            method:  'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReservation).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
        setEditReservation({
            "reservationId": 0,
            "carId": 0,
            "customerName": "",
            "customerSurname": "",
            "takeDate": "",
            "returnDate": "",
            "reservationStatus": ""});
        fetchData().catch(console.error);
    }
    const handleCarIdInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            carId: event.target.value,
        }));
    };
    const handleCustomerNameInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            customerName: event.target.value,
        }));
    };
    const handleCustomerSurnameInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            customerSurname: event.target.value,
        }));
    };
    const handleTakeDateInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            takeDate: event.target.value,
        }));
    };
    const handleReturnDateInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            returnDate: event.target.value,
        }));
    };
    const handleReservationStatusInputChange = (event) => {
        event.persist();
        setEditReservation((values) => ({
            ...values,
            reservationStatus: event.target.value,
        }));
    };
    const fetchData = async()=>
    {
        const response = await fetch('https://localhost:7299/api/Reservations');
        const body = await response.json();
        console.log("body");
        console.log(body);
        console.log("reservations");
        console.log(reservations);
        setReservations([...body]);
        console.log("data fetched");
    }
     useEffect(()=>{

        fetchData().catch(console.error);
    },[])
      
      return (
          <div className="App">
            <header className="App-header">
                <div >
                    {editReservation.reservationId===0?<h3>New reservation</h3>:<h3>Editing reservation #{editReservation.reservationId}</h3>}
                    <Container>
                        <form onSubmit={handleSubmit} >
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="carId">Car Id</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" name="carId" id="model" value={editReservation.carId || '0'}
                                    autoComplete="0" onChange={handleCarIdInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="customerName">Name</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="customerName" id="customerName" value={editReservation.customerName || ''}
                                     autoComplete="Name" onChange={handleCustomerNameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="customerSurname">Surname</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="customerSurname" id="customerSurname" value={editReservation.customerSurname || ''}
                                     autoComplete="Surname" onChange={handleCustomerSurnameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="takeDate">Take Date</label>
                                <div class="col-sm-10">
                                <input type="datetime-local" class="form-control" name="takeDate" id="takeDate"  checked={editReservation.takeDate||""}
                                    onChange={handleTakeDateInputChange}/>
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="takeDate">Return Date</label>
                                <div class="col-sm-10">
                                <input type="datetime-local" class="form-control" name="returnDate" id="returnDate"  checked={editReservation.returnDate||""}
                                    onChange={handleReturnDateInputChange}/>
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="reservationStatus">Reservation status</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="reservationStatus" id="reservationStatus" value={editReservation.reservationStatus || ''}
                                     autoComplete="reservationStatus" onChange={handleReservationStatusInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                            {editReservation.reservationId!==0?<div><Button variant="warning" type="submit">Edit</Button>{' '}
                            <Button variant="primary" onClick={handleSave} type="submit">Save as new</Button>{' '}</div>:
                            <div> <Button color="primary" onClick={handleSave} type="submit">Save</Button>{' '}</div>}
                           
                                {/* <Link to={"/cars"}><Button color="secondary" >Cancel</Button></Link> */}
                            </div>
                        </form>
                    </Container>
                </div>
              <h3>Reservations</h3>
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Car id</th>
                    <th>Customer name</th>
                    <th>Customer surname</th>
                    <th>Take date</th>
                    <th>Return date</th>
                    <th>Reservation status</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation =>
                        <tr key={reservation.reservationId}>
                            <td>{reservation.reservationId} </td>
                            <td>{reservation.carId} </td>
                            <td>{reservation.customerName} </td>
                            <td>{reservation.customerSurname} </td>
                            <td>{reservation.takeDate} </td>
                            <td>{reservation.returnDate} </td>
                            <td>{reservation.reservationStatus} </td>
                            <td>
                            {/* <Link className="edit-link" 
                                to={"/cars/" + reservation.reservationId}>
                                  <button type="button" className="btn btn-warning">
                                        Edit
                                    </button>
                                </Link> */}
                                <Button size="sm" variant="warning" onClick={() => {
                                    setEditReservation(reservation);
                                    console.log("reservation");
                                    console.log(reservation);
                                    console.log("editReservation");
                                    console.log(editReservation);
                                    }}>Edit</Button>
                            </td>
                            <td>
                                <ButtonGroup>
                                    {/* <Button size="sm" color="primary" tag={Link} to={"/cars/" + reservation.reservationId}>Edit</Button> */}
                                    <Button size="sm" variant="danger" onClick={() => remove(reservation.reservationId)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )}
                </tbody>
              </Table>
            </header>
          </div>
      );
}

export default Reservations;