import styled from '@emotion/styled';
import { ReactNode } from 'react';

type RadioProp = {
  children: ReactNode;
  isCorrect: boolean;
  id: number;
  onChange: (targetId: number) => void;
};

/**
 *
 * @param children {ReactNode}
 * @param isCorrect {boolean} 정/오답 값
 * @param id {number} 아이디
 * @param onChange {(targetId: number) => void} 라디오 버튼 클릭 핸들링 함수
 * @returns 라디오 인풋 컴포넌트
 */
const Radio = ({ children, isCorrect, id, onChange }: RadioProp) => {
  return (
    <RadioContainer>
      {children}
      <StyledInput
        type="radio"
        checked={isCorrect}
        name="radio-group"
        onChange={() => onChange(id)}
      />
    </RadioContainer>
  );
};

const RadioContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled('input')`
  margin: 1rem;
`;

export default Radio;
