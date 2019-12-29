const lettersParser = text => {
  let returnString = text;
  returnString = returnString.replace(/ą/g, 'a');
  returnString = returnString.replace(/č/g, 'c');
  returnString = returnString.replace(/ę/g, 'e');
  returnString = returnString.replace(/ė/g, 'e');
  returnString = returnString.replace(/į/g, 'i');
  returnString = returnString.replace(/š/g, 's');
  returnString = returnString.replace(/ų/g, 'u');
  returnString = returnString.replace(/ū/g, 'u');
  returnString = returnString.replace(/ž/g, 'z');
  returnString = returnString.replace(/Ą/g, 'A');
  returnString = returnString.replace(/Č/g, 'C');
  returnString = returnString.replace(/Ę/g, 'E');
  returnString = returnString.replace(/Ė/g, 'E');
  returnString = returnString.replace(/Į/g, 'I');
  returnString = returnString.replace(/Š/g, 'S');
  returnString = returnString.replace(/Ų/g, 'U');
  returnString = returnString.replace(/Ū/g, 'U');
  returnString = returnString.replace(/Ž/g, 'Z');
  return returnString;
};

const searchFilter = (array, text) => {
  const newArray = array.filter(que => {
    return que.name.toLowerCase().includes(lettersParser(text));
  });
  return newArray;
};

export default searchFilter;
