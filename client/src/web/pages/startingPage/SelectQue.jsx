import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { BaseButton, BaseInput, BaseText, BaseScreen } from '../../../styles/BaseComponents';
import QueListItem from './components/QueListItem';
import searchFilter from '../../../utils/searchUtil';
import { WEB_PATH } from '../../route/WebRoute';
import { socket, WEBSOCKETS } from '../../../api/socket';

const SelectQue = () => {
  const history = useHistory();

  const [questioners, setQuestioners] = useState([]);
  const [filteredQ, setFilteredQ] = useState([]);

  const handleOnChange = event => {
    setFilteredQ(searchFilter(questioners, event.target.value));
  };

  useEffect(() => {
    socket.emit(WEBSOCKETS.EVENTS.EMIT.GET_QUE_LIST);
    socket.on(WEBSOCKETS.EVENTS.LISTEN.GET_QUE_LIST_RESPONSE, data => {
      setQuestioners(data);
      setFilteredQ(data);
    });

    socket.on(WEBSOCKETS.EVENTS.LISTEN.CREATE_ROOM_RESPONSE, () => {
      history.push(WEB_PATH.QUE);
    });
  }, [history]);

  const handleQueClick = id => {
    socket.emit(WEBSOCKETS.EVENTS.EMIT.CREATE_ROOM, { id });
  };

  return (
    <Background>
      <Title>Sukurti klausimyną?</Title>
      <CreateQue onClick={() => history.push(WEB_PATH.CREATE_QUE)}>Sukurti!</CreateQue>
      <Title>Pasirinkti esamą klausimyną:</Title>
      <Search placeholder={'... ieškoti'} onChange={handleOnChange} />
      <QueListContainer>
        {filteredQ.map((que, index) => (
          <QueListItem key={index} name={que.name} onClick={() => handleQueClick(que.id)} />
        ))}
      </QueListContainer>
    </Background>
  );
};

const Background = styled(BaseScreen)``;
const Search = styled(BaseInput)``;
const CreateQue = styled(BaseButton)``;
const Title = styled(BaseText)`
  font-size: 24px;
  font-weight: 600;
`;
const QueListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 60%;
`;

export default SelectQue;
