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
    setTimeout(() => updateData(), 1000);
    console.log(roomData, qCount);
    const updateData = () => {
      const room = Rooms.getRooms().filter(item => item.id === roomData.id)[0];
      if (room) {
        if (room.questionIndex === qCount) {
          Socket.socket.to(room.id).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, {
            ...room,
            status: GAME_STATUS.FINISHED
          });
          return;
        } else {
          Socket.socket.to(room.id).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, {
            ...room,
            status: GAME_STATUS.IN_GAME,
            showCorrect: false,
            currentQuestion: room.questioner.questions[room.questionIndex],
            questionIndex: room.questionIndex + 1,
            playersAnswered: []
          });

          const newRoom = {
            ...room,
            currentQuestion: room.questioner.questions[room.questionIndex],
            questionIndex: room.questionIndex + 1,
            playersAnswered: []
          };

          Rooms.updateRoom(newRoom);
          setTimeout(() => {
            updateData();
          }, 11000);
          setTimeout(() => {
            Socket.socket.to(room.id).emit(EVENTS.EMIT.SHOW_CORRECT);
          }, 10000);
        }
      }
    };
  };
};
