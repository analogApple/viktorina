import { emptyForm } from '../CreateQueContext';

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
    case 'addForm':
      return addForm();
    case 'removeForm':
      return removeForm({ ...action.payload });
    case 'editOption':
      return editOption({ ...action.payload });
    case 'editQuestion':
      return editQuestion({ ...action.payload });
    case 'editName':
      return editName({ ...action.payload });
    case 'setOptIsCorrect':
      return setOptIsCorrect({ ...action.payload });
    default:
      throw new Error();
  }
}
