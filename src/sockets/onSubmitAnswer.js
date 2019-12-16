import { EVENTS } from '../api/static';

export const onSubmitAnswer = (Socket, Rooms) => {
  Socket.client.on(EVENTS.LISTEN.SUBMIT_ANSWER, data => {
    const room = Rooms.getRooms().filter(room => {
      return room.id === data.roomId;
    })[0];
    if (room) {
      const player = room.players.filter(player => player.id === Socket.client.id);
      if (player) {
        if (room.currentQuestion.options[data.optionIndex].isCorrect) {
          const playersAnswered = room.playersAnswered.length;
          const getPointsToGive = () => {
            if (playersAnswered === 0) {
              return 8;
            } else if (playersAnswered === 1) {
              return 7;
            } else if (playersAnswered === 2) {
              return 6;
            } else {
              return 5;
            }
          };
          const players = room.players.map(player => {
            if (player.id === Socket.client.id) {
              return { ...player, points: getPointsToGive() };
            }
          });
          room.players = players;
          Socket.client.emit(EVENTS.EMIT.SUBMIT_ANSWER_RESPONSE, { points: player.points });
          Rooms.updateRoom(room);
        }
      }
    }
  });
};
