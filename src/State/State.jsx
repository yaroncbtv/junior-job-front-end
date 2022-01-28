import {
    atom,
  } from 'recoil';

export const State = {
    name: atom({
      key: 'name', 
      default: '', 
    }),
    email: atom({
        key: 'email', 
        default: '', 
      }),
    password: atom({
        key: 'password', 
        default: '', 
    }),
    password2: atom({
      key: 'password2', 
      default: '', 
    }),
    phone: atom({
      key: 'phone', 
      default: '', 
    }),
    error: atom({
      key: 'error', 
      default: {}, 
    }),
    userInfo:atom({
      key: 'userInfo', 
      default: {}, 
    }),
    logOutFlag:atom({
      key: 'logOutFlag', 
      default: false, 
    }),
    modal:atom({
      key: 'Modal', 
      default: false, 
    }),
    typelocpos:atom({
      key: 'typelocpos', 
      default: [], 
    }),
    jobs:atom({
      key: 'jobs', 
      default: '', 
    }),
    location:atom({
      key: 'location', 
      default: '', 
    }),
    scope:atom({
      key: 'scope', 
      default: '', 
    }),
    headLines:atom({
      key: 'headLines', 
      default: '', 
    }),
    jobDescription:atom({
      key: 'jobDescription', 
      default: '', 
    }),
    jobRequirements:atom({
      key: 'jobRequirements', 
      default: '', 
    }),
    allJobs:atom({
      key: 'allJobs', 
      default: [], 
    }),
    question:atom({
      key: 'question', 
      default: [], 
    }),
    jobsTabsBtn:atom({
      key: 'jobsTabsBtn', 
      default: false, 
    }),
    userTakeTest:atom({
      key: 'userTakeTest', 
       
    }),
    userTest:atom({
      key: 'userTest', 
      default: [], 
    }),
    userIsPayPublishJob:atom({
      key: 'userIsPayPublishJob', 
      default: false, 
    }),
    jobPlan:atom({
      key: 'jobPlan', 
      default: '', 
    }),
    testJobsIsActive:atom({
      key: 'testJobsIsActive', 
      default: true, 
    }),
    testJobsIsActiveNumOfQ:atom({
      key: 'testJobsIsActiveNumOfQ', 
      default: 0, 
    }),
    userTakeTestCheckTestIsActive:atom({
      key: 'userTakeTestCheckTestIsActive', 
      default: 0, 
    }),
    userFavoriteJobs:atom({
      key: 'userFavoriteJobs', 
      default: [], 
    }),
    btnSearch:atom({
      key: 'btnSearch', 
      default: 'Search', 
    }),
}

