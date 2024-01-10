import { TargetComponent } from '@/atoms/component';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa6';
import Button from '../common/Button';

type ChoiceOptionProp = {
  choice: TargetComponent;
  order: number;
  isCorrect: boolean;
  checkCorrectOption: (targetId: string | undefined) => void;
  deleteOption: (targetId: string | undefined) => void;
};

const ChoiceOption = ({
  choice,
  order,
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
        <img src={choice.data} alt="option-image" width={60} height={60} />
        <RadioButton
          type="radio"
          name="is-correct"
          id="is-correct"
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
