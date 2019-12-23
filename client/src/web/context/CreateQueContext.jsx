import React, { createContext, useReducer, useState, useEffect } from 'react';
import { socket, WEBSOCKETS } from '../../api/socket';
import { createQueReducer } from './reducers/createQueReducer';

export const CreateQueContext = createContext();

export const emptyForm = {
  question: { question: '', isEmpty: true },
  options: [
    { answer: '', isCorrect: false, isEmpty: true },
    { answer: '', isCorrect: false, isEmpty: true },
    { answer: '', isCorrect: false, isEmpty: true },
    { answer: '', isCorrect: false, isEmpty: true }
  ]
};
const initialState = {
  name: { value: '', isEmpty: false },
  forms: [emptyForm]
};
const formatQue = que => {
  const formatedQue = {
    name: que.name.value,
    questions: que.forms.map(question => ({
      question: question.question.question,
      options: question.options.map(opt => ({
        answer: opt.answer,
        isCorrect: opt.isCorrect
      }))
    }))
  };
  return formatedQue;
};

export const CreateQueProvider = ({ children }) => {
  const [questioner, dispatch] = useReducer(createQueReducer, initialState);
  const [errorInForm, setErrorInForm] = useState(false);

  useEffect(() => {
    if (errorInForm) {
      setErrorInForm(false);
    }
  }, [questioner.forms, errorInForm]);

  const addForm = () => dispatch({ type: 'addForm' });

  const removeForm = index => dispatch({ type: 'removeForm', payload: { index } });

  const editOption = (qIndex, oIndex, value) =>
    dispatch({ type: 'editOption', payload: { qIndex, oIndex, value } });

  const setOptIsCorrect = (qIndex, oIndex) =>
    dispatch({ type: 'setOptIsCorrect', payload: { qIndex, oIndex } });

  const editQuestion = (qIndex, value) =>
    dispatch({ type: 'editQuestion', payload: { qIndex, value } });

  const editName = value => dispatch({ type: 'editName', payload: { value } });

  const createQue = () => {
    let isValid = true;
    questioner.forms.forEach(form => {
      if (form.question.isEmpty) {
        isValid = false;
        return;
      }
      form.options.forEach(option => {
        if (option.isEmpty) {
          isValid = false;
          return;
        }
      });
    });
    if (isValid) {
      console.log(questioner);
      socket.emit(WEBSOCKETS.EVENTS.EMIT.ADD_QUE, formatQue(questioner));
      setErrorInForm(false);
    } else {
      setErrorInForm(true);
    }
  };
  return (
    <CreateQueContext.Provider
      value={{
        questioner,
        addForm,
        removeForm,
        editOption,
        editQuestion,
        createQue,
        errorInForm,
        setOptIsCorrect,
        editName
      }}
    >
      {children}
    </CreateQueContext.Provider>
  );
};
