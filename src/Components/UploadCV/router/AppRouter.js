import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UploadCv from '../components/UploadCv';
import FilesList from '../components/FilesList';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={UploadCv} path="/uploadcv" exact={true} />
          <Route component={FilesList} path="/list" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
