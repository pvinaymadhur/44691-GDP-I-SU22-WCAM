import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Button, Grid, TextField, Typography } from '@mui/material';
import { auth, database, signUp } from '../config/firbaseconfig';
import { ref, set } from 'firebase/database';
import { updateProfile } from 'firebase/auth';

export class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: '',
      password: '',
      email: '',
      userCreated: false,
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick = () => {
    signUp(this.state.email, this.state.password).then((userCredential) => {
      const user = userCredential.user;
      const displayName = this.state.displayName;
      set(ref(database, 'users/' + user.uid), {
        userName: this.state.displayName,
        email: this.state.email
      })
      updateProfile(auth.currentUser, { displayName });
      this.setState({ userCreated: true })
      // alert('user created!');
    })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    return (
      <Container maxWidth="sm" style={{ margin: 'auto' }}>
        {!this.state.userCreated ? <Grid container spacing={2} className='authscreen-container'>
          <Grid item xs={12}>
            <Typography variant='h5' component='h5' color='#1976d2'>Signup</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField name='displayName' label="UserName*" variant="outlined" color='primary' fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField name='email' label="Email*" variant="outlined" color='primary' fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField type='password' name='password' label="Password*" variant="outlined" color='primary' fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' fullwidth onClick={() => this.handleClick()}>Signup</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" color='#1976d2'>
              Don't have an account? <Link to='/signin' className='signup-link'>Signin</Link></Typography>
          </Grid>
        </Grid> :
          <Grid container spacing={3} className='authscreen-container'>
            <Typography variant="body1" component="p" color='#1976d2'>
              User Created Sucessfully. Go back to <Link to='/signin' className='signup-link'>Signin</Link> or <Link to='/guestuser' className='signup-link'>Guestuser?</Link></Typography>

          </Grid>
        }
      </Container>)
  }
}

export default Signup