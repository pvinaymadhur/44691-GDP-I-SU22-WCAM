import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { Component } from 'react';
import CloseICon from '../../assets/close.png';
import { bookAppointment, bookEmergencyAppointment, getLoggedUserData } from '../config/firbaseconfig';
import { DoctorsData } from '../config/doctors'

export default class AppointmentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            number: '',
            date: '',
            issue: '',
            selectDr: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = () => {
        let userId = JSON.parse(getLoggedUserData()).userId;
        let id = Date.now();
        //formType 1 is bookAppointment 
        if (this.props.formType === 1) {
            const data = {
                name: this.state.name,
                number: this.state.number,
                date: this.state.date,
                issue: this.state.issue,
                selectDr: this.state.selectDr
            }
            bookAppointment(userId, id, data).then(() => {
                this.onClose();
                this.props.handleAlertOpen(`Appointment Sucessfully Created with  ${DoctorsData.find(x => x.id === this.state.selectDr).name}`, "success");
            })
                .catch((error) => {
                    this.props.handleAlertOpen(`Appointment Creation failed for ${DoctorsData.find(x => x.id === this.state.selectDr).name}`, "error");
                });
        }
        //formType 2 is bookEmergencyAppointment 
        else if (this.props.formType === 2) {
            const data = {
                name: this.state.name,
                number: this.state.number,
                issue: this.state.issue,
                selectDr: this.state.selectDr
            }
            bookEmergencyAppointment(userId, id, data).then(() => {
                this.onClose();
                this.props.handleAlertOpen(`Emergency Appointment Sucessfully Created with ${DoctorsData.find(x => x.id === this.state.selectDr).name}`, "success");
            })
                .catch((error) => {
                    this.props.handleAlertOpen(`Emergency Appointment Creation failed for  ${DoctorsData.find(x => x.id === this.state.selectDr).name}`, "error");
                });
        }
    }

    onClose = () => {
        this.props.handleClose();
        this.setState({ name: '', number: '', date: '', issue: '' })
    }

    isDisabled = (formType) => {
        let disabled;
        if (formType === 1) {
            disabled = !!this.state.name && this.state.number && !!this.state.date && this.state.issue && this.state.selectDr
        }
        else {
            disabled = !!this.state.name && this.state.number && this.state.issue && this.state.selectDr
        }
        return !disabled
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.onClose}>
                <DialogTitle> Book an Appointment
                    <IconButton aria-label="close" onClick={this.onClose} sx={{ position: 'absolute', right: 8, top: 8, }}>
                        <img alt='CloseICon' src={CloseICon} height='30' width='30' />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {this.isDisabled() && <Typography variant="subtitle1" color="#e81919" component="div">
                                All (*) marked fields are mandatory
                            </Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='name' label="Enter Name*" InputLabelProps={{ shrink: true }} variant="standard" color='primary' fullWidth onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='number' label="Enter 919 Number*" InputLabelProps={{ shrink: true }} variant="standard" color='primary' fullWidth onChange={this.handleChange} />
                        </Grid>
                        {this.props.formType === 1 && <Grid item xs={12}>
                            <TextField type='date' label='Select Date *' InputLabelProps={{ shrink: true }} name='date' variant="standard" color='primary' fullWidth onChange={this.handleChange} />
                        </Grid>}
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="dr1" shrink> Select A Doctor * </InputLabel>
                                <Select
                                    name='selectDr'
                                    labelId="dr1"
                                    id="demo-simple-select-standard"
                                    value={this.state.selectDr}
                                    onChange={this.handleChange}
                                    label="Select A Doctor *"
                                >
                                    {DoctorsData.map((x, index) => <MenuItem key={index} value={x.id}>{x.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        {this.props.formType === 1 && <Grid item xs={12}>
                            <TextField label="Brief an Issue *" multiline rows={3} variant="standard" name="issue" fullWidth onChange={this.handleChange} />
                        </Grid>}
                        {this.props.formType === 2 && <Grid item xs={12}>
                            <TextField label="What's your Emergency *" multiline rows={3} variant="standard" name="issue" fullWidth onChange={this.handleChange} />
                        </Grid>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose} color='error'>Cancel</Button>
                    <Button disabled={this.isDisabled()} onClick={this.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
