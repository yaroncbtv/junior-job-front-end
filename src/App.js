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

import {  getUserData } from "./services/authServices";
import {  useEffect } from "react";
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
import { UserTest } from './Components/UserTest';
import { PayPal } from './Components/PayPal';
import { MargeTestJob } from './Components/MargeTestJob';
import { HrTableInfo } from './Components/HrTableInfo';

function App() {

  const [, setUserInfo] = useRecoilState(State.userInfo);
  const [, setTypelocpos] = useRecoilState(State.typelocpos);
  const [, setAllJobs] = useRecoilState(State.allJobs);

 

  useEffect(() => {

    const fetchMyAPI = async () => {
      const userData = await getUserData();
      //console.log(userData)
      await setUserInfo(userData);
      
      const allTypeLocPos = await getAllTypeLocPos();
      await setTypelocpos(allTypeLocPos)

      const allJobs = await getAllJobs();
      await setAllJobs(allJobs)
    }
     
    fetchMyAPI()
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Route path="/HrTableInfo">
              <HrTableInfo />
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
