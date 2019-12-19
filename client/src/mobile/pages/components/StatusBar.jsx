import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../../context/PlayerContext';

const StatusBar = ({ style }) => {
  const { playerColor } = useContext(PlayerContext);
  return <Container style={style} color={playerColor}></Container>;
};

export default StatusBar;

const Container = styled.div`
  width: 100vw;
  height: 50px;
  background-color: ${({ color }) => color};
  margin-bottom: 32px;
`;
