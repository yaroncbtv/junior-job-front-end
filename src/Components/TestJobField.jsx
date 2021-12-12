import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {
    useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const TestJobField = (props) => {
    const [,setQuestion] = useRecoilState(State.question);
    const [testJobsIsActiveNumOfQ, setTestJobsIsActiveNumOfQ] = useRecoilState(State.testJobsIsActiveNumOfQ);

    const [questionNumber1, setQuestionNumber1] = React.useState("");
    const [answerNumber1, setAnswerNumber1] = React.useState("");
    const [answerNumber2, setAnswerNumber2] = React.useState("");
    const [answerNumber3, setAnswerNumber3] = React.useState("");
    const [answerNumber4, setAnswerNumber4] = React.useState("");

    const [isCheckedAnswerNumber1, setIsCheckedAnswerNumber1] = React.useState(false);
    const [isCheckedAnswerNumber2, setIsCheckedAnswerNumber2] = React.useState(false);
    const [isCheckedAnswerNumber3, setIsCheckedAnswerNumber3] = React.useState(false);
    const [isCheckedAnswerNumber4, setIsCheckedAnswerNumber4] = React.useState(false);
    
    const [errMesIsActive, setErrMesIsActive] = React.useState(false);  
    const [errMes, setErrMes] = React.useState('');  
    const [disabledQuestion, setDisabledQuestion] = React.useState(false);

const addArrData = () => {
    setErrMesIsActive(false);
    setErrMes('');
    if(questionNumber1 === "" || answerNumber1 === "" || answerNumber2 === "" || answerNumber3 === "" || answerNumber4 === ""){
        setErrMes('all Fielde Is required!');
        setErrMesIsActive(true);
    }

    else if(!isCheckedAnswerNumber1 && !isCheckedAnswerNumber2 && !isCheckedAnswerNumber3 && !isCheckedAnswerNumber4){
        setErrMes('you must pick 1 checked');
        setErrMesIsActive(true);
    }

    else{
        let questions = {
            questionNO: props.questionNO,
            questionNumber1:questionNumber1,
            answerNumber1:answerNumber1,
            answerNumber2:answerNumber2,
            answerNumber3:answerNumber3,
            answerNumber4:answerNumber1,
            isCheckedAnswerNumber1:isCheckedAnswerNumber1,
            isCheckedAnswerNumber2:isCheckedAnswerNumber2,
            isCheckedAnswerNumber3:isCheckedAnswerNumber3,
            isCheckedAnswerNumber4:isCheckedAnswerNumber4,
        }
    
    setQuestion(question => [...question, questions]);
    setDisabledQuestion(true)
    setTestJobsIsActiveNumOfQ(testJobsIsActiveNumOfQ + 1)
    }
}
  const errIsActive = errMesIsActive ? <Snackbar
  anchorOrigin={{vertical:'bottom', horizontal:'center' }}
  open={errMesIsActive}
  //onClose={handleClose}
  //key={vertical + horizontal}
>
  <MuiAlert severity="error" elevation={6} variant="filled"  >{errMes}</MuiAlert>
</Snackbar> : null;
    return (
        <>
            <div style={root}>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 350,
                            height: 400,
                            padding: '20px'
                        },
                    }}
                >
                    <Paper elevation={3} >

                        <FormGroup>
                            <h5>Question N.O -{props.questionNO}-</h5>

                            <TextField 
                            disabled={disabledQuestion}
                            value={questionNumber1} onChange={e => setQuestionNumber1(e.target.value)}
                            id="standard-basic" label="Question" variant="standard" />
                            <div style={{ display: 'flex', }}>
                                <Checkbox disabled={disabledQuestion} onClick={() => setIsCheckedAnswerNumber1( isCheckedAnswerNumber1 ? false : true)} checked={isCheckedAnswerNumber1} />
                                <TextField
                                    disabled={disabledQuestion}
                                    value={answerNumber1} onChange={e => setAnswerNumber1(e.target.value)}
                                    style={{ flexGrow: '4' }} id="standard-basic" label="Answer N.O -1-" variant="standard" />
                            </div>
                            <div style={{ display: 'flex', }}>
                                <Checkbox disabled={disabledQuestion}  onClick={() => setIsCheckedAnswerNumber2( isCheckedAnswerNumber2 ? false : true)} checked={isCheckedAnswerNumber2} />
                                <TextField 
                                disabled={disabledQuestion}
                                value={answerNumber2} onChange={e => setAnswerNumber2(e.target.value)}
                                style={{ flexGrow: '4' }} id="standard-basic" label="Answer N.O -2-" variant="standard" />
                            </div>
                            <div style={{ display: 'flex', }}>
                                <Checkbox disabled={disabledQuestion} onClick={() => setIsCheckedAnswerNumber3( isCheckedAnswerNumber3 ? false : true)} checked={isCheckedAnswerNumber3} />
                                <TextField 
                                disabled={disabledQuestion}
                                value={answerNumber3} onChange={e => setAnswerNumber3(e.target.value)}
                                style={{ flexGrow: '4' }} id="standard-basic" label="Answer N.O -3-" variant="standard" />
                            </div>
                            <div style={{ display: 'flex', }}>
                                <Checkbox disabled={disabledQuestion} onClick={() => setIsCheckedAnswerNumber4( isCheckedAnswerNumber4 ? false : true)} checked={isCheckedAnswerNumber4} />
                                <TextField 
                                disabled={disabledQuestion}
                                value={answerNumber4} onChange={e => setAnswerNumber4(e.target.value)}
                                style={{ flexGrow: '4' }} id="standard-basic" label="Answer N.O -4-" variant="standard" />
                            </div>
                            <Button disabled={disabledQuestion} onClick={addArrData} style={{margin:'10px'}} variant="contained">O.K</Button>
                            <span>Please click on right answer..</span>
                        </FormGroup>
                        

                    </Paper>
                </Box>

                    {errIsActive}

            </div>
        </>
    )
}

const root = {
    display: 'flex',
    justifyContent: 'center',
    //flexDirection: 'column'
    flexWrap: 'wrap'

};


