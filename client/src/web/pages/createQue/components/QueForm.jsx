import React, { useMemo, useContext, useState } from 'react';
import styled from 'styled-components';
import { BaseInput, BaseText, BaseButton } from '../../../../styles/BaseComponents';
import { QuestionOption } from './QuestionOption';
import { CreateQueContext } from '../../../context/CreateQueContext';

const QueForm = ({ index, form }) => {
  const { removeForm, editQuestion } = useContext(CreateQueContext);

  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = event => {
    setIsEmpty(event.target.value === '');
    editQuestion(index, event.target.value);
  };

  const isFirst = index === 0;

  return useMemo(() => {
    return (
      <>
        <Row>
          <Title>{index + 1}. Klausimas</Title>
          {!isFirst && (
            <RemoveQ onClick={() => removeForm(index)} color={'#c75052'}>
              <ButtonLabel>naikinti</ButtonLabel>
            </RemoveQ>
          )}
        </Row>
        <Label>Įveskite klausimą:</Label>
        <Question
          isEmpty={isEmpty}
          placeholder={isEmpty ? 'Laukas negali būti tuščias' : ''}
          onBlur={event => {
            setIsEmpty(event.target.value === '');
          }}
          onChange={handleChange}
        />
        <Label>Įveskite pasirinkimo variantus ir pasirinkite teisingus:</Label>
        {form.options.map((option, oIndex) => {
          return <QuestionOption key={oIndex} qIndex={index} oIndex={oIndex} />;
        })}
      </>
    );
  }, [isEmpty]);
};

const Question = styled(BaseInput)`
  width: 100%;
`;
const Title = styled(BaseText)`
  font-size: 24px;
  font-weight: 600;
`;
const Label = styled(BaseText)`
  font-size: 20px;
  font-weight: 400;
`;
const ButtonLabel = styled(BaseText)`
  font-size: 20px;
  font-weight: 400;
  margin: auto;
`;
const RemoveQ = styled(BaseButton)`
  height: 30px;
  width: 100px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default QueForm;
