
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import jsonObject from "./data.json"; 
import Stack from '@mui/material/Stack';

import './App.css';  

import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';



import Dialog from '@mui/material/Dialog';





let dataSet = jsonObject; 
let numberOfPatients = dataSet.length; 

const patientStatus = () => {
  let triage = 0; 
  let checkin = 0; 
  let treatment = 0; 
  let admitted = 0; 
  let discharged = 0; 

  for (let x = 0; x < dataSet.length; x++) {

    switch(dataSet[x].status){
      case "checkin":
        checkin = checkin+1 
        break
      case "triage": 
        triage = triage+1
        break
      case "treatment": 
        treatment = treatment+1
        break
      case "admitted": 
        admitted = admitted+1 
        break 
      case "discharged":
        discharged = discharged+1
        break; 
      default: 
        console.log("error")
        break;
    }
   
      }

    return({"Check-In": checkin, "Triage": triage, "Treatment": treatment, "Admitted": admitted, "Discharged": discharged})
  
}


function NewPatient() {

}


function Cards(){

  let patientData = patientStatus(); 

  return(


      <Box fullwidth sx={{  borderRadius: "10px"}}>
      <p><Typography variant='h6' color={'primary.dark'} fontWeight={'bold'}>PATIENT WAITING ROOM STATUS</Typography></p>
  <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'error.dark'}>{patientData['Check-In']}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>CHECKED IN</Typography>
              </CardContent>
        </Card>
        </Grid>
        <Grid item xs={2}>
                   <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'warning.dark'}>{patientData['Triage']}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>TRIAGE</Typography>
              </CardContent>
        </Card>
        </Grid>
        <Grid item  xs={2}>
         <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'success.main'}>{patientData['Treatment']}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>TREATMENT</Typography>
              </CardContent>
        </Card>
        </Grid>
        <Grid item  xs={2}>
         <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'secondary.dark'}>{patientData['Admitted']}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>ADMITTED</Typography>
              </CardContent>
        </Card>
        </Grid>
        <Grid item  xs={2}>
         <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'success.dark'}>{patientData['Discharged']}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>CHECKED IN</Typography>
              </CardContent>
        </Card>
        </Grid>
        <Grid item  xs={2}>
         <Card raised='true'>    
            <CardContent>
              <Typography variant='h6' color={'success.main'}>{numberOfPatients}</Typography><br/>
              <Typography variant='body1' color={'info.dark'}>TOTAL PATIENTS</Typography>
              </CardContent>
        </Card>
        </Grid>
      </Grid></Box>)

}

function PatientTable(){

  const [open, setOpen] = React.useState(false);
  const [newValue, setNewValue] = React.useState(""); 

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    
    <Stack>
      <p><Typography variant='h6' color={'primary.dark'} fontWeight={'bold'}>PATIENTS WAITING</Typography></p>
      <p><Button variant='contained' color='info' style={{width: "200px"}} onClick={()=>{alert("This experience is similar to the Patient Intake.")}}>Add New Patient</Button></p>
    <TableContainer component={Paper}>
      <Table maxWidth="1240px" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Wellness</TableCell>
            <TableCell align="right">Pain Level</TableCell>
            <TableCell align="right">Symptoms</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Heart Rate</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">See More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSet.map((row) => (
            <TableRow
              key={row.time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(parseFloat(row.time)*1000).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row.body.feel}</TableCell>
              <TableCell align="right">{row.body.pain}</TableCell>
              <TableCell align="right">{row.body.symptoms}</TableCell>
              <TableCell align="right">{row.vitals.temp}</TableCell>
              <TableCell align="right">{row.vitals.heartbeat}</TableCell>
              <TableCell align="right"><Chip label={row.status} color={row.status === 'checkin' ? 'error' : row.status==='triage' ? 'warning' : row.status==='admitted' ? 'secondary' : 'success'} /></TableCell>
              <TableCell align="right"><Button variant='contained' onClick={handleClickOpen}>See More</Button>
              
                   <Dialog onClose={handleClose} open={open}>

         <Card raised='true'>    
            <CardContent>
              <Typography variant='body1'>INSURANCE CARD / ID</Typography>
              <p><img src={row.person.imageURL}></img></p>

              <Typography variant='body1'>OCR OUTPUT</Typography>
              <Typography variant="caption">{row.person.output}</Typography>

              <p><Button variant='contained' onClick={handleClose}>Close</Button></p>
             
            </CardContent>
        </Card>

      </Dialog>
              
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </Stack>



  );

}

function App() {

  return (
    <Container maxWidth="xl">
      <Box sx={{marginTop: "5px"}}>
       <Stack spacing={2}>
        <Cards/>
        <PatientTable/>
 
      </Stack>
      </Box>
        
      </Container>
  );
}

export default App;
