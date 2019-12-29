import socketIo from 'socket.io-client';

const host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4000' : undefined;

export const socket = socketIo(host);

export const WEBSOCKETS = {
  EVENTS: {
    EMIT: {
      GET_QUE_LIST: 'GET_QUE_LIST',
      ADD_QUE: 'ADD_QUE',
      CREATE_ROOM: 'CREATE_ROOM',
      START_GAME: 'START_GAME',
      JOIN_ROOM: 'JOIN_ROOM',
      SUBMIT_ANSWER: 'SUBMIT_ANSWER'
    },
    LISTEN: {
      CONNECTION: 'connection',
      DISCONNECT: 'disconnect',
      GET_QUE_LIST_RESPONSE: 'GET_QUE_LIST_RESPONSE',
      CREATE_ROOM_RESPONSE: 'CREATE_ROOM_RESPONSE',
      GAME_STATUS_UPDATE: 'GAME_STATUS_UPDATE',
      JOIN_ROOM_RESPONSE: 'JOIN_ROOM_RESPONSE',
      SHOW_CORRECT: 'SHOW_CORRECT'
    }
  }
};
