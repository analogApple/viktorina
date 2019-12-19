import React from 'react';
import styled from 'styled-components';
import { BaseButton } from '../../../../styles/BaseComponents';

export default function QListItem(props) {
  return <Container onClick={props.onClick}>{props.name}</Container>;
}

const Container = styled(BaseButton)``;
