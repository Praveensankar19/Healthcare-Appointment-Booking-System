import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Doctorupdateform = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const user = location.state?.user || {}
    const index = location.state?.index

    const [formdata, setformdata] = useState({

        hospitalName: user.hospitalName || '',
        doctorName: user.doctorName || '',
        speciallist: user.speciallist || '',
        location: user.location || '',
        date: user.date || '',
        fromTime: user.fromTime || '',
        toTime: user.toTime || '',
        token: user.token || '',
        slot: user.slot || '',
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        
        if (name === 'slot') {
            setformdata(prevData => {
                let updatedSlots = [...prevData.slot]; // Copy the previous slot values
                
                if (checked) {
                    // Add the value if checked
                    updatedSlots.push(value);
                } else {
                    // Remove the value if unchecked
                    updatedSlots = updatedSlots.filter(slot => slot !== value);
                }
                
                return {
                    ...prevData,
                    slot: updatedSlots,
                }
            })

        } else {
            setformdata((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const storedData = JSON.parse(localStorage.getItem('doctordata')) || [];
    
        if (index !== undefined && storedData[index]) {
          storedData[index] = { ...storedData[index], ...formdata };
    
          localStorage.setItem('doctordata', JSON.stringify(storedData));
    
          navigate('/doctor-page');
        } else {
          console.error('Error: Invalid index or data not found');
        }
      };
      
    const handleCancel = () =>{
        navigate(-1);
    }

    
  return (
    <div>
        
        <div className='d-flex justify-content-center text-dark'>
            <form className='p-3 bg-light' onSubmit={handleSubmit} >

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>HOSPITAL NAME</label>

                    <input type='text'
                        name="hospitalName"
                        className='text-center'
                        value={formdata.hospitalName}
                        onChange={handleChange}
                        ></input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>DOCTOR</label>

                    <input type='text' 
                    name='doctorName' 
                    className='text-center' required
                    value={formdata.doctorName}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>SPECIALIST</label>

                    <input type='text' 
                    name='speciallist' className='text-center' required
                    value={formdata.speciallist}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>LOCATION</label>

                    <input type='text' 
                    name='location' 
                    className='text-center' required
                    value={formdata.location}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>DATE</label>

                    <input type='date' 
                    name='date' 
                    className='text-center' required
                    value={formdata.date}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>TIMING</label>

                    <input type='time' 
                    name='fromTime' 
                    className='text-center'
                    value={formdata.fromTime}
                    onChange={handleChange}>
                    </input>

                    <span className=''>TO</span>

                    <input type='time' 
                    name='toTime' 
                    className='text-center'
                    value={formdata.toTime}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>NO OF TOKEN AVAILABLE</label>
                    <input type='text' 
                    name='token' 
                    className='text-center' required
                    value={formdata.token}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className="p-2 d-flex justify-content-between align-items-center">
                    <label className="p-1">SLOT AVAILABLE</label>
                    <div className="form-check">
                        <input 
                            type="checkbox"
                            name='slot' 
                            className="form-check-input" 
                            checked={formdata.slot.includes('FN')}
                            value="FN"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">FN</label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox"
                            name='slot'  
                            className="form-check-input"
                            checked={formdata.slot.includes('AN')} 
                            value="AN"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">AN</label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name='slot' 
                            className="form-check-input" 
                            checked={formdata.slot.includes('NIGHT')}
                            value="NIGHT"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">NIGHT</label>
                    </div>
                </div>

                <div className='m-4 d-flex justify-content-center'>
                    <button className='p-2 text-center btn btn-outline-danger'
                        type="button"
                        onClick={handleCancel}
                    >CANCEL</button>

                    <button type='submit' 
                        className='ms-5 p-2 text-center btn btn-outline-success' 
                    >UPDATE</button>
                </div>

            </form>
        </div>

      
    </div>
  )
}

export default Doctorupdateform
