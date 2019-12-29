import { useHistory } from 'react-router';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BaseButton, BaseScreen, BaseText, BaseInput } from '../../../styles/BaseComponents';
import QueForm from './components/QueForm';
import { CreateQueContext } from '../../context/CreateQueContext';

const CreateQue = () => {
  const { questioner, addForm, errorInForm, editName, createQue } = useContext(CreateQueContext);
  const [isEmpty, setIsEmpty] = useState(false);
  const history = useHistory();

  const handleChange = event => {
    setIsEmpty(event.target.value === '');
    editName(event.target.value);
  };

  const handleSubmit = () => {
    if (questioner.forms.length > 0) {
      createQue(history.goBack);
    }
  };

  return useMemo(() => {
    return (
      <BaseScreen>
        <Container>
          <Title>Sukurkite klausimyną!</Title>
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
          <BaseButton onClick={addForm}>Pridėti klausimą</BaseButton>
          <BaseButton color={'#50c769'} onClick={handleSubmit}>
            Kurti klausimyną
          </BaseButton>
          <BaseButton color={'#c9c9c9'} onClick={() => history.goBack()}>
            Grįžti
          </BaseButton>
        </Container>
      </BaseScreen>
    );
  }, [questioner.forms, errorInForm, isEmpty]);
};

const Label = styled(BaseText)`
  width: 100%;
  margin: auto;
  text-align: center;
  color: red;
`;
const Title = styled(BaseText)`
  font-weight: 600;
`;
const EnterNameLabel = styled(BaseText)`
  font-weight: 400;
`;

const NameInput = styled(BaseInput)`
  width: 100%;
  height: 2vh;
`;

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

export default CreateQue;
