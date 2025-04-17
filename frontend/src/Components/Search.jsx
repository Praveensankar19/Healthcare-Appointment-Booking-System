import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useData } from '../DoctorContext'; 


const Search = () => {

  const navigate = useNavigate()
  
  const { data } = useData();  // use context to get it from parent components
  const [filterdata, setfilterdata] = useState([]) // store filtered data for show table

  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [search, setSearch] = useState('') // handle search input 

  const [selectedDate, setSelectedDate] = useState(""); // handle date input 
  const currendate = new Date().toISOString().split("T")[0];

  const [selectedLocation, setSelectedLocation] = useState(""); // handle location input 
  const locations = ["Chennai", "Bengalure", "Coimbatore", "Pondichery", "Cuddalore", "Salem", 
  "Madurai", "Villupuram", "Kanchipuram", "Vellor", "Kumbakonam"]; 
    

  // handle all search inputs
  const handleSearch = (e) => {
    e.preventDefault()

    if (!search.trim() && !selectedDate && !selectedLocation) {
      setIsSearchClicked(false); // Hide the table
      setfilterdata([]); // Clear previous data
      return;
    }

    let filters = data; // fetched data are stored on filters variable to get the output for search

    if (search.trim()) {

    filters = filters.filter((user) =>

      user.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
      user.location.toLowerCase().includes(search.toLowerCase()) ||
      user.speciallist.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      filters = filters.filter((user) => user.date === selectedDate);
    }

    if (selectedLocation) {
      filters = filters.filter(
      (user) => user.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    
  setfilterdata(filters);
  setIsSearchClicked(true);
  };
    

  const handleCancel = () => {
    setSearch('');
    setSelectedDate('');
    setSelectedLocation('');
    setIsSearchClicked(false); // hides the table
    setfilterdata([]); // clears previous search results
  };




  return (
    <div>
      <div id='search'>

        <div className='d-flex justify-content-center '>
          <h1 className='heading text-danger mt-5 fw-bold'>SEARCH BY DOCTOR, LOCATION, DATA & HOSPITAL</h1>
        </div>

        <hr className="mx-auto border-danger"></hr>

        <div className='row justify-content-center gap-3 mt-4 p-4'>

          {/* search  */}
          <div className='col-12 col-sm-6 col-md-3'>
            <input 
            type='text'
            placeholder='Enter Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control form-control-lg text-center shadow-sm "
            />
          </div>
          

          {/* date */}
          <div className='col-12 col-sm-6 col-md-3'>
            <input 
            type='date'
            min={currendate}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control form-control-lg text-center shadow-sm"
            />
          </div>
            
          {/* location */}
          <div className='col-12 col-sm-6 col-md-3'>
            <select
            className="form-select form-select-lg text-center shadow-sm "
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            >
            <option className='text-center'>Choose a location</option>
            {locations.map((location, index) => (
            <option key={index} value={location}>
            {location}
            </option>
            ))}
            </select>
          </div>
            

        </div>


        <div className='d-flex gap-3 justify-content-center align-items-center mt-3'>

          <button className='btn btn-success rounded-pill px-4' type='button'
          onClick={ handleSearch}>SEARCH
          </button>

          <button className='btn btn-danger rounded-pill px-4' type='button'
          onClick={handleCancel}>CANCEL
          </button>

        </div>

        
        {isSearchClicked && ( 
        filterdata.length > 0 ? (
          <div className='m-5'>
            <div className={`table-responsive ${filterdata.length > 7 ? 'overflow-scroll' : ''}`} style={{ maxWidth: '100%' }}>
              <table className='table table-bordered text-center'>
                <thead className='bg-light'>
                  <tr>
                    <th className='text-center'>NO</th>
                    <th className='text-center'>HOSPITAL NAME</th>
                    <th className='text-center'>DOCTOR</th>
                    <th className='text-center'>SPECIALIST</th>
                    <th className='text-center'>LOCATION</th>
                    <th className='text-center'>DATE</th>
                    <th className='text-center'>OPEN TIME</th>
                    <th className='text-center'>CLOSE TIME</th>
                    <th className='text-center'>NO OF TOKEN AVAILABLE</th>
                    <th className='text-center'>SLOT AVAILABLE</th>
                    <th className='text-center'>MAKE APPOINTMENT</th>
                  </tr>
                </thead>

                <tbody>
                  {filterdata.map((user, index) => (
                    <tr key={index}>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-center'>{user.hospitalName}</td>
                      <td className='text-center'>{user.doctorName}</td>
                      <td className='text-center'>{user.speciallist}</td>
                      <td className='text-center'>{user.location}</td>
                      <td className='text-center'>{user.date}</td>
                      <td className='text-center'>{user.fromTime}</td>
                      <td className='text-center'>{user.toTime}</td>
                      <td className='text-center'>{user.token}</td>
                      <td className='text-center'>
                        {Array.isArray(user.slot) ? user.slot.join(', ') : 'No slots available'}
                      </td>
                      <td className='text-center'>
                        <button type='button' className='btn btn-outline-success' onClick={() => navigate("/booking-page")}>Book</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          ):(
            <div className='d-flex justify-content-center align-items-center w-100 mt-5'>
              <p className='p-3 text-center border border-danger text-danger'>DATA NOT FOUND</p>
            </div>
          )
        )}

        </div>
    </div>
  )
}

export default Search