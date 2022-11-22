import logo from './logo.svg';
import './App.css';
import CarRentNavbar from './сomponents/CarRentNavbar.js';
import CarEdit       from './сomponents/CarEdit.js';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Home from "./pages/Home";
import Cars from "./pages/Cars";
// import Reservations from "../pages/Reservations";
// import NoPage from "../pages/NoPage";

function App() {
  return (
    <div className="App">
        {/* <Router>
          <Routes >
            <Route path='/' exact={true} element={<Home/>}/>
            <Route path='/cars' exact={true} element={<Cars/>}/>
            <Route path='/cars/:id' element={<CarEdit/>}/>
          </Routes >
        </Router> */}
      <CarRentNavbar/>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload thisis.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
