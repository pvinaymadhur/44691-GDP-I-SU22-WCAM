import { Button, Popover } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppointmentInfo from '../appointment/appointmentinfo'
import { logOutFromApp } from '../config/firbaseconfig'
import './header.css'

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRecords, setOpenRecords] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenRecords = () => {
    setOpenRecords(true)
  }

  const handleCloseRecords = () => {
    setOpenRecords(false)
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className='header'>
      <nav className='header'>
        <ul className='topnav-left'>
          <li><NavLink to='/'>Home</NavLink></li>
        </ul>
        <div style={{ flex: 1 }}></div>
        <ul className='topnav-right'>
          {!props.isSignedIn && <li><NavLink to='/signin' end>Signin</NavLink></li>}
          {!props.isSignedIn && <li><NavLink to='/guestuser' end>GuestUser?</NavLink></li>}
          <li><NavLink to='/services' end>Services</NavLink></li>
          <li><NavLink to='/doctors' end>Doctors</NavLink></li>
          {props.isSignedIn &&
            <>
              <li aria-describedby={id} onClick={handleClick} className='topnav-profile'>
                {!!props.userData.userName ? props.userData.userName : props.userData.email}</li>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className='homepage-buttons'>
                  <Button variant='text' color='primary' style={{ textTransform: 'capitalize' }} onClick={handleOpenRecords} key={'btn1'}>
                    Health History
                  </Button>
                  <Button variant='text' color='error' style={{ textTransform: 'capitalize' }} onClick={logOutFromApp} key={'btn2'}>
                    Logout
                  </Button>
                </div>
              </Popover>
            </>}
        </ul>
      </nav>
      {openRecords && <AppointmentInfo openRecords={openRecords} handleCloseRecords={handleCloseRecords} />}
    </header>
  )
}


export default Header