import { useHistory } from 'react-router';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BaseButton, BaseScreen, BaseText, BaseInput } from '../../../styles/BaseComponents';
import QueForm from './components/QueForm';
import { CreateQueContext } from '../../context/CreateQueContext';

const CreateQue = () => {
  const { questioner, addForm, errorInForm, editName } = useContext(CreateQueContext);
  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = event => {
    setIsEmpty(event.target.value === '');
    editName(event.target.value);
  };
  const history = useHistory();

  return useMemo(() => {
    return (
      <Background>
        <Container>
          <Title>Sukurkyte klausimyną!</Title>
          <EnterNameLabel>Įveskite pavadinimą:</EnterNameLabel>
          <NameInput
            isEmpty={isEmpty}
            placeholder={isEmpty ? 'Laukas negali būti tuščias' : ''}
            onBlur={event => {
              setIsEmpty(event.target.value === '');
            }}
            onChange={handleChange}
          />
          {questioner.forms.map((form, index) => (
            <QueForm key={index} index={index} form={form} />
          ))}
          {errorInForm && <Label>Ne visi laukai užpildyti</Label>}
          <CreateQ onClick={addForm}>Pridėti klausimą</CreateQ>
          <SubmitQue />
          <GoBack color={'#c9c9c9'} onClick={() => history.goBack()}>
            Grįžti
          </GoBack>
        </Container>
      </Background>
    );
  }, [questioner.forms, errorInForm, isEmpty]);
};

const Background = styled(BaseScreen)``;
const CreateQ = styled(BaseButton)``;
const GoBack = styled(BaseButton)``;
const Label = styled(BaseText)`
  margin: auto;
  text-align: center;
  color: red;
`;
const Title = styled(BaseText)`
  font-size: 24px;
  font-weight: 600;
`;
const EnterNameLabel = styled(BaseText)`
  font-size: 20px;
  font-weight: 400;
`;

const NameInput = styled(BaseInput)`
  width: 100%;
`;

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  width: 500px;
`;

export default CreateQue;

const SubmitQue = () => {
  const { questioner, createQue } = useContext(CreateQueContext);
  return (
    <Submit color={'#50c769'} onClick={() => (questioner.forms.length > 0 ? createQue() : null)}>
      Kurti klausimyną
    </Submit>
  );
};
const Submit = styled(BaseButton)``;
