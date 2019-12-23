import React, { useState,  useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import {
  BaseInput,
  BaseButton,
  BaseScreen,
  buttonWidth,
  BaseText
} from '../../../styles/BaseComponents';
import { socket, WEBSOCKETS } from '../../../api/socket';
import { MOBILE_PATH } from '../../route/MobileRoute';
import { CirclePicker } from 'react-color';
import { playerColors } from '../../../styles/GlobalStyles';
import StatusBar from '../components/StatusBar';
import { PlayerContext } from '../../context/PlayerContext';

const FindRoom = () => {
  const { playerColor, setPlayerColor } = useContext(PlayerContext);
  const [sessionName, setSessionName] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  const findRoom = () => {
    if (name && setPlayerColor && sessionName) {
      socket.emit(WEBSOCKETS.EVENTS.EMIT.JOIN_ROOM, { roomId: sessionName, name, playerColor });
      history.push(MOBILE_PATH.GAME);
      return;
    }
    setError(true);
  };

  return (
    <Background>
      <StatusBar />
      <Input
        placeholder={'sesijos pavadinimas'}
        onChange={({ target: { value } }) => {
          setSessionName(value);
          setError(false);
        }}
        isEmpty={error && !name}
      />

      <Input
        placeholder={'vardas'}
        onChange={({ target: { value } }) => {
          setName(value);
          setError(false);
        }}
        isEmpty={error && !sessionName}
      />
      <CirclePicker
        width={buttonWidth}
        colors={playerColors}
        onChange={color => setPlayerColor(color.hex)}
      />
      {!playerColor && error && <ErrorLabel>Pasirinkite spalvą</ErrorLabel>}
      <Submit onClick={findRoom}>Pradėti</Submit>
    </Background>
  );
};

const Background = styled(BaseScreen)``;

const Input = styled(BaseInput)``;

const ErrorLabel = styled(BaseText)`
  color: red;
`;

const Submit = styled(BaseButton)``;

export default FindRoom;
