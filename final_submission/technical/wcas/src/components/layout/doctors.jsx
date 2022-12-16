import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { Component } from 'react';
import { DoctorsData } from '../config/doctors'

export class Doctors extends Component {
  render() {
    return (
      <div className='doctors-container' id='custom-scrollbar'>
        <h2 className='doctors-title'>Available Doctors</h2>
        <div className='doctors-list'>
          {DoctorsData.map((x, index) => <Card sx={{ display: 'flex', minWidth: 400, maxWidth: 700, mx: 'auto', my:3 }} key={index}>
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={x.image}
              alt={x.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {x.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {x.specialties}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1, pr: 1 }}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Health care is provided for {x.healthCareProvidedto}
                </Typography>
              </Box>
            </Box>
          </Card>)}
        </div>
      </div>
    )
  }
}

export default Doctors