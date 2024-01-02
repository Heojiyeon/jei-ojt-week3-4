import { CHOICES } from '@/mock/choice';
import styled from '@emotion/styled';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import Button from '../common/Button';
import ChoiceOption from './ChoiceOption';

const Choice = () => {
  const [currentChoices, setCurrentChoices] = useState(CHOICES);

  //선택한 옵션만 checked 되도록 하는 함수
  const checkSelectedOption = (targetId: number) => {
    const changedChoices = CHOICES.map(choice => {
      return choice.id === targetId
        ? { ...choice, isCorrect: true }
        : { ...choice, isCorrect: false };
    });

    setCurrentChoices([...changedChoices]);
  };

  return (
    <ChoiceContainer>
      <Button onClick={() => console.log('add choice option')}>
        {<CiCirclePlus size="2rem" />}
      </Button>
      <ChoiceOptionsContainer>
        {currentChoices.map(choice => (
          <ChoiceOption
            key={choice.id}
            choice={choice}
            onChange={checkSelectedOption}
          />
        ))}
      </ChoiceOptionsContainer>
    </ChoiceContainer>
  );
};

const ChoiceContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14rem;
`;

const ChoiceOptionsContainer = styled('div')`
  display: flex;
`;

export default Choice;
