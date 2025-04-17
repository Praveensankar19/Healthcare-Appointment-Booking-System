import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import List from './List';
import Search from './Search';
import  '/src/Home.css';
import About from './About';
import DoctorContext from '../DoctorContext';


// This will be main page & parent component 

const Home = () => {

  const navigate = useNavigate()
  const [data,setData] = useState([]) // state to store the fetched data from api
  
  useEffect(() => {
      
    const fetchData = async () => {

      try {
          const response = await axios.get('http://localhost:8000/api/hospitals'); //fetching data from backend
          setData(response.data);
      } catch (error) {
          console.error("Error fetching data from MongoDB:", error);
      }
    };
    fetchData();

  }, []);

  
  return (

    <DoctorContext.Provider value={{ data, setData }}>
    <div>
      
      <header className="fixed-top bg-light shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
          <div className="container-fluid px-4 py-2">

            {/* Logo / Brand */}
            <a className="navbar-brand fw-bold text-primary" href="#">HealthCare</a>

            {/* Toggle Button for Mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav ms-auto mb-2 d-flex align-items-center gap-3">
                <li className="nav-item">
                  <a className="nav-link" href="#container">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#list">List</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#search">Search</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal" > Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-success">Sign Up</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Bootstrap Login Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Select Login Type</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>Choose your login type to continue.</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary" onClick={() => navigate("/patient-page")} data-bs-dismiss="modal">
                  Patient Login
                </button>
                <button className="btn btn-danger" onClick={() => navigate("/doctor-page")} data-bs-dismiss="modal">
                  Doctor Login
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

  {/* ---------------------------------------------------------------------------------------- */}

  <div id="container">

    <div className="row align-items-center text-center text-md-start">

      <div className="col-md-7">
        <h1 className="fw-bold display-5 m-0">
        Book Your Hospital Appointments 
        <span className="text-primary"> Easily and Quickly</span> !!!
        </h1>
      </div>


      <div className="col-md-5 text-center mt-2">
        <img
        src="booking-1.png"
        alt="Hospital Booking"
        className="img-fluid w-50"
        />
      </div>
    </div>
      

    {/* ----------------------- */}

    < List />

    {/* ------------------------ */}

    < Search />

    {/* ----------------------- */}
      
    < About />


  </div>

    
  <footer className='d-flex align-items-center justify-content-center bg-light '>
    <h4 className="text-center">© 2025 HealthcareBooking. All Rights Reserved.</h4>
  </footer>  

  </div>

  </DoctorContext.Provider>
  )
}

export default Home
