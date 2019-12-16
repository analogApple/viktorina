import socketIo from 'socket.io';
import { EVENTS } from '../api/static';
import { onDisconnect } from './onDisconnect';
import { onJoinRoom } from './onJoinRoom';
import { onCreateRoom } from './onCreateRoom';
import { onGetQue } from './onGetQue';
import { onAddQue } from './onAddQue';
import { onStartGame } from './onStartGame';
import { onSubmitAnswer } from './onSubmitAnswer';

const main = server => {
  const Rooms = {
    rooms: [],
    getRooms: () => Rooms.rooms,
    addRoom: room => Rooms.rooms.push(room),
    setRooms: rooms => (Rooms.rooms = rooms),
    updateRoom: newRoom =>
      (Rooms.rooms = Rooms.rooms.map(room => {
        if (room.id === newRoom.id) {
          return { ...newRoom };
        }
      }))
  };

  const socket = socketIo(server);

  socket.on(EVENTS.LISTEN.CONNECTION, client => {
    const Socket = {
      socket: socket,
      client: client
    };
    onGetQue(Socket);
    onAddQue(Socket);
    onCreateRoom(Socket, Rooms);
    onJoinRoom(Socket, Rooms);
    onStartGame(Socket, Rooms);
    onDisconnect(Socket, Rooms);
    onSubmitAnswer(Socket, Rooms);
  });
};

export default main;
