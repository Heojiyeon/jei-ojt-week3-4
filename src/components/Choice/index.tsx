import {
  ChoiceComponent,
  choiceComponentAtom,
  targetComponentAtom,
} from '@/atoms/component';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { CiCirclePlus } from 'react-icons/ci';
import Button from '../common/Button';
import ChoiceOption from './ChoiceOption';
import { useCallback } from 'react';

/**
 * @returns 선택 문항 컴포넌트
 */
const Choice = () => {
  const [targetComponent, setTargetComponent] = useAtom(targetComponentAtom);
  const [choiceComponent, setChoiceComponent] = useAtom(choiceComponentAtom);

  /**
   * 특정 옵션을 삭제하는 함수
   * @param taregetId {string | undefined} 옵션 아이디
   */
  const deleteOption = useCallback(
    (taregetId: string | undefined) => {
      setChoiceComponent(prevChoiceComponent =>
        prevChoiceComponent.filter(component => component.name !== taregetId)
      );
    },
    [setChoiceComponent]
  );

  /**
   * 옵션의 정/오답을 설정하는 함수
   * @param targetId {string | undefined} 옵션 아이디
   */
  const checkCorrectOption = useCallback(
    (targetId: string | undefined) => {
      setChoiceComponent(prevChoiceComponent => {
        return prevChoiceComponent.map(component =>
          component.name === targetId
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
    },
    [setChoiceComponent]
  );

  /**
   * 특정 컴포넌트를 선택지에 추가하는 함수
   */
  const handleAddChoiceButton = useCallback(() => {
    if (targetComponent) {
      targetComponent.map(component => {
        const newChoice: ChoiceComponent = {
          name: component.name,
          choice: component.info,
          data: component.info.data,
          isCorrect: false,
        };

        setChoiceComponent(prevChoiceComponent => [
          ...prevChoiceComponent,
          newChoice,
        ]);
      });

      setTargetComponent([]);
    }
  }, [targetComponent, setChoiceComponent, setTargetComponent]);

  return (
    <ChoiceContainer>
      <Button onClick={handleAddChoiceButton}>
        {<CiCirclePlus size="2rem" />}
      </Button>
      <ChoiceOptionsContainer>
        {choiceComponent.map((component, index) => (
          <ChoiceOption
            key={component.name}
            order={index}
            data={component.data}
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
  align-items: center;
  height: 14rem;
  border-radius: 10px;
  background-color: #ffffff;
  width: 28rem;
  overflow-x: auto;
  margin: 0 2rem 0 2rem;
  padding: 1rem;
`;

const ChoiceOptionsContainer = styled('div')`
  display: flex;
`;

export default Choice;
