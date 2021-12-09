import './App.css';
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { getCurrentUser, getUserData } from "./services/authServices";
import { useState, useEffect } from "react";
import {
  useRecoilState,
} from 'recoil';

import { Jobs } from './Components/Jobs'
import  NewJob  from './Components/NewJobs'
import  NewJobStepTow  from './Components/NewJobStepTow'
import  { UserProfile }  from './Components/UserProfile';
import { State } from './State/State';
import { getAllTypeLocPos } from './Api/api';
import { getAllJobs } from './Api/api';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import UploadCv from './Components/UploadCV/components/UploadCv';
import FilesList from './Components/UploadCV/components/FilesList';
import { TestJob } from './Components/TestJob';
import { TestJobField } from './Components/TestJobField';
import { UserTest } from './Components/UserTest';
import { PayPal } from './Components/PayPal';
import { MargeTestJob } from './Components/MargeTestJob';


function App() {

  const [userInfo, setUserInfo] = useRecoilState(State.userInfo);
  const [typelocpos, setTypelocpos] = useRecoilState(State.typelocpos);
  const [allJobs, setAllJobs] = useRecoilState(State.allJobs);

  useEffect(() => {
    async function fetchMyAPI() {
      const userData = await getUserData();
      //console.log(userData)
      await setUserInfo(userData);
      
      const allTypeLocPos = await getAllTypeLocPos();
      await setTypelocpos(allTypeLocPos)

      const allJobs = await getAllJobs();
      await setAllJobs(allJobs)
    }
    fetchMyAPI()
}, []);

  return (
    
    <div>
        <Router>
          <Switch>
          <Route path="/login">
              <Login />
            </Route>
            <Route path="/MargeTestJob">
              <MargeTestJob />
            </Route>
            <Route path="/testjob">
              <TestJob />
            </Route>
            <Route path="/PayPal">
              <PayPal />
            </Route>
            {/* <Route path="/TestJobField">
              <TestJobField />
            </Route> */}
            <Route path="/userTakeTest">
              <UserTest />
            </Route>
            <Route path="/uploadcv" >
                <UploadCv/>
            </Route>
            <Route path="/list">
              <FilesList />
            </Route>
            <Route path="/userprofile">
              <UserProfile />
            </Route>
            <Route path="/newjob/steptow">
              <NewJobStepTow />
            </Route>
            <Route path="/newjob">
              <NewJob />
            </Route>
            <Route path="/jobs">
              <Jobs />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
