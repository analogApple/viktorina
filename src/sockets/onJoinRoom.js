import { EVENTS, GAME_STATUS } from '../api/static';

export const onJoinRoom = (Socket, Rooms) => {
  Socket.client.on(EVENTS.LISTEN.JOIN_ROOM, data => {
    const room = Rooms.getRooms().filter(room => room.id === data.roomId)[0];
    if (room) {
      const isNameValid = !room.players.filter(player => player.name === data.name)[0];
      if (room.status === GAME_STATUS.WAITING) {
        if (isNameValid) {
          room.players.push({
            name: data.name,
            points: 0,
            color: data.playerColor,
            id: Socket.client.id
          });
          Socket.client.join(data.roomId);
          Socket.socket.to(data.roomId).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, { ...room });
        } else
          Socket.client.emit(EVENTS.EMIT.JOIN_ROOM_RESPONSE, {
            error: 'Toks vardas jau yra'
          });
      } else Socket.client.emit(EVENTS.JOIN_ROOM_RESPONSE, { error: 'Kambarys užimtas' });
    } else Socket.client.emit(EVENTS.EMIT.JOIN_ROOM_RESPONSE, { error: 'Kambarys nerastas' });
  });
};
