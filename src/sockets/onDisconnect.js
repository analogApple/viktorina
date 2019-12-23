import { EVENTS } from './static';

export const onDisconnect = (Socket, Rooms) => {
  Socket.client.on(EVENTS.LISTEN.DISCONNECT, () => {
    const roomId = Socket.client.id.slice(-6).toUpperCase();
    const newRooms = Rooms.getRooms().filter(room => {
      return room.id !== roomId;
    });
    Rooms.setRooms(newRooms);
  });
};
