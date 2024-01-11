import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type ButtonProp = {
  children: ReactNode;
  onClick: () => void;
  isFormat?: boolean;
};

const Button = ({ children, onClick, isFormat = false }: ButtonProp) => {
  return (
    <ButtonContainer isFormat={isFormat} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};
const ButtonContainer = styled.button`
  ${(props: ButtonProp) =>
    props.isFormat ? FormatButtonContainer : IconButtonContainer}
`;

const FormatButtonContainer = css`
  width: 5rem;
  height: 2rem;
  border: 1px solid #ed6276;
  border-radius: 8px;
  background: none;
  color: #ed6276;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem 0 2rem;
  &:hover {
    cursor: pointer;
    background-color: #ed6276;
    color: #ffffff;
  }
`;

const IconButtonContainer = css`
  width: 3em;
  height: 3rem;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
