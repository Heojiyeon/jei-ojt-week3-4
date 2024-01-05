import { TargetComponent } from '@/atoms/component';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa6';
import Button from '../common/Button';

type ChoiceOptionProp = {
  choice: TargetComponent;
  order: number;
};

const ChoiceOption = ({ choice, order }: ChoiceOptionProp) => {
  return (
    <ChoiceOptionContainer>
      <div>{order}</div>
      <OptionContentContainer>
        <RemoveButtonContainer>
          <Button onClick={() => console.log('remove')}>
            {<FaTrash size="1.5rem" />}
          </Button>
        </RemoveButtonContainer>
        <img src={choice.data} alt="option-image" width={60} height={60} />
      </OptionContentContainer>
    </ChoiceOptionContainer>
  );
};

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
