const GAME_STATUS = {
  WAITING: 'WAITING',
  IN_GAME: 'IN_GAME',
  FINISHED: 'FINISHED'
};

const EVENTS = {
  LISTEN: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    GET_QUE_LIST: 'GET_QUE_LIST',
    ADD_QUE: 'ADD_QUE',
    GET_SINGLE_QUE: 'GET_SINGLE_QUE',
    CREATE_ROOM: 'CREATE_ROOM',
    JOIN_ROOM: 'JOIN_ROOM',
    START_GAME: 'START_GAME',
    SUBMIT_ANSWER: 'SUBMIT_ANSWER'
  },
  EMIT: {
    GET_QUE_LIST_RESPONSE: 'GET_QUE_LIST_RESPONSE',
    ADD_QUE_RESPONSE: 'ADD_QUE_RESPONSE',
    GET_SINGLE_QUE_RESPONSE: 'GET_SINGLE_QUE_RESPONSE',
    CREATE_ROOM_RESPONSE: 'CREATE_ROOM_RESPONSE',
    JOIN_ROOM_RESPONSE: 'JOIN_ROOM_RESPONSE',
    GAME_STATUS_UPDATE: 'GAME_STATUS_UPDATE',
    SHOW_CORRECT: 'SHOW_CORRECT',
    SUBMIT_ANSWER_RESPONSE: 'SUBMIT_ANSWER_RESPONSE'
  }
};

export { GAME_STATUS, EVENTS };
