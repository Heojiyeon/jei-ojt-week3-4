import { targetComponentAtom } from '@/atoms/component';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import Button from '../common/Button';
import ChoiceOption from './ChoiceOption';

const Choice = () => {
  const [checkAddChoice, setCheckAddChoice] = useState(false);

  const [targetComponent, setTargetComponent] = useAtom(targetComponentAtom);

  /**
   * 선택한 옵션만 checked 되도록 하는 함수
   */
  const checkSelectedOption = (targetId: number) => {};

  /**
   * choice 추가 버튼 클릭 시 choiceOption 변경
   */
  const handleAddChoiceButton = () => {
    // choice 형태에 필요한 속성 추가해야 함
    setCheckAddChoice(true);
    // setTargetComponent([]);
  };

  return (
    <ChoiceContainer>
      <Button onClick={handleAddChoiceButton}>
        {<CiCirclePlus size="2rem" />}
      </Button>
      <ChoiceOptionsContainer>
        {checkAddChoice &&
          targetComponent.map((component, index) => (
            <ChoiceOption
              key={component.name}
              order={index}
              choice={component}
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
