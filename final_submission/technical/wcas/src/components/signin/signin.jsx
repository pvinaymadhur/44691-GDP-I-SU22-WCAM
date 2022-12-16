import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Grid, TextField, Typography } from '@mui/material';
import { database, signIn } from '../config/firbaseconfig';
import { ref, update } from 'firebase/database';

const Signin = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    signIn(userName, password).then((userCredential) => {
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      })
      let sessionData = {
        userId: user.uid,
        userName: user.displayName,
        email: user.email,
        authToken: userCredential._tokenResponse.refreshToken
      }
      sessionStorage.setItem("userDetails", JSON.stringify(sessionData));
      navigate('/');
      window.location.reload();
    })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    ;
  }
  return (
    <Container maxWidth="sm" style={{ margin: 'auto' }}>
      <Grid container spacing={2} className='authscreen-container'>
        <Grid item xs={12}>
          <Typography variant='h5' component='h5' color='#1976d2'>{!props.isGuestUser ? "Signin" : "GuestUser"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField name='userName' label="Username*" variant="outlined" color='primary' fullWidth onChange={(e) => setUserName(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField type='password' name='password' label="Password*" variant="outlined" color='primary' fullWidth onChange={(e) => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' fullwidth onClick={handleClick}>Signin</Button>
        </Grid>
        {props.isGuestUser && <Grid item xs={12}>
          <Typography variant="body1" component="p" color='#1976d2'>
            Don't have an account? <Link to='/signup' className='signup-link'>Signup</Link></Typography>
        </Grid>}
      </Grid>
    </Container>
  )
}

export default Signin