import * as React from 'react';
import { TestJobField } from './TestJobField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import JobsNavBar from "./JobsNavBar"
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
export const TestJob = () =>{
  let history = useHistory();
  const [testJobsIsActiveNumOfQ] = useRecoilState(State.testJobsIsActiveNumOfQ);

  const [numberOfQuestion, setNumberOfQuestion] = React.useState(1);

  const handleChange = (event) => {
    setNumberOfQuestion(event.target.value);
  };

  var numberOfQuestionArr = [];

  for (var i = 0; i < numberOfQuestion; i++){
    numberOfQuestionArr.push(<TestJobField key={i} questionNO = {i + 1}/>);
  }
      
  function nextToPostNewJob() {
    history.push("/newjob");
  }

    let test = true;
    if(numberOfQuestion === testJobsIsActiveNumOfQ){
      test = false
    }

    let pickNumberOfTest = false;
    if(testJobsIsActiveNumOfQ > 0){
      pickNumberOfTest = true;
    }

    return(
        <>
                      <JobsNavBar />

        <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">First Lest Create The Quick Test For Job</span>
          <span className="block text-indigo-600">It's For Quality Personnes</span>
        </h2>
        {/* <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div> */}
      </div>
    </div>
        <div style={{ display:'flex', justifyContent:'center'}}> 
        <Box  sx={{ minWidth: 120 }}>
      <FormControl  fullWidth>
        <InputLabel  id="demo-simple-select-label">Pick</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numberOfQuestion}
          disabled={pickNumberOfTest}
          label="Pick"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div >
    

        <div style={{display:'flex', flexWrap: 'wrap', justifyContent:'center'}}>

        {numberOfQuestionArr}
        

        </div>

        <div style={{ display:'flex', justifyContent:'center' , marginTop:'10px', marginBottom:'10px'}}>
        <Button disabled={test} onClick={nextToPostNewJob} variant="contained">Next</Button>

        </div>
        
        </>
    )
}


  