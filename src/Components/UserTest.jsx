import { padding } from "@mui/system";
import * as React from 'react';
import { useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import JobsNavBar from "./JobsNavBar";
import { UserTakeTest } from './UserTakeTest';
import Button from '@mui/material/Button';
import { userPassTestSendEmailTo } from '../Api/api';
import { saveUserInJobTest } from '../Api/api';

export const UserTest  = (props) => {
    const [userTakeTest] = useRecoilState(State.userTakeTest);
    const [userInfo] = useRecoilState(State.userInfo);
    const [userTest, setUserTest] = useRecoilState(State.userTest);
    const [userTakeTestCheckTestIsActive] = useRecoilState(State.userTakeTestCheckTestIsActive);
    let resultTest;
  if(userTakeTest){
    resultTest =  userTakeTest.test.map(function (item, i) {
      return(
        <UserTakeTest index={i} key={i} item={item}/>
      )

    })

  }
const checkTest = async () => {

    let error = 0;
    let success = 0;
    let numberOfQuestion = 0;
    userTest.map(function (item, i) {
        numberOfQuestion++;
        if(
            item.questions.isCheckedAnswerNumber1 === item.userAnswer.isCheckedAnswerNumber1 &&
            item.questions.isCheckedAnswerNumber2 === item.userAnswer.isCheckedAnswerNumber2 &&
            item.questions.isCheckedAnswerNumber3 === item.userAnswer.isCheckedAnswerNumber3 &&
            item.questions.isCheckedAnswerNumber4 === item.userAnswer.isCheckedAnswerNumber4 
            )
            success++;
        else
        error++;
  
      })

      const data = {
        fromUserPassTest: userInfo,
        toPublishJob: userTakeTest.userId
      }
      const datajob = {
        fromUserPassTest: userInfo,
        toPublishJob: userTakeTest
      }

      if(success === numberOfQuestion){
        
        await userPassTestSendEmailTo(data);
        await saveUserInJobTest(datajob);
        console.log("User Pass The Test")


      } else{
        await saveUserInJobTest(datajob);
      }

      console.log("error -> " + error + " " + "success -> " + success);

}


const thankYou = <h5 style={{marginTop:'50px'}}>Thank You!</h5>

let checkBtnIsActive = true;
if(userTakeTest){
    if(userTakeTestCheckTestIsActive === userTakeTest.test.length){
      checkBtnIsActive = false;
    }
  }
 
    return (
        <>
                 <JobsNavBar />

<div className="bg-gray-50">
<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
  <span className="block">Let's do a short test before I submit your resume</span>
  <span className="block text-indigo-600">Show me all your abilities</span>
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
<div style={{ display: 'flex',flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent:'center'}}>


{resultTest ? resultTest : thankYou}


</div>
<div style={{ display: 'flex',flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent:'center'}}>
  <form action="/userTakeTest">
  {resultTest ? <Button disabled={checkBtnIsActive} type="submit" onClick={checkTest} style={{margin:'10px'}} variant="contained">check test and send CV</Button> : null}
  
  </form>
{/* {resultTest ? <Button disabled={checkBtnIsActive} type="submit" onClick={checkTest} style={{margin:'10px'}} variant="contained">check test and send CV</Button> : null} */}
</div>

        </>
    )
       
    
}