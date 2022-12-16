import React, { Component } from 'react'

export class Services extends Component {
  render() {
    return (
      <div className='services-container' id='custom-scrollbar'>
        <h2 className='clr-list services-title'> Services </h2>
        <ul className='services-list'>
          <h3 className='clr-list' style={{ marginLeft: '10px' }}>Northwest students seek our outpatient clinical care services for a number of reasons, including (but not limited to)</h3>
          <li><h4 className='clr-list'>Cold and Flu Symptoms</h4></li>
          <li><h4 className='clr-list'>Cough, Headache, Fever, Sore Throat, Infections, etc.</h4></li>
          <li><h4 className='clr-list'>Immunizations</h4></li>
          <li><h4 className='clr-list'>Injuries</h4></li>
          <li><h4 className='clr-list'>Sprains, Strains, Lacerations, etc.</h4></li>
          <li><h4 className='clr-list'>Women's Health Annual Exams</h4></li>
          <li><h4 className='clr-list'>STI Testing</h4></li>
          <li><h4 className='clr-list'>Mental Health Care</h4></li>
          <li><h4 className='clr-list'>Anxiety, Depssion, Stress</h4></li>
          <li><h4 className='clr-list'>Rash / Skin Issues</h4></li>
          <li><h4 className='clr-list'>Wound Care</h4></li>
          <li><h4 className='clr-list'>Minor Procedures</h4></li>
          <li><h4 className='clr-list'>Toenail Removal, Wart Removal, Sutures, etc.</h4></li>
          <h3 className='clr-list' style={{ textAlign: 'center' }}>Much More!</h3>
          <li><h4 className='clr-list'>Wellness Services works closely with the local hospital to help students receive services that are NOT provided by our clinic.These include(among others) allergy injections, surgeries, ADHD management, and emergency care services.</h4></li>
        </ul>
      </div>
    )
  }
}

export default Services
