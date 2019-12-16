import { EVENTS, GAME_STATUS } from '../api/static';

export const onStartGame = (Socket, Room) => {
  Socket.client.on(EVENTS.LISTEN.START_GAME, data => {
    const roomData = Room.getRooms().filter(room => room.id === data.roomId)[0];
    playGame(roomData, Room);
  });

  const playGame = (roomData, Room) => {
    const qCount = roomData.questioner.questions.length;
    let currentQCount = 0;

    const updateData = () => {
      const room = Room.rooms.filter(room => room.id === roomData.id)[0];
      if (currentQCount === qCount) {
        Socket.socket.to(roomData.id).emit(EVENTS.EMIT.GAME_STATUS_UPDATE, {
          ...room,
          status: GAME_STATUS.FINISHED
        });
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
          Room.updateRoom(newRoomData);
        }
        setTimeout(() => {
          updateData();
        }, 14000);
        setTimeout(() => {
          Socket.socket.to(roomData.id).emit(EVENTS.EMIT.SHOW_CORRECT);
        }, 10000);
      }
    };
    setTimeout(() => updateData(), 3000);
  };
};
