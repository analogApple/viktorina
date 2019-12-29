import React, { useState, useContext } from 'react';
import { BaseInput, BaseText } from '../../../../styles/BaseComponents';
import styled from 'styled-components';
import { CreateQueContext } from '../../../context/CreateQueContext';

export const QuestionOption = props => {
  const [isEmpty, setIsEmpty] = useState(false);
  const { questioner, editOption, setOptIsCorrect } = useContext(CreateQueContext);

  const handleChange = event => {
    setIsEmpty(event.target.value === '');
    editOption(props.qIndex, props.oIndex, event.target.value);
  };

  const handleClick = () => setOptIsCorrect(props.qIndex, props.oIndex);
  const isSelected = questioner.forms[props.qIndex].options[props.oIndex].isCorrect;

  return (
    <Container>
      <AnswerInput
        onChange={handleChange}
        isEmpty={isEmpty}
        placeholder={isEmpty ? 'Laukas negali būti tuščias' : ''}
        onBlur={event => {
          setIsEmpty(event.target.value === '');
        }}
      />
      <Checkbox onClick={handleClick} isSelected={isSelected}>
        <Label>teisingas</Label>
      </Checkbox>
    </Container>
  );
};

const AnswerInput = styled(BaseInput)`
  display: flex;
  flex: 1;
  height: 2vh;
`;

const Checkbox = styled.div`
  border-radius: 50px;
  border: 1px solid black;

  padding: 8px;
  background-color: ${props => (props.isSelected ? `#50C769a0` : '#ffffff')};
  :hover {
    background-color: ${props => (props.isSelected ? `#50C769ba` : '#ffffff')};
    border: 1px solid ${props => (!props.isSelected ? `#50C769ba` : '#ffffff')};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Label = styled(BaseText)`
  font-size: 2vh;
  margin: auto;
  text-align: center;
`;
