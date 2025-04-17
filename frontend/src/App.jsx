import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DoctorPage from './DoctorComponents/DoctorPage'
import DoctorAddlist from './DoctorComponents/DoctorAddlist'
import Doctorupdateform from './DoctorComponents/Doctorupdateform'
import Home from './Components/Home'
import Booking from './Booking'

function App() {

  return (
    <>

    <Router>
      <Routes>


        <Route path="/" element={ < Home /> } />


        <Route path="/doctor-page" element={ < DoctorPage /> } />
        <Route path="/doctor-page/add-list" element={ < DoctorAddlist /> } />
        <Route path="/doctor-page/update-form" element={ < Doctorupdateform /> } />

        
        <Route path="/booking-page" element={ < Booking />  } />

              
        
      </Routes>
    </Router>
    </>
  )
}

export default App


