import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorPage = () => {

  const navigate = useNavigate()
  
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      try {
          const response = await axios.get('http://localhost:8000/api/hospitals'); //fetching data from backend
          setData(response.data);
          setFilteredData(response.data);
      } catch (error) {
          console.error("Error fetching data from MongoDB:", error);
      }
    };
    fetchData();

  }, [])
  
  
  const handleDelete= ((index) =>{

    const isconfirm = window.confirm("Are you sure you want to delete this item ?")

    if(isconfirm){
      const dltdata = [...data];
      dltdata.splice(index,1)
  
      setData(dltdata);
    }

  })


  const handleUpdate = (user, index) =>{

    navigate('update-form', {state : {user, index} })

  }

  const handleSearch = () => {
    if (search.trim()) {
      const results = data.filter((user) =>
        user.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
        user.location.toLowerCase().includes(search.toLowerCase()) ||
        user.speciallist.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(data); // If input is empty, show all data
    }
  };

  const handleCancel = () => {
    setSearch('');          // Clear the input
    setFilteredData(data);  // Reset the filtered data to show all
  };

  return (
    <div>
      
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom p-4 shadow-sm fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-primary">DOCTOR PAGE</span>

          <div className="ms-auto">
            <button
            className="btn btn-outline-primary"
            onClick={() => navigate('add-list')}
            > ADD NEW SCHEDULE </button>
          </div>
        </div>
      </nav>
    </header>


      <div className='mt-5' style={{ minHeight: '100vh', overflowX: 'hidden'}}>

        <div className='align-items-center mt-5'>
          <h1 className='text-primary fs-2 text-center m-0'>HOSPITAL AND DOCTOR DETAILS</h1>
        </div>

        <div className='row justify-content-center align-items-center g-2 mt-3'>

          <div className='col-12 d-flex justify-content-center'>
            <input 
              type='text'
              placeholder='Enter Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-lg text-center shadow-sm w-25"
            />
          </div>

          <div className='col-12 d-flex justify-content-center gap-3 mt-4'>
            <button className='btn btn-success rounded-pill px-4' type='button'
              onClick={handleSearch}>
              SEARCH
            </button>

            <button className='btn btn-secondary rounded-pill px-4' type='button'
              onClick={handleCancel}>
              CANCEL
            </button>
          </div>

        </div>

        <div className='p-3 mt-5 d-flex justify-content-center'>
          <div className='table-responsive'>
          <table className="table table-bordered table-hover text-center">
            <thead className='bg-danger'>
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
                <th className='border border-2 border-dark p-2 text-center'>UPDATE</th>
                <th className='border border-2 border-dark p-2 text-center'>DELETE</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((user, index) => ( 
                <tr key={index}>
                  <td className='border border-2 border-dark p-2 text-center'>{index} </td>
                  <td className='border border-2 border-dark p-2 text-center'>{user.hospitalName} </td>
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
                    <button type='button' className='btn btn-outline-warning'
                    onClick= { () =>{handleUpdate(user, index)} }>  UPDATE  </button>
                  </td>
                  
                  <td className='border border-2 border-dark p-2 text-center'>
                    <button type='button' className='btn btn-outline-danger'
                    onClick= { () => {handleDelete(index) }}>  DELETE  </button>
                  </td>
                  
                </tr>
              ))}
              
            </tbody>
          </table>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DoctorPage