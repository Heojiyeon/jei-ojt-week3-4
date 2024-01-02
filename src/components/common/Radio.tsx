import styled from '@emotion/styled';
import { ReactNode } from 'react';

type RadioProp = {
  children: ReactNode;
  isCorrect: boolean;
  id: number;
  onChange: (targetId: number) => void;
};

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
