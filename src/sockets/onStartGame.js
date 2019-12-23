import { EVENTS, GAME_STATUS } from './static';

export const onStartGame = (Socket, Rooms) => {
  Socket.client.on(EVENTS.LISTEN.START_GAME, data => {
    const roomData = Rooms.getRooms().filter(
      room => room.id === data.roomId
    )[0];
    playGame(roomData, Rooms);
  });

  const playGame = (roomData, Rooms) => {
    const qCount = roomData.questioner.questions.length;
    let currentQCount = 0;

    setTimeout(() => updateData(), 10000);

    const updateData = () => {
      const room = Rooms.getRooms().filter(room => room.id === roomData.id)[0];
      if (currentQCount === qCount) {
        Socket.socket.to(roomData.id).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, {
          ...room,
          status: GAME_STATUS.FINISHED
        });
        return;
      } else {
        Socket.socket.to(roomData.id).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, {
          ...room,
          status: GAME_STATUS.IN_GAME,
          showCorrect: false,
          currentQuestion: room.questioner.questions[currentQCount],
          question: currentQCount + 1,
          playersAnswered: []
        });
        if (currentQCount !== qCount) {
          const newRoomData = {
            ...room,
            currentQuestion: room.questioner.questions[currentQCount],
            question: currentQCount + 1,
            playersAnswered: []
          };
          currentQCount = currentQCount + 1;
          Rooms.updateRoom(newRoomData);
        }
        setTimeout(() => {
          updateData();
        }, 70000);
        setTimeout(() => {
          Socket.socket.to(roomData.id).emit(EVENTS.EMIT.SHOW_CORRECT);
        }, 60000);
      }
    };
  };
};
