import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, InputGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarEdit from "../сomponents/CarEdit";
function CarsF(params){
    const [cars,setCars] = useState([]);
    const [editCar,setEditCar] = useState({    
    "carId": 0,
    "model": "",
    "number": "",
    "price": 0,
    "isAvaliable": true,
    "fuel": "",
    "reservations": []});
    useEffect(()=>{
        fetchData().catch(console.error);
    },[]);
    const  remove = async (id) =>{
        console.log(id);
        await fetch(`https://localhost:7299/api/Cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }}).then(() => {
            let updatedCars = cars.filter(i => i.carId !== id);
            setCars(updatedCars);
        });
    }
    const handleSave = (event) => {
        event.preventDefault();
        const carToSave = editCar;
        carToSave.carId=0;
        setEditCar(carToSave);
        console.log(editCar);
        console.log(JSON.stringify(editCar).replace("null","[]"));
         fetch('https://localhost:7299/api/Cars', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCar).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
        setEditCar({
        "carId": 0,
        "model": "",
        "number": "",
        "price": 0,
        "isAvaliable": true,
        "fuel": "",
        "reservations": []});
        
        fetchData().catch(console.error);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(editCar);
        console.log(JSON.stringify(editCar).replace("null","[]"));
         fetch('https://localhost:7299/api/Cars/' + editCar.carId, {
            method:  'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCar).replace("null","[]"),
        }).then((response)=>{
        if(Math.floor(response.status/100)===2){
            alert('succesfull');
         }});
        setEditCar({
        "carId": 0,
        "model": "",
        "number": "",
        "price": 0,
        "isAvaliable": true,
        "fuel": "",
        "reservations": []});
        fetchData().catch(console.error);
    }
    const handleModelInputChange = (event) => {
        event.persist();
        setEditCar((values) => ({
            ...values,
            model: event.target.value,
        }));
    };
    const handleNumberInputChange = (event) => {
        event.persist();
        setEditCar((values) => ({
            ...values,
            number: event.target.value,
        }));
    };
    const handlePriceInputChange = (event) => {
        event.persist();
        setEditCar((values) => ({
            ...values,
            price: event.target.value,
        }));
    };
    const handleIsAvailableInputChange = (event) => {
        event.persist();
        setEditCar((values) => ({
            ...values,
            isAvaliable: event.target.checked,
        }));
    };
    const handleFuelInputChange = (event) => {
        event.persist();
        setEditCar((values) => ({
            ...values,
            fuel: event.target.value,
        }));
    };
    async function fetchData()
    {
        const response = await fetch('https://localhost:7299/api/Cars');
        const body = await response.json();
        console.log("body");
        console.log(body);
        console.log("cars");
        console.log(cars);
        let updatedCars = body.filter(i => i !== null);
        setCars(updatedCars);
       // setCars([...body]);
        
      //  setCars(body);
        console.log("data fetched");
    }

      
      return (
          <div className="App">
            <header className="App-header">
                <div >
                    {editCar.carId===0?<h3>New car</h3>:<h3>Editing car #{editCar.carId}</h3>}
                    <Container>
                        <form onSubmit={handleSubmit} >
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="model">Model</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="model" id="model" value={editCar.model || ''}
                                    autoComplete="model" onChange={handleModelInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="number">Number</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="number" id="number" value={editCar.number || ''}
                                     autoComplete="number" onChange={handleNumberInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="price">Price</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" name="price" id="price" value={editCar.price || '' } 
                                    onChange={handlePriceInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="isAvaliable">Is avaliable</label>
                                <div class="col-sm-10">
                                <input type="checkbox" class="form-check-input" name="isAvaliable" id="isAvaliable"  checked={editCar.isAvaliable||false}
                                    onChange={handleIsAvailableInputChange}/>
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="fuel">Fuel</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="fuel" id="fuel" value={editCar.fuel || ''}
                                        autoComplete="fuel" onChange={handleFuelInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                            {editCar.carId!=0?<div><Button variant="warning" type="submit">Edit</Button>{' '}
                            <Button variant="primary" onClick={handleSave} type="submit">Save as new</Button>{' '}</div>:
                            <div> <Button color="primary" onClick={handleSave} type="submit">Save</Button>{' '}</div>}
                           
                                {/* <Link to={"/cars"}><Button color="secondary" >Cancel</Button></Link> */}
                            </div>
                        </form>
                    </Container>
                </div>
              <h3>Cars</h3>
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Model</th>
                    <th>Number</th>
                    <th>Price</th>
                    <th>Is avaliable</th>
                    <th>Fuel</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car.carId}>
                            <td>{car.carId} </td>
                            <td>{car.model} </td>
                            <td>{car.number} </td>
                            <td>{car.price} </td>
                            <td>{car.isAvaliable?'true':'false'} </td>
                            <td>{car.fuel} </td>
                            <td>
                            {/* <Link className="edit-link" 
                                to={"/cars/" + car.carId}>
                                  <button type="button" className="btn btn-warning">
                                        Edit
                                    </button>
                                </Link> */}
                                <Button size="sm" variant="warning" onClick={() => {
                                    setEditCar(car);
                                    console.log("car");
                                    console.log(car);
                                    console.log("editCar");
                                    console.log(editCar);
                                    }}>Edit</Button>
                            </td>
                            <td>
                                <ButtonGroup>
                                    {/* <Button size="sm" color="primary" tag={Link} to={"/cars/" + car.carId}>Edit</Button> */}
                                    <Button size="sm" variant="danger" onClick={() => remove(car.carId)}>Delete</Button>
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

export default CarsF;