import React, { createContext, useState } from 'react';

const initialPlayerValues = {};

export const PlayerContext = createContext(initialPlayerValues);

export const PlayerProvider = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(null);
  const [name, setName] = useState('');

  return (
    <PlayerContext.Provider value={{ playerColor, setPlayerColor, name, setName }}>
      {children}
    </PlayerContext.Provider>
  );
};
