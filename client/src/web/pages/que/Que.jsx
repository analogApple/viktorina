import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { BaseScreen, BaseText, BaseButton } from '../../../styles/BaseComponents';
import { socket, WEBSOCKETS } from '../../../api/socket';
import useTimer from '../../../common/hooks/useTimer';
import { RoomContext, GAME_STATUS } from '../../../common/context/RoomContext';
import { WEB_PATH } from '../../route/WebRoute';

const Que = () => {
  const { room, showCorrect } = useContext(RoomContext);
  const [showGameStartTimer, setShowGameStartTimer] = useState(false);
  const [showQuestionTimer, setShowQuestionTimer] = useState(false);

  const history = useHistory();

  const startGame = () => {
    socket.emit(WEBSOCKETS.EVENTS.EMIT.START_GAME, { roomId: room.id });
    setShowGameStartTimer(true);
  };

  const sortedPlayers =
    room.status === GAME_STATUS.FINISHED
      ? room.players.sort((a, b) => (a.points > b.points ? 1 : -1))
      : [];

  const refresh = () => {
    history.replace(WEB_PATH.SELECT_QUE);
    window.location.reload();
  };

  useEffect(() => {
    if (!showCorrect) {
      setShowQuestionTimer(true);
    } else {
      setShowQuestionTimer(false);
    }
  }, [showCorrect]);

  const ReturnComponents = () => {
    switch (room.status) {
      case GAME_STATUS.WAITING:
        return (
          <>
            <Title>Kambarys: {room.id}</Title>
            {!showGameStartTimer && (
              <BaseButton onClick={startGame}>Spauskite kad pradėti</BaseButton>
            )}
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
            <Title>{room.questionIndex + 1}. klausimas</Title>
            <Title>{room.currentQuestion.question}</Title>
            {room.currentQuestion.options.map((option, index) => (
              <ListItem key={index} isCorrect={option.isCorrect} showCorrect={showCorrect}>
                {index + 1}. {option.answer}
              </ListItem>
            ))}
            {showQuestionTimer && <QuestionTimer />}
          </>
        );
      case GAME_STATUS.FINISHED:
        return (
          <>
            <Title>SURINKTI TAŠKAI:</Title>
            {sortedPlayers.map(player => (
              <NameLabel color={player.color} key={player.id}>
                {player.name}: {player.points}
              </NameLabel>
            ))}
            <BaseButton onClick={refresh}>Kartoti!</BaseButton>
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
  font-weight: 600;
`;
const NameLabel = styled(BaseText)`
  color: ${({ color }) => color};
`;
const ListItem = styled.div`
  width: 30vw;
  height: 8vh;
  font-size: 5vh;
  align-items: center;

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
  padding: 1vh;
  margin: 16px;
`;

export default Que;

const GameStartTimer = () => {
  const gameStartTime = useTimer(10);

  return gameStartTime >= 0 ? <TimerLabel>{gameStartTime}</TimerLabel> : <></>;
};
const QuestionTimer = () => {
  const questionTimer = useTimer(60);

  return questionTimer >= 0 ? <TimerLabel>{questionTimer}</TimerLabel> : <></>;
};

const TimerLabel = styled(BaseText)`
  font-weight: 600;
  font-size: 10vh;
`;
