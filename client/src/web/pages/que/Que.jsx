import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BaseScreen, BaseText, BaseButton } from '../../../styles/BaseComponents';
import { RoomContext, GAME_STATUS } from '../../context/RoomContext';
import { socket, WEBSOCKETS } from '../../../api/socket';
import useTimer from '../../../utils/hooks/useTimer';

const Que = () => {
  const { room, showCorrect } = useContext(RoomContext);
  const [showGameStartTimer, setShowGameStartTimer] = useState(false);

  const startGame = () => {
    socket.emit(WEBSOCKETS.EVENTS.EMIT.START_GAME, { roomId: room.id });
    setShowGameStartTimer(true);
  };

  const sortedPlayers =
    room.status === GAME_STATUS.FINISHED
      ? room.players.sort((a, b) => (a.points > b.points ? 1 : -1))
      : [];

  const ReturnComponents = () => {
    switch (room.status) {
      case GAME_STATUS.WAITING:
        return (
          <>
            <Title>Kambarys: {room.id}</Title>
            {!showGameStartTimer && <Button onClick={startGame}>Spauskite kad pradėti</Button>}
            {room.players.map(player => (
              <NameLabel color={player.color} key={player.name}>
                {player.name}
              </NameLabel>
            ))}
            {showGameStartTimer && <GameStartTimer />}
          </>
        );
      case GAME_STATUS.IN_GAME:
        return (
          <>
            <Title>{room.questionNumber}. klausimas</Title>
            <Title>{room.currentQuestion.question}</Title>
            {room.currentQuestion.options.map((option, index) => (
              <ListItem key={index} isCorrect={option.isCorrect} showCorrect={showCorrect}>
                {index + 1}. {option.answer}
              </ListItem>
            ))}
          </>
        );
      case GAME_STATUS.FINISHED:
        return (
          <>
            <Title>SURINKTI TASKAI:</Title>
            {sortedPlayers.map(player => (
              <NameLabel color={player.color} key={player.id}>
                {player.name}: {player.points}
              </NameLabel>
            ))}
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Background>
      <ReturnComponents />
    </Background>
  );
};

const Background = styled(BaseScreen)``;
const Title = styled(BaseText)`
  font-size: 24px;
  font-weight: 600;
`;
const NameLabel = styled(BaseText)`
  font-size: 16px;
  color: ${({ color }) => color};
`;
const ListItem = styled.div`
  width: 300px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  ${props => {
    if (props.showCorrect) {
      if (props.isCorrect) {
        return '  border-bottom: 3px solid green;  border-left: 3px solid green;';
      } else {
        return '  border-bottom: 3px solid red;  border-left: 3px solid red;';
      }
    }
  }}
  border-radius: 50px;
  padding: 8px;
  margin: 16px;
`;
const Button = styled(BaseButton)``;

export default Que;

const GameStartTimer = () => {
  const gameStartTime = useTimer(10);

  return gameStartTime >= 0 ? <TimerLabel>{gameStartTime}</TimerLabel> : <></>;
};
const TimerLabel = styled(BaseText)`
  font-size: 24px;
  font-weight: 600;
`;
