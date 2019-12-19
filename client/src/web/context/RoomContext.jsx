import React, { createContext, useState, useEffect } from 'react';
import { WEB_PATH } from '../route/WebRoute';
import { WEBSOCKETS, socket } from '../../api/socket';
import { useHistory } from 'react-router-dom';

export const GAME_STATUS = {
  WAITING: 'WAITING',
  IN_GAME: 'IN_GAME',
  FINISHED: 'FINISHED',
  SHOW_CORRECT: 'SHOW_CORRECT'
};

const initialRoomValues = {};

export const RoomContext = createContext(initialRoomValues);

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({});
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    socket.on(WEBSOCKETS.EVENTS.LISTEN.CREATE_ROOM_RESPONSE, data => {
      setRoom(data.newRoom, 'CREATE_ROOM_RESPONSE');
    });
    socket.on(WEBSOCKETS.EVENTS.LISTEN.GAME_STATUS_UPDATE, data => {
      setRoom(data);
      setShowCorrect(false);
    });
    socket.on(WEBSOCKETS.EVENTS.LISTEN.SHOW_CORRECT, () => {
      setShowCorrect(true);
    });
  }, []);

  return <RoomContext.Provider value={{ room, showCorrect }}>{children}</RoomContext.Provider>;
};
