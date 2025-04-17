import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Booking = () => {

  const navigate = useNavigate()

  const [storebookdata, setstorebookdata] = useState([])
  const [bookingdata, setbookingdata] = useState({

    patientName:'',
    patientAge:'',
    disease:'',
    contact:'',
    patientaddress:'',
    firsttimevisit:'No',
    date:'',
  })

  const handleChange = (event) =>{

    const {name, value, type, checked} = event.target;

    if(type == "checkbox"){
      setbookingdata((currdata) =>({
        ...currdata,

        [name] : name === 'firsttimevisit' 
        ? (checked ? "Yes" : "No")
        : value
      }))
    }

    else{
      setbookingdata((curdata) =>({
        ...curdata,
        [name]:value
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = [...storebookdata, bookingdata];
    localStorage.setItem('storebookdata', JSON.stringify(updatedData));
    setstorebookdata(updatedData);
    alert('Booking Confirmed!');
  };

  
  return (
    <div>
        <div className='d-flex justify-content-center text-dark m-2 p-5'>
          <form className='p-3 bg-light' onSubmit={handleSubmit}>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>PATIENT NAME</label>

            <input type='text' 
              name='patientName'   
              className='text-center' required
              onChange={handleChange} 
            ></input>
          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>PATIENT AGE</label>

            <input type='text' 
              name='patientAge'   
              className='text-center' required
              onChange={handleChange}  
            ></input>
          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>DISEASE/REASON</label>

            <input type='text' 
              name='disease'   
              className='text-center' required
              onChange={handleChange}  
            ></input>
          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>CONTACT NO</label>

            <input type='text' 
              name='contact'   
              className='text-center' required
              onChange={handleChange}  
            ></input>
          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>ADDRESS</label>

            <input type='text' 
              name='patientaddress'   
              className='text-center' required
              onChange={handleChange}  
            ></input>
          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>FIRST TIME VISITOR</label>

            <div className="form-check">
              <input type='checkbox' 
                name='firsttimevisit'   
                className='text-center'
                onChange={handleChange}
                checked={bookingdata.firsttimevisit === "Yes"}  
              ></input>
              <label className="form-check-label">YES</label>
            </div>

          </div>

          <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>DATE</label>

            <input type='date' 
              name='date'   
              className='text-center' required
              onChange={handleChange}  
            ></input>
          </div>

          {/* <div className='p-2 d-flex justify-content-between'>
            <label className='p-1'>SELECT SLOT</label>

            <div className="form-check">
              <input type='checkbox' 
                name='slot'   
                className='text-center'
                checked={bookingdata.slot.includes("FN")}
                onChange={handleChange}  
              ></input>
              <label className="form-check-label">FN</label>
            </div>

            <div className="form-check">
              <input type='checkbox' 
                name='slot'   
                className='text-center'
                checked={bookingdata.slot.includes("AN")}
                onChange={handleChange}  
              ></input>
              <label className="form-check-label">AN</label>
            </div>
          </div> */}

          <div className='m-4 d-flex justify-content-center'>

            <button className='p-2 text-center btn btn-outline-danger' type="button" onClick={() => navigate(-1)}>BACK</button>
            
            <button className='ms-5 p-2 text-center btn btn-outline-danger' type="button">CANCEL</button>

            <button type='submit' className='ms-5 p-2 text-center btn btn-outline-success'>CONFIRM</button>
          </div>

          </form>
        </div>


    </div>
  )
}

export default Booking
