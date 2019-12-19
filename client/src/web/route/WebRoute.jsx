import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SelectQue from '../pages/startingPage/SelectQue';
import CreateQue from '../pages/createQue/CreateQue';
import Que from '../pages/que/Que';
import { CreateQueProvider } from '../context/CreateQueContext';
import { RoomProvider } from '../context/RoomContext';

export const WEB_PATH = {
  SELECT_QUE: '/',
  CREATE_QUE: '/create-que',
  QUE: '/questioner'
};
const WebRoute = () => {
  return (
    <CreateQueProvider>
      <RoomProvider>
        <Router>
          <Switch>
            <Route path={WEB_PATH.QUE}>
              <Que />
            </Route>
            <Route path={WEB_PATH.CREATE_QUE}>
              <CreateQue />
            </Route>
            <Route path={WEB_PATH.SELECT_QUE}>
              <SelectQue />
            </Route>
          </Switch>
        </Router>
      </RoomProvider>
    </CreateQueProvider>
  );
};

export default WebRoute;
