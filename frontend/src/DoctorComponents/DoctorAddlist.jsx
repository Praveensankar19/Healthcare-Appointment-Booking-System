import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorAddlist = () => {

    const navigate = useNavigate()

    const [doctordata, setdoctordata] = useState([])

    const [formdata, setformdata] = useState({

        hospitalName:'',
        doctorName:'',
        speciallist:'',
        location:'',
        date:'',
        fromTime:'',
        toTime:'',
        token:'',
        slot:[],

    })

    // Load data from local storage
    useEffect(() => {
        const storedData = localStorage.getItem('doctordata');
        if (storedData) {
            const parsedData = JSON.parse(storedData).map(user => ({
                ...user,
                slot: Array.isArray(user.slot) ? user.slot : [user.slot], 
            }));
            setdoctordata(parsedData);
        }
    }, []);


    const handleChange = (event) =>{
        const {name, value, type, checked} = event.target;

        if(type === "checkbox"){
            setformdata((currdata) =>({
                ...currdata,
                slot : checked ?
                [...currdata.slot,value]
                :currdata.slot.filter((slot) => slot !== value),
            }));
        } else {
            setformdata((currdata) =>({
                ...currdata,
                [name]:value
            }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            setdoctordata((curdata) =>{
                const updateddata =[...curdata,formdata];
                localStorage.setItem('doctordata', JSON.stringify(updateddata));
                return updateddata;
            });
            
            const response = await axios.post('http://localhost:8000/Doctorlist', formdata)
    
            console.log(response.data)
            alert("signup successfully")
    
    
            setformdata({
                hospitalName:'',
                doctorName:'',
                speciallist:'',
                location:'',
                date:'',
                fromTime:'',
                toTime:'',
                token:'',
                slot:[],
            })
    
            navigate('/doctor-page');

        }
        catch (error){
            console.error("Error saving doctor data:", error);
            alert("Failed to save doctor data");
        }
    }

    const handleCancel = () =>{

        const isconfirm = window.confirm("Are you Sure to Cancel the Form?");

        if(isconfirm){
            setformdata({
                hospitalName: '',
                doctorName: '',
                speciallist: '',
                location: '',
                date: '',
                fromTime: '',
                toTime: '',
                token: '',
                slot: [],
            })
        }
    } 

    const handleBack = () =>{
        navigate(-1)
    }


  return (
    <div>
        <div className='m-3 p-2 d-flex justify-content-center'>
            <h1 className='m-1 text-center fs-3'>HOSPITAL DETAILS ADD LIST FORM</h1>
        </div>

        <div className='d-flex justify-content-center text-dark'>
            <form className='p-3 bg-light' onSubmit={handleSubmit}>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>HOSPITAL NAME</label>

                    <input type='text' 
                    name='hospitalName'   
                    className='text-center' required 
                    value={formdata.hospitalName}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className='p-2 d-flex justify-content-between'>
                    <label className='p-1'>DOCTOR NAME</label>

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
                    <input type='number' 
                    name='token' 
                    className='text-center' required min="1"
                    value={formdata.token}
                    onChange={handleChange}>
                    </input>
                </div>

                <div className="p-2 d-flex justify-content-between align-items-center">
                    <label className="p-1">SLOT AVAILABLE</label>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            checked={formdata.slot.includes('FN')}
                            name="slot"
                            value="FN"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">FN</label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            checked={formdata.slot.includes('AN')}
                            name="slot"
                            value="AN"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">AN</label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            checked={formdata.slot.includes('NIGHT')}
                            name="slot"
                            value="NIGHT"
                            onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="slot1">NIGHT</label>
                    </div>
                </div>

                <div className='m-4 d-flex justify-content-center'>

                    <button className='p-2 text-center btn btn-outline-danger'
                        type="button"
                        onClick={handleBack}
                        
                    >BACK</button>


                    <button className='ms-5 p-2 text-center btn btn-outline-danger'
                            type="button"
                            onClick={handleCancel}
                    >CANCEL</button>

                    <button type='submit' 
                            className='ms-5 p-2 text-center btn btn-outline-success' 
                        >ADD</button>
                </div>
            </form>
        </div>



    </div>
  )
}

export default DoctorAddlist
