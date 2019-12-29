import { emptyForm } from '../CreateQueContext';

export const createQueActions = {
  ADD_FORM: 'ADD_FORM',
  REMOVE_FORM: 'REMOVE_FORM',
  EDIT_OPTION: 'EDIT_OPTION',
  EDIT_QUESTION: 'EDIT_QUESTION',
  EDIT_NAME: 'EDIT_NAME',
  SET_OPT_IS_CORRECT: 'SET_OPT_IS_CORRECT'
};

export function createQueReducer(state, action) {
  const formsCopy = JSON.parse(JSON.stringify(state.forms));

  const editQuestion = ({ qIndex, value }) => {
    formsCopy[qIndex].question.question = value;
    formsCopy[qIndex].question.isEmpty = value === '';

    return { ...state, forms: formsCopy };
  };

  const editName = ({ value }) => {
    const name = { value, isEmpty: value === '' };
    return { ...state, name };
  };

  const editOption = ({ qIndex, oIndex, value }) => {
    formsCopy[qIndex].options[oIndex].answer = value;
    formsCopy[qIndex].options[oIndex].isEmpty = value === '';
    return { ...state, forms: formsCopy };
  };
  const setOptIsCorrect = ({ qIndex, oIndex }) => {
    formsCopy[qIndex].options[oIndex].isCorrect = !state.forms[qIndex].options[oIndex].isCorrect;
    return { ...state, forms: formsCopy };
  };

  const removeForm = ({ index }) => {
    formsCopy.splice(index, 1);
    return { ...state, forms: formsCopy };
  };

  const addForm = () => {
    formsCopy.push(emptyForm);
    return { ...state, forms: formsCopy };
  };

  switch (action.type) {
    case createQueActions.ADD_FORM:
      return addForm();
    case createQueActions.REMOVE_FORM:
      return removeForm({ ...action.payload });
    case createQueActions.EDIT_OPTION:
      return editOption({ ...action.payload });
    case createQueActions.EDIT_QUESTION:
      return editQuestion({ ...action.payload });
    case createQueActions.EDIT_NAME:
      return editName({ ...action.payload });
    case createQueActions.SET_OPT_IS_CORRECT:
      return setOptIsCorrect({ ...action.payload });
    default:
      return state;
  }
}
