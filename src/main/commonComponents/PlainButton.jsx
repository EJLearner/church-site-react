import styled from 'styled-components';

const PlainButton = styled.button`
  color: inherit;
  background-color: inherit;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: inherit;
  padding: 0;
  text-align: left;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.02);
  }
`;

export default PlainButton;
