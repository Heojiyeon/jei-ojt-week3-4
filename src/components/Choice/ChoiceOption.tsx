import { TargetComponent } from '@/atoms/component';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import Button from '../common/Button';

type ChoiceOptionProp = {
  choice: TargetComponent;
  order: number;
  data?: string;
  isCorrect: boolean;
  checkCorrectOption: (targetId: string | undefined) => void;
  deleteOption: (targetId: string | undefined) => void;
};

/**
 *
 * @param choice {TargetComponent} 컴포넌트 기본 정보
 * @param order {number} 옵션 순서
 * @param data {string} 이미지 src url
 * @param isCorrect {boolean} 옵션의 정/오답 설정 값
 * @param checkCorrectOption {(targetId : string => undefined) => void} 옵션의 정/오답 설정 함수
 * @param deleteOption {{targetId: string| \ undefined} => void} 옵션 제거 함수
 * @returns 옵션 컴포넌트
 */
const ChoiceOption = ({
  choice,
  order,
  data,
  isCorrect,
  checkCorrectOption,
  deleteOption,
}: ChoiceOptionProp) => {
  return (
    <ChoiceOptionContainer>
      <OrderContainer>{order + 1}</OrderContainer>
      <OptionContentContainer>
        <RemoveButtonContainer>
          <Button onClick={() => deleteOption(choice.name)}>
            {<FaTrash size="1.5rem" />}
          </Button>
        </RemoveButtonContainer>
        <img
          src={data ? data : choice.data}
          alt="option-image"
          width={60}
          height={60}
        />
        <RadioButton
          type="radio"
          name="is-correct"
          id={`is-correct-${uuidv4()}`}
          defaultChecked={isCorrect}
          onChange={() => checkCorrectOption(choice.name)}
        />
      </OptionContentContainer>
    </ChoiceOptionContainer>
  );
};

const OrderContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

const RadioButton = styled('input')`
  margin: 1rem;
  border: 0px;
  width: 100%;
  height: 1.2rem;
`;

const ChoiceOptionContainer = styled('div')`
  margin: 1rem;
`;

const OptionContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RemoveButtonContainer = styled('div')`
  display: flex;
`;

export default ChoiceOption;
