import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../DoctorContext'; 

const List = () => {

  const navigate = useNavigate();
  const { data } = useData();  // use context to get it from parent components

  useEffect(() => {
    try {
      console.log("Fetched hospital data from context:", data);

      if (!Array.isArray(data)) {
        throw new Error("Expected 'data' to be an array, but got: " + typeof data);
      }
    } catch (error) {
      console.error("Error in useEffect (hospital data load):", error);
    }
  }, [data]);  // re-run effect when data changes


  return (

    <div id='list' className='container-fluid px-3'>

      <div className='d-flex align-items-center justify-content-center mt-5'>
        <h1 className='heading text-danger fw-bold'>LIST OF HOSPITALS</h1>
      </div>

      <hr className="mx-auto border-danger"></hr>

      <div className='d-flex justify-content-center mt-5'>
        <div className='hospital-table-wrapper table-responsive'>
        <table  className='hospital-table table table-bordered  table-hover align-middle text-center'>
          <thead>
            <tr>
              <th className='border border-2 border-dark p-2 text-center'>NO</th>
              <th className='border border-2 border-dark p-2 text-center'>HOSPITAL NAME</th>
              <th className='border border-2 border-dark p-2 text-center'>DOCTOR</th>
              <th className='border border-2 border-dark p-2 text-center'>SPECIALIST</th>
              <th className='border border-2 border-dark p-2 text-center'>LOCATION</th>
              <th className='border border-2 border-dark p-2 text-center'>DATE</th>
              <th className='border border-2 border-dark p-2 text-center'>OPEN TIME</th>
              <th className='border border-2 border-dark p-2 text-center'>CLOSE TIME</th>
              <th className='border border-2 border-dark p-2 text-center'>NO OF TOKEN AVAILABLE</th>
              <th className='border border-2 border-dark p-2 text-center'>SLOT AVAILABLE</th>
              <th className='border border-2 border-dark p-2 text-center'>MAKE APPOINMENT</th>
            </tr>
          </thead>

          <tbody>
          {Array.isArray(data) && data.length > 0 ? 
          (data.map((user, index) => (
          <tr key={index}>
          <td className='border border-2 border-dark p-2 text-center'>{index + 1}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.hospitalName}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.doctorName}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.speciallist}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.location}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.date}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.fromTime}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.toTime}</td>
          <td className='border border-2 border-dark p-2 text-center'>{user.token}</td>
          <td className='border border-2 border-dark p-2 text-center'>
            {Array.isArray(user.slot) ? user.slot.join(', ') : 'No slots available'}
          </td>
          <td className='border border-2 border-dark p-2 text-center'>
            <button type='button' className='btn btn-outline-success' onClick={() => navigate("/booking-page")}>Book</button>
          </td>
          </tr>
          ))
          ) : (
          <tr>
            <td colSpan="11" className="text-center text-danger fs-3">No Data Found</td>
          </tr>
          )}
            
          </tbody>
        </table>
        </div>
      </div>
      
    </div>
  )
}

export default List
