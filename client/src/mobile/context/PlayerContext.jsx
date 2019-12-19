import React, { createContext, useState } from 'react';
import { socket, WEBSOCKETS } from '../../api/socket';
import { MOBILE_PATH } from '../route/MobileRoute';

const initialPlayerValues = {};

export const PlayerContext = createContext(initialPlayerValues);

export const PlayerProvider = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(null);

  return (
    <PlayerContext.Provider value={{ playerColor, setPlayerColor }}>
      {children}
    </PlayerContext.Provider>
  );
};
