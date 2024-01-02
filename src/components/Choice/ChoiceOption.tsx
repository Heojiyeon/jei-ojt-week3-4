import { ChoiceOptionContent } from '@/types/Choice';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa6';
import Button from '../common/Button';
import Radio from '../common/Radio';

type ChoiceOptionProp = {
  choice: ChoiceOptionContent;
  onChange: (targetId: number) => void;
};

const ChoiceOption = ({ choice, onChange }: ChoiceOptionProp) => {
  return (
    <ChoiceOptionContainer>
      <Radio isCorrect={choice.isCorrect} id={choice.id} onChange={onChange}>
        <div>{choice.order}</div>
        <OptionContentContainer>
          <RemoveButtonContainer>
            <Button onClick={() => console.log('remove')}>
              {<FaTrash size="1.5rem" />}
            </Button>
          </RemoveButtonContainer>
          <img
            src={choice.imageUrl}
            alt="option-image"
            width={60}
            height={60}
          />
        </OptionContentContainer>
      </Radio>
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
