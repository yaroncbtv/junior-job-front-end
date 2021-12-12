
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom";
import JobsNavBar from "./JobsNavBar"
import {
    useRecoilState,
  } from 'recoil';
  import { State } from '../State/State';
  import { postNewJobs } from '../Api/api';





export const PayPalBtn = (props) => {
    
    const [question] = useRecoilState(State.question);

  const [jobsState] = useRecoilState(State.jobs);
  const [locationState] = useRecoilState(State.location);
  const [scopeState] = useRecoilState(State.scope);
  const [jobPlan] = useRecoilState(State.jobPlan);

  const [userInfo] = useRecoilState(State.userInfo);
  
  const [headLines] = useRecoilState(State.headLines);
  const [jobDescription] = useRecoilState(State.jobDescription);
  const [jobRequirements] = useRecoilState(State.jobRequirements);

    const [, setUserIsPayPublishJob] = useRecoilState(State.userIsPayPublishJob);
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    

    const createOrder = (data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: props.price,
              },
            },
          ],
          
        });
      };

      const onApprove = async (data, actions) => {
        setUserIsPayPublishJob(true);
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
        window.location = "/jobs";
        
        return actions.order.capture();
      };
    
    return (
        <div style={{marginTop:'50px'}}>
            <div>
            <h5 style={{display:'flex', justifyContent:'center'}}>Click To Pay</h5>
            </div>
            
            
            <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
        </div>
    )

}



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Junior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function PayPalContent() {
    
    const [jobPlan, setJobPlan] = useRecoilState(State.jobPlan);
    const [ planNumber1, setPlanNumber1 ] = React.useState(false);
    const [ planNumber2, setPlanNumber2 ] = React.useState(false);
    const [ planNumber3, setPlanNumber3 ] = React.useState(false);
    const [ price, setPrice ] = React.useState('0');
    const [question] = useRecoilState(State.question);

    const [jobsState] = useRecoilState(State.jobs);
    const [locationState] = useRecoilState(State.location);
    const [scopeState] = useRecoilState(State.scope);
  
    const [userInfo] = useRecoilState(State.userInfo);
    
    const [headLines] = useRecoilState(State.headLines);
    const [jobDescription] = useRecoilState(State.jobDescription);
    const [jobRequirements,] = useRecoilState(State.jobRequirements);
  
      const [, setUserIsPayPublishJob] = useRecoilState(State.userIsPayPublishJob);
    const freePlan = async () => {
        setUserIsPayPublishJob(true);
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
         window.location = "/jobs";
    }


    const tiers = [
        {
          title: 'Free',
          price: '0',
          description: [
            '3 day included',
            'Help center access',
            'Email support',
          ],
          buttonText: 'I What This Plan!',
          buttonVariant: 'contained',
          planNumber: 1,
          isActiv: planNumber1,
          numOfDay: '/3 day'
        },
        {
          title: 'Pro',
          subheader: 'Most popular',
          price: '15',
          description: [
            '2 week included',
            'Help center access',
            'Priority email support',
          ],
          buttonText: 'I What This Plan!',
          buttonVariant: 'contained',
          planNumber: 2,
          isActiv: planNumber2,
          numOfDay: '/2 week'
        },
        {
          title: 'Enterprise',
          price: '30',
          description: [
            '1 month included',
            'Help center access',
            'Phone & email support',
          ],
          buttonText: 'I What This Plan!',
          buttonVariant: 'contained',
          planNumber: 3,
          isActiv: planNumber3,
          numOfDay: '/1 month'
          
        },
      ];
      
      
    const onClickPlanNumber = (tier) => {
            
            if(tier.planNumber === 1){
                setPlanNumber1(true)
                setPlanNumber2(false)
                setPlanNumber3(false)
                setPrice(tier.price)
                setJobPlan('1')
            }
            if(tier.planNumber === 2){
                setPlanNumber1(false)
                setPlanNumber2(true)
                setPlanNumber3(false)
                setPrice(tier.price)
                setJobPlan('2')
            }
            if(tier.planNumber === 3){
                setPlanNumber1(false)
                setPlanNumber2(false)
                setPlanNumber3(true)
                setPrice(tier.price)
                setJobPlan('3')
            }
            
    }

    const paypalBtn = jobPlan ? !planNumber1 ? 
    <div style={{display:'flex', justifyContent:'center'}}>
    <PayPalBtn price={price} variant='contained'>Checkout</PayPalBtn>
    </div>
    :<div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Button onClick={freePlan} variant='contained'>Publish Job</Button></div>: null
  return (
    <React.Fragment>
        <JobsNavBar/>
        <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{"<Junior>"}</span>
          <span className="block text-indigo-600">Final Step</span>
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
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default MUI components with little
          customization.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card >
                <CardHeader
                  style={ tier.isActiv ?  { backgroundColor:'#3D9970'} : null}
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent style={ tier.isActiv ?  { backgroundColor:'#3D9970'} : null}>
                  <Box
                  
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {tier.numOfDay}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions style={ tier.isActiv ?  { backgroundColor:'#3D9970'} : null}>
                  <Button onClick={() => onClickPlanNumber(tier)} fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
                        
        {paypalBtn}
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export const PayPal = () => {
  return <PayPalContent />;
}