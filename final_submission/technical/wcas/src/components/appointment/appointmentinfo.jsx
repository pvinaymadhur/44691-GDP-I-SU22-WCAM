import { Grid, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { Component } from 'react';
import CloseICon from '../../assets/close.png';
import { DoctorsData } from '../config/doctors';
import { getAppointmentDetails, getEmergencyAppointmentDetails, getLoggedUserData } from '../config/firbaseconfig';

export default class AppointmentInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emergencyAppointentData: [],
            appointmentData: []
        }
    }


    componentDidMount = () => {
        this.getAppoinmentDetails();
        this.getEmergenncyAppoinmentDetails();
    }

    getEmergenncyAppoinmentDetails = () => {
        let userId = JSON.parse(getLoggedUserData()).userId;
        getEmergencyAppointmentDetails(userId).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({ emergencyAppointentData: snapshot.val() })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getAppoinmentDetails = () => {
        let userId = JSON.parse(getLoggedUserData()).userId;
        getAppointmentDetails(userId).then((snapshot) => {
            if (snapshot.exists()) {

                this.setState({ appointmentData: snapshot.val() })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    onClose = () => {
        this.props.handleCloseRecords();
        this.setState({ emergencyAppointentData: [], appointmentData: [] })
    }

    render() {
        return (
            <Dialog open={this.props.openRecords} onClose={this.onClose}>
                <DialogTitle> Appointment Details
                    <IconButton aria-label="close" onClick={this.onClose} sx={{ position: 'absolute', right: 8, top: 8, }}>
                        <img alt='CloseICon' src={CloseICon} height='30' width='30' />
                    </IconButton>
                </DialogTitle>
                <DialogContent id='custom-scrollbar'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ fontWeight: 600 }}>Apponitment Details</Grid>
                        {Object.values(this.state.appointmentData).map((x, index) => <Grid item xs={12} key={index}>
                            <div>Name: {x.name}</div>
                            <div>919 Number:{x.number}</div>
                            <div>Date: {x.date}</div>
                            <div>Issue:{x.issue}</div>
                            {!!x.selectDr && <div>Doctor Name: {DoctorsData.find(y => y.id === x.selectDr).name}</div>}
                        </Grid>)}
                        <Grid item xs={12} style={{ fontWeight: 600 }}>Emergency Apponitment Details</Grid>
                        {Object.values(this.state.emergencyAppointentData).map((x, index) => <Grid item xs={12} key={index}>
                            <div>Name: {x.name}</div>
                            <div>919 Number:{x.number}</div>
                            <div>Issue:{x.issue}</div>
                            {!!x.selectDr && <div>Doctor Name: {DoctorsData.find(y => y.id === x.selectDr).name}</div>}
                        </Grid>)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose} color='error'>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
