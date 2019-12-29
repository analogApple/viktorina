import Questioners from '../models/Que';
import { EVENTS, GAME_STATUS } from './static';

export const onCreateRoom = (Socket, Rooms) => {
  Socket.client.on(EVENTS.LISTEN.CREATE_ROOM, data => {
    const room = createRoom(Socket.client.id);
    Questioners.find({ _id: data.id }, (err, que) => {
      room.questioner = que[0];
      Rooms.addRoom(room);
      Socket.client.emit(EVENTS.EMIT.CREATE_ROOM_RESPONSE, {
        newRoom: { ...room }
      });
      Socket.client.join(room.id);
    });
  });
};

const createRoom = clientId => ({
  id: clientId.slice(-6).toUpperCase(),
  hostId: clientId,
  players: [],
  questioner: null,
  status: GAME_STATUS.WAITING,
  questionIndex: 0,
  currentQuestion: null,
  playersAnswered: []
});
