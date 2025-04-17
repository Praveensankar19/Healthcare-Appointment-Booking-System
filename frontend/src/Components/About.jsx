import React from 'react'

const About = () => {
  return (
    <div>
      
    <div id='about' className='align-items-center mt-5'>
        
        <div className="text-center mb-4">
          <h1 className="heading text-danger fw-bold">ABOUT US</h1>
          <hr className="mx-auto border-danger" />
        </div>

        <div className="row align-items-center mb-5">

          <div className="col-md-6 mt-5 p-3">
          <img
            src="about.jpg"
            alt="Healthcare"
            className="img-fluid rounded shadow"
          />
          </div>

          <div className="col-md-6 p-5">
          <h4 className="">
            Welcome to <span className="text-danger">HealthCare Booking</span>! We connect patients with trusted doctors,
            making healthcare more accessible and hassle-free. Our platform allows you to:
          </h4>
          <ul className="list-unstyled mt-5">
            <li>SEARCH FOR SPECIALISTS</li>
            <li>CHECK THEIR AVAILABILITY</li>
            <li>BOOK APPOINTMENTS INSTANTLY</li>
            <li>ACCESS YOUR REPORTS SECURELY</li>
          </ul>
          </div>

        </div>
        

        <div className="row g-4 text-center">
        {[
          { name: 'Cardiology (Heart)', icon: '❤️', desc: 'Advanced care for heart diseases and disorders.' },
          { name: 'Dentistry (Teeth)', icon: '🦷', desc: 'Expert dental care from cleaning to surgery.' },
          { name: 'Neurology (Brain)', icon: '🧠', desc: 'Diagnosis and treatment of brain and nervous system.' },
          { name: 'Pediatrics (Child)', icon: '👶', desc: 'Comprehensive child healthcare services.' },
          { name: 'Orthopedics (Bones)', icon: '🦴', desc: 'Bone, joint, and spine treatments.' },
          { name: 'Dermatology (Skin)', icon: '🌿', desc: 'Skin treatments, cosmetic and medical.' },
          { name: 'Gynecology (Women)', icon: '👩‍⚕️', desc: 'Women’s health and maternity care.' },
          { name: 'ENT (Ear, Nose, Throat)', icon: '👂👃👄', desc: 'All your ENT health needs under one roof.' },
        ].map((dept, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="p-3 border rounded shadow-sm h-100">
              <h2>{dept.icon}</h2>
              <h5 className="fw-bold text-danger">{dept.name}</h5>
              <p className="text-muted">{dept.desc}</p>
            </div>
          </div>
        ))}
        </div>

        <p className="mt-3">📅 Book now and stay healthy with a secure, fast, and reliable service!</p>


        
    </div>
    </div>

  )
}

export default About
