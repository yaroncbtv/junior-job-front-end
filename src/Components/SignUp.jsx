/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import { State } from '../State/State';
import {
  useRecoilState,
} from 'recoil';
import { registerUser } from '../Api/api'
import { useHistory } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SignUp() {

  const [name, setName] = useRecoilState(State.name);
  const [email, setEmail] = useRecoilState(State.email);
  const [password, setPassword] = useRecoilState(State.password);
  const [password2, setPassword2] = useRecoilState(State.password2);
  const [phone, setPhone] = useRecoilState(State.phone);
  const [errors] = useRecoilState(State.error);
  const [error, setError] = React.useState(false);
  const [errorMes, setErrorMes] = React.useState('');
  const [succses, setSuccses] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  let history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    setErrorMes('')
    setError(false);
    if(name && email && phone && password && password2 && selected !== ''){
      const dataTosend = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        password2: password2,
        userType: selected
      }
        const data = await registerUser(dataTosend)

        if(data.isSucsses){
          setTimeout(function(){ 
            history.push("/login");
           }, 1000);
           setError(false);
           setSuccses(true)
           
        }else{
          const { email, password ,password2 } = data.resp;
          console.log(data.resp)
          if(email) setErrorMes(email + '\n');
          if(password) setErrorMes(password + '\n');
          if(password2) setErrorMes(password2 + '\n');
          setError(true);
        }
    }else{
      setErrorMes('All felde is requird !')
      setError(true);
    }

   
    
    // setEmail("");
    // setPassword("")
    // setName("")
    // setPassword2("") 
    // setErrors("")
  }

  const handleChange = ev => {
    setSelected( ev.target.value );
    
  };
  
  const userIsSignup = <Snackbar
  anchorOrigin={{vertical:'bottom', horizontal:'center' }}
  open={succses}
  //onClose={handleClose}
  //key={vertical + horizontal}
>
  <MuiAlert severity="success" elevation={6} variant="filled"  >User Create Succsesfuly !</MuiAlert>
</Snackbar>
  const userIsSignUpError = <Snackbar
  anchorOrigin={{vertical:'bottom', horizontal:'center' }}
  open={error}
  //onClose={handleClose}
  //key={vertical + horizontal}
>
  <MuiAlert severity="error" elevation={6} variant="filled"  >{errorMes}</MuiAlert>
</Snackbar>

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{"Register to <Jonior>"}</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>
        <div >
        <FormControl component="fieldset">
      <FormLabel component="legend">Choose what you want to do</FormLabel>
      <RadioGroup onChange={handleChange} value={selected} row aria-label="Choose what you want to do" name="row-radio-buttons-group">
        <FormControlLabel  value="1" control={<Radio />} label="Looking for a job" />
        <FormControlLabel value="2" control={<Radio />} label="Post a job" />   
      </RadioGroup>
    </FormControl>
        </div>
        <form className="mt-8 space-y-6" >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
              {/* <label htmlFor="email-address" className="sr-only">
                Email address
              </label> */}
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your name"
                value={name} 
                onChange={e => setName(e.target.value)}
                error={errors.name}
              />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
              />
              {/* <label htmlFor="password" className="sr-only">
                Password
              </label> */}
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="current-phone"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                error={errors.phone}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password2} 
                onChange={e => setPassword2(e.target.value)}
                error={errors.password2}
              />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              /> */}
              {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember mes
              </label> */}
            </div>

            <div className="text-sm">
              <a href="#/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClick}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Register
            </button>
          </div>
        </form>
        {userIsSignup}
        {userIsSignUpError}
      </div>
    </div>
    </div>
  )
}
