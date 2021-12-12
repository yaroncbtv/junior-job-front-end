import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import JobsTabs from './JobsTabs'
import { useHistory } from "react-router-dom";
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import { postNewJobs } from '../Api/api';
import JobsNavBar from "./JobsNavBar"
import { JobHelper } from './Helper';

export default function BasicTextFields() {
    let history = useHistory();

    

    const pickPlan = () => {
      const jobToPublish = {
        userId: userInfo,
        type: jobsState,
        location: locationState,
        scope: scopeState,
        headLines: headLines,
        jobDescription: jobDescription,
        jobRequirements: jobRequirements,
        test: question,
        jobPlan: jobPlan
      }
      JobHelper.setJob(jobToPublish);
      history.push("/PayPal");
      
    }

    const publishJob = async () => {
      const jobToPublish = {
        userId: userInfo,
        type: jobsState,
        location: locationState,
        scope: scopeState,
        headLines: headLines,
        jobDescription: jobDescription,
        jobRequirements: jobRequirements,
        test: question,
        jobPlan: jobPlan
      }
      
       await postNewJobs(jobToPublish)
    }
  const [question] = useRecoilState(State.question);

  const [jobsState] = useRecoilState(State.jobs);
  const [locationState] = useRecoilState(State.location);
  const [scopeState] = useRecoilState(State.scope);
  const [userIsPayPublishJob] = useRecoilState(State.userIsPayPublishJob);
  const [jobPlan] = useRecoilState(State.jobPlan);

  const [userInfo] = useRecoilState(State.userInfo);
  
  const [headLines, setHeadLines] = useRecoilState(State.headLines);
  const [jobDescription, setJobDescription] = useRecoilState(State.jobDescription);
  const [jobRequirements, setJobRequirements] = useRecoilState(State.jobRequirements);

  
  let btnIsActive = true;
  if(locationState && scopeState && jobsState && headLines && jobDescription && jobRequirements){
    btnIsActive = false
  }

  const userIsPayPublishJobFlag =
  userIsPayPublishJob ? 
  <Button onClick={publishJob} variant="contained">Publish</Button> 
  :
  <Button disabled={btnIsActive} onClick={pickPlan} variant="contained">Pick A Plan</Button>

  return (
  <>
              <JobsNavBar />

  <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">Start your free trial today.</span>
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
        <div style={root}>
        <JobsTabs ButtonIsNeed={false}/>
        </div>
        <div style={root}>
        <h1>Add Job:</h1>
        </div>
        <div style={root}>
        <TextField 
        style={headLine} 
        id="outlined-basic" 
        label="HeadLine" 
        variant="outlined" 
        value={headLines} 
        onChange={e => setHeadLines(e.target.value)}
        />
        </div>
        <div style={root}>
        <TextField
          id="outlined-multiline-static"
          label="Job description"
          multiline
          rows={6}
          style={headLine}
          value={jobDescription} 
          onChange={e => setJobDescription(e.target.value)}
        />
        </div>
        <div style={root}>
        <TextField
          id="outlined-multiline-static"
          label="Job requirements"
          multiline
          rows={6}
          style={headLine}
          value={jobRequirements} 
          onChange={e => setJobRequirements(e.target.value)}
        />
        </div>
        <div style={root}>
        {/* onClick={GoToStepTo} */}

        {userIsPayPublishJobFlag}
        </div>
    </>  

  );
}


const root = {
    display:'flex', 
    justifyContent:'center', 
    flexWrap:'wrap', 
    alignItems:'center', 
    alignContent:'center', 
    margin:'30px'
}

const headLine = {
    margin:'10px',
    width:'500px'
}
