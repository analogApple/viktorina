import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseScreen, BaseText, BaseButton } from '../../../styles/BaseComponents';
import { socket, WEBSOCKETS } from '../../../api/socket';
import { useHistory } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { RoomContext, GAME_STATUS } from '../../../common/context/RoomContext';
import { WEB_PATH } from '../../../web/route/WebRoute';
import { PlayerContext } from '../../context/PlayerContext';

const Game = () => {
  const { room, showCorrect } = useContext(RoomContext);
  const { playerColor, name } = useContext(PlayerContext);
  const history = useHistory();
  const [chosenOption, setChosenOption] = useState(null);
  const handleSelectQuestion = optionIndex => {
    if (chosenOption === null) {
      socket.emit(WEBSOCKETS.EVENTS.EMIT.SUBMIT_ANSWER, {
        roomId: room.id,
        optionIndex
      });
      setChosenOption(optionIndex);
    }
  };

  useEffect(() => {
    setChosenOption(null);
  }, [room.questionIndex]);

  const refresh = () => {
    history.replace(WEB_PATH.SELECT_QUE);
    window.location.reload();
  };

  const ReturnComponents = () => {
    switch (room.status) {
      case GAME_STATUS.WAITING:
        return (
          <>
            <StatusBar />
            <Title>Kambarys: {room.id}</Title>
            <Title>Prisijunge zaidejai:</Title>
            {room.players.map(player => (
              <NameLabel color={player.color} key={player.name}>
                {player.name}
              </NameLabel>
            ))}
          </>
        );
      case GAME_STATUS.IN_GAME:
        return (
          <>
            <StatusBar />
            <Title>{room.questionIndex + 1}. klausimas</Title>
            <Title>{room.currentQuestion.question}</Title>
            {room.currentQuestion.options.map((option, index) => {
              console.log(chosenOption === index);
              return (
                <ListItem
                  key={index}
                  isCorrect={option.isCorrect}
                  showCorrect={showCorrect}
                  onClick={() => handleSelectQuestion(index)}
                  isChosen={chosenOption === index}
                  playerColor={playerColor}
                  isOptionChosen={chosenOption !== null}
                >
                  {index + 1}. {option.answer}
                </ListItem>
              );
            })}
          </>
        );
      case GAME_STATUS.FINISHED:
        return (
          <>
            <StatusBar />
            <Title>Žaidimo pabaiga. Tavo surinkti taškai:</Title>
            <NameLabel color={playerColor}>
              {room.players.filter(player => player.name === name)[0].points}
            </NameLabel>
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
  font-size: 24px;
  font-weight: 600;
`;
const NameLabel = styled(BaseText)`
  font-size: 42px;
  color: ${({ color }) => color};
`;
const ListItem = styled.div`
  width: 300px;
  border: 1px solid black;
  ${props => {
    if (props.showCorrect) {
      if (props.isCorrect) {
        return 'border: 3px solid green;';
      } else {
        return 'border: 3px solid red;';
      }
    }
    if (props.isOptionChosen) {
      if (props.isChosen) {
        return `border: 3px solid ${props.playerColor};`;
      }
      return 'border: 3px solid white;';
    }
  }}
  border-radius: 50px;
  padding: 8px;
  margin: 16px;
`;

export default Game;
