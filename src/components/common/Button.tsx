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
  width: 6rem;
  height: 3rem;
  margin: 1rem;
  border: 1px solid #0080ff;
  border-radius: 8px;
  background: none;
  color: #0080ff;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButtonContainer = css`
  width: 3em;
  height: 3rem;
  border: none;
  background: none;
`;

export default Button;
