import React, { createContext, useReducer, useState, useEffect } from 'react';
import { socket, WEBSOCKETS } from '../../api/socket';
import {
  createQueReducer,
  createQueActions
} from './reducers/createQueReducer';

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
  }, [questioner.forms]);

  const addForm = () => dispatch({ type: createQueActions.ADD_FORM });

  const removeForm = index =>
    dispatch({ type: createQueActions.REMOVE_FORM, payload: { index } });

  const editOption = (qIndex, oIndex, value) =>
    dispatch({
      type: createQueActions.EDIT_OPTION,
      payload: { qIndex, oIndex, value }
    });

  const setOptIsCorrect = (qIndex, oIndex) =>
    dispatch({
      type: createQueActions.SET_OPT_IS_CORRECT,
      payload: { qIndex, oIndex }
    });

  const editQuestion = (qIndex, value) =>
    dispatch({
      type: createQueActions.EDIT_QUESTION,
      payload: { qIndex, value }
    });

  const editName = value =>
    dispatch({ type: createQueActions.EDIT_NAME, payload: { value } });

  const createQue = callBack => {
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
      socket.emit(WEBSOCKETS.EVENTS.EMIT.ADD_QUE, formatQue(questioner));
      setErrorInForm(false);
      callBack();
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
