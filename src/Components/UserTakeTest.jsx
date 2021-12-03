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
import JobsNavBar from "./JobsNavBar"
import Button from '@mui/material/Button';

export const UserTakeTest  = (props) => {
  const [userTest, setUserTest] = useRecoilState(State.userTest);
  const [userTakeTestCheckTestIsActive, setUserTakeTestCheckTestIsActive] = useRecoilState(State.userTakeTestCheckTestIsActive);

  const [isCheckedAnswerNumber1, setIsCheckedAnswerNumber1] = React.useState(false);
    const [isCheckedAnswerNumber2, setIsCheckedAnswerNumber2] = React.useState(false);
    const [isCheckedAnswerNumber3, setIsCheckedAnswerNumber3] = React.useState(false);
    const [isCheckedAnswerNumber4, setIsCheckedAnswerNumber4] = React.useState(false);
    const [disabledQuestion, setDisabledQuestion] = React.useState(false);
    
    const addArrData = () => {
      let questions = {
              questions: props.item,
              userAnswer:{
                  isCheckedAnswerNumber1:isCheckedAnswerNumber1,
                  isCheckedAnswerNumber2:isCheckedAnswerNumber2,
                  isCheckedAnswerNumber3:isCheckedAnswerNumber3,
                  isCheckedAnswerNumber4:isCheckedAnswerNumber4,
              }
              
          }
          setUserTest(userTest => [...userTest, questions]);
          setDisabledQuestion(true)
          setUserTakeTestCheckTestIsActive(userTakeTestCheckTestIsActive + 1);
  }
    return (
        <>

        <div >
      
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 350,
          height: 350,
          padding: '20px'
        },
      }}
      >
      
      <Paper elevation={3} >
      <FormGroup>
          <h5>Questions N.O -{props.index+1}-</h5>
          <h6>{props.item.questionNumber1}</h6>
            <FormControlLabel disabled={disabledQuestion} control={<Checkbox onClick={() => setIsCheckedAnswerNumber1( isCheckedAnswerNumber1 ? false : true)} checked={isCheckedAnswerNumber1}  />} label={props.item.answerNumber1} />
            <FormControlLabel disabled={disabledQuestion} control={<Checkbox onClick={() => setIsCheckedAnswerNumber2( isCheckedAnswerNumber2 ? false : true)} checked={isCheckedAnswerNumber2}/>} label={props.item.answerNumber2} />
            <FormControlLabel disabled={disabledQuestion} control={<Checkbox onClick={() => setIsCheckedAnswerNumber3( isCheckedAnswerNumber3 ? false : true)} checked={isCheckedAnswerNumber3} />} label={props.item.answerNumber3} />
            <FormControlLabel disabled={disabledQuestion} control={<Checkbox onClick={() => setIsCheckedAnswerNumber4( isCheckedAnswerNumber4 ? false : true)} checked={isCheckedAnswerNumber4} />} label={props.item.answerNumber4} />
            </FormGroup> 
            <Button disabled={disabledQuestion} onClick={addArrData} style={{margin:'10px'}} variant="contained">O.K</Button>

      </Paper>
      </Box>

             
          </div>
      
        </>
    )
}

const root = {
    display: 'flex',
    justifyContent:'center',
    //flexDirection: 'column'
    flexWrap: 'wrap'

  };

  const cube = {
    width:'400px',
    height:'400px',
    backgroundColor:'red',
    margin:'20px',
    padding:'20px' 
  };
  