import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {
    useWindowWidth,
  } from '@react-hook/window-size'
  import { State } from '../State/State';
  import {
    useRecoilState,
  } from 'recoil';
//   import { useEffect } from "react";
// import { getBottomNavigationUtilityClass } from '@mui/material';

export default function JobsTabs(props) {
  const [jobsState, setJobs] = useRecoilState(State.jobs);
  const [locationState, setLocation] = useRecoilState(State.location);
  const [scopeState, setScope] = useRecoilState(State.scope);
  const [jobsTabsBtn, setJobsTabsBtn] = useRecoilState(State.jobsTabsBtn);
  
  const [typelocpos] = useRecoilState(State.typelocpos);
  
  
  // const [jobsArr, setJobsArr] = React.useState([]);
  // const [locationArr, setLocationArr] = React.useState([]);
  // const [scopeArr, setScopeArr] = React.useState([]);
  //const [btn, setBtn] = React.useState('Search');
  const [btn, setBtn] = useRecoilState(State.btnSearch);
//   useEffect(() => {
//     // if(typelocpos.length > 0){
//     //   typelocpos.forEach(function(element){
//     //     setJobsArr(oldArray => [...oldArray, {value:element.type, label:element.type}]);
//     //     setLocationArr(oldArray => [...oldArray, {value:element.location, label:element.location}]);
//     //     setScopeArr(oldArray => [...oldArray, {value:element.scope, label:element.scope}]);
//     // });
//         // setJobsArr(typelocpos.type);
//         // setLocationArr(typelocpos.location);
//         // setScopeArr(typelocpos.position);
         

//   //}
  
// }, [typelocpos]);
  const jobsHandleChange = (event) => {
    setJobs(event.target.value);
  };
  const locationHandleChange = (event) => {
    setLocation(event.target.value);
  };
  const scopeHandleChange = (event) => {
    setScope(event.target.value);
  };
  
  const JobsTabsBtn = () => {
    setJobsTabsBtn(!jobsTabsBtn);
    if(jobsTabsBtn) {
      
      setBtn('Search');
      setLocation('');
      setScope('');
      setJobs('');
    }
    else {
      setBtn('Clear Search');
      
    }
  }
  const onlyWidth = useWindowWidth()

  let btnIsActive = true;
  if(locationState && scopeState && jobsState){
    btnIsActive = false
  }

  const ButtonIsNeed = props.ButtonIsNeed ? <Button disabled={btnIsActive} onClick={JobsTabsBtn} variant="contained">{btn}</Button> : null;
  return (
    
   <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '28ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex" 
      alignItems="center"
      justifyContent="center"
      marginTop={2}
      marginBottom={2}
    >
        
      <div style={ onlyWidth < 850 ? {justifyContent:'center', display:'flex', flexDirection:'column'} : {display:'flex', alignItems:'center'}}>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={jobsState}
          onChange={jobsHandleChange}
          helperText="Please select your job type"
        >
          
          {typelocpos.type ? typelocpos.type.map((option) => (
            
            <MenuItem key={option._id} value={option.type}>
              {option.type}
            </MenuItem>
          )): <TextField></TextField>}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={locationState}
          onChange={locationHandleChange}
          helperText="Please select your location"
        >
          {typelocpos.location ? typelocpos.location.map((option) => (
            <MenuItem key={option._id} value={option.location}>
              {option.location}
            </MenuItem>
          )): <TextField></TextField>}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={scopeState}
          onChange={scopeHandleChange}
          helperText="Please select your scope of position"
        >
          {typelocpos.position ? typelocpos.position.map((option) => (
            <MenuItem key={option._id} value={option.position}>
              {option.position}
            </MenuItem>
          )): <TextField></TextField>}
        </TextField>
        {ButtonIsNeed}
        </div>
    </Box>

    
   
  );
}
