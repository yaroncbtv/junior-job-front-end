import React from 'react';
import Box from '@mui/material/Box';
import UploadCv from './UploadCV/components/UploadCv'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './UploadCV/components/Header';
import HrTable from './HrTable';
import TextField from '@mui/material/TextField';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import UploadFile from './UploadFile';
import JobsNavBar from "./JobsNavBar"
import Button from '@mui/material/Button';
import { updateUser } from '../Api/api';
export const UserProfile = () => {


  const [userInfo, setUserInfo] = useRecoilState(State.userInfo);

  const [email, setEmail] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [tel, setTel] = React.useState('')

  const onClickUpdate = async () => {

    const data = {
      userInfo,
      updateUserInfo: {
        email,
        userName,
        tel
      }
    }

    const res = await updateUser(data)
  }

  React.useEffect(() => {
    setEmail(userInfo.email);
    setUserName(userInfo.name);
    setTel(userInfo.phone);
  }, [userInfo]);

  return (
    <>
      <JobsNavBar />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">{"<Junior>"}</span>
            <span className="block text-indigo-600">User Profile</span>
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
        <TextField value={email} onChange={e => setEmail(e.target.value)} style={space} id="outlined-basic" label="Email" variant="outlined" />
        <TextField value={userName} onChange={e => setUserName(e.target.value)} style={space} id="outlined-basic" label="User Name" variant="outlined" />
        <TextField value={tel} onChange={e => setTel(e.target.value)} style={space} id="outlined-basic" label="Tel" variant="outlined" />
        <form>
          <Button type="submit" onClick={onClickUpdate} style={{ backgroundColor: '#8A2BE2', color: 'white' }} color="inherit">{"Update"}</Button>
        </form>
        {/* <UploadFile/> */}

      </div>
      <div style={root}>
        <HrTable></HrTable>
      </div>
      {/* <div className="container">
      <Row className="justify-content-md-center">
    <Col xs lg="5">
    <Header />
     

    </Col>
    </Row>
      
    </div>
    <div className="main-content">
     
      </div> */}
    </>
  )
}

const root = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  margin: '30px'
}
const space = {
  margin: '10px',
  width: '300px'
}