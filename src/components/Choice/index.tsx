import { choiceComponentAtom, targetComponentAtom } from '@/atoms/component';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { CiCirclePlus } from 'react-icons/ci';
import Button from '../common/Button';
import ChoiceOption from './ChoiceOption';

const Choice = () => {
  const [targetComponent, setTargetComponent] = useAtom(targetComponentAtom);
  const [choiceComponent, setChoiceComponent] = useAtom(choiceComponentAtom);

  /**
   * 선택지에서 선택한 옵션을 제거하는 함수
   */
  const deleteOption = (taregetId: string | undefined) => {
    setChoiceComponent(prevChoiceComponent =>
      prevChoiceComponent.filter(component => component.id !== taregetId)
    );
  };

  /**
   * 선택한 옵션만 checked 되도록 하는 함수
   */
  const checkCorrectOption = (targetId: string | undefined) => {
    setChoiceComponent(prevChoiceComponent => {
      return prevChoiceComponent.map(component =>
        component.id === targetId
          ? {
              ...component,
              isCorrect: true,
            }
          : {
              ...component,
              isCorrect: false,
            }
      );
    });
  };

  /**
   * 컴포넌트를 선택지에 추가하는 함수
   */
  const handleAddChoiceButton = () => {
    // choice 형태에 필요한 속성 추가해야 함
    if (targetComponent) {
      targetComponent.map(component => {
        const newChoice = {
          id: component.name,
          choice: component,
          isCorrect: false,
        };

        setChoiceComponent(prevChoiceComponent => [
          ...prevChoiceComponent,
          newChoice,
        ]);
      });

      setTargetComponent([]);
    }
  };

  return (
    <ChoiceContainer>
      <Button onClick={handleAddChoiceButton}>
        {<CiCirclePlus size="2rem" />}
      </Button>
      <ChoiceOptionsContainer>
        {choiceComponent.map((component, index) => (
          <ChoiceOption
            key={component.choice.name}
            order={index}
            choice={component.choice}
            isCorrect={component.isCorrect}
            checkCorrectOption={checkCorrectOption}
            deleteOption={deleteOption}
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
