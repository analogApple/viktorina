import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FindRoom from '../pages/findRoom/FindRoom';
import { PlayerProvider } from '../context/PlayerContext';
import Game from '../pages/game/Game';

export const MOBILE_PATH = {
  HOME: '/',
  GAME: '/game'
};
const MobileRoute = () => {
  return (
    <PlayerProvider>
      <Router>
        <Switch>
          <Route path={MOBILE_PATH.GAME}>
            <Game />
          </Route>
          <Route path={MOBILE_PATH.HOME}>
            <FindRoom />
          </Route>
        </Switch>
      </Router>
    </PlayerProvider>
  );
};

export default MobileRoute;
