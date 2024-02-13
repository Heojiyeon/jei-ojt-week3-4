import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type ButtonProp = {
  children: ReactNode;
  onClick: () => void;
  isFormat?: boolean;
};

/**
 *
 * @param children {ReactNode}
 * @param onClick {() => void} 버튼 클릭 핸들링 함수
 * @param isFormat {boolean} 포맷 버튼 여부
 * @returns 버튼 컴포넌트
 */
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
  border: 1px solid #ed6276;
  border-radius: 8px;
  background: none;
  color: #ed6276;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
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
