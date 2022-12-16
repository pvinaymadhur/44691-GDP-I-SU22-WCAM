import { Button } from '@mui/material'
import React, { Component } from 'react'
import AppointmentForm from '../appointment/appointmentform'
import Advertisement from '../layout/advertisement'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './home.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      formType: 0,
      alert: false,
      alertMessage: '',
      alertType: '',
    }
  }

  handleClickOpen = (formType) => {
    this.setState({ open: true, formType: formType });
  };

  handleClose = () => {
    this.setState({ open: false, formType: 0 });
  };

  handleAlertOpen = (msg, alertType) => {
    this.setState({ alert: true, alertType: alertType, alertMessage: msg });
  };

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ alert: false, severity: '', alertMessage: '' });
  };

  render() {
    return (
      <div className='homepage-container'>
        <Snackbar open={this.state.alert} autoHideDuration={3000} onClose={this.handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={this.handleAlertClose} severity={this.state.alertType} sx={{ width: '100%' }}>
            {this.state.alertMessage} 
          </Alert>
        </Snackbar>
        <div className='homepage-title'>
          <h1>Welcome To Wellness Center</h1>
          <h2>Feeling not Good?, Make your Appointment Today</h2>
        </div>
        <div style={{ height: '25vh', overflow: 'hidden' }}>
          <Advertisement />
        </div>
        {this.props.isSignedIn && <div className='homepage-buttons'>
          <div style={{ margin: "auto" }}>
            <Button variant='contained' color='primary' onClick={() => this.handleClickOpen(1)}>Book Appointment</Button>
          </div>
          <div style={{ margin: "auto" }} className='button-emergency'>
            <Button variant='contained' color='error' onClick={() => this.handleClickOpen(2)}>Emergency Appointment</Button>
          </div>
        </div>}
        {this.state.open && <AppointmentForm open={this.state.open} formType={this.state.formType} handleClose={this.handleClose} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />}
      </div>
    )
  }
}

export default Home