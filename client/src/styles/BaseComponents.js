import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { getWindowDimensions } from '../common/hooks/useWindowDimensions';

export const buttonWidth = isMobile ? `${getWindowDimensions().width - 32}px` : '30vw';

export const BaseButton = styled.button`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vh;
  width: ${buttonWidth};
  height: 8vh;
  margin: 8px;
  border-radius: 10vh;
  border: 0px solid ${props => (props.color ? props.color + 'a0' : '#67a6d6a0')};
  padding: 0px 8px;
  background-color: ${props => (props.color ? props.color + '50' : '#67a6d650')};
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${props => (props.color ? props.color + '40' : '#67a6d640')};
    border-top: 0px solid ${props => (props.color ? props.color : '#67a6d6')};
    border-left: 0px solid ${props => (props.color ? props.color : '#67a6d6')};
    border-right: 2px solid ${props => (props.color ? props.color : '#67a6d6')};
    border-bottom: 2px solid ${props => (props.color ? props.color : '#67a6d6')};
  }
`;

export const BaseInput = styled.input`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: ${buttonWidth};
  height: 5vh;
  font-size: 3vh;
  margin: 8px;
  border-radius: 20px;
  border: 1px solid ${props => (props.isEmpty ? 'red' : 'black')};
  text-align: left;
  padding: 8px;
  :focus {
    outline: none;
  }
  :hover {
    background-color: #00000010;
  }
  ::placeholder {
    ${props => (props.isEmpty ? 'color: red' : null)};
  }
`;

export const BaseText = styled.p`
  font-size: 5vh;
  margin: 8px;
  :hover {
    cursor: default;
  }
`;

export const BaseScreen = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;
