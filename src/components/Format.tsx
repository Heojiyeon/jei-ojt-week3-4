import { choiceComponentAtom, entireComponentAtom } from '@/atoms/component';
import { problemsAtom } from '@/atoms/problem';
import styled from '@emotion/styled';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import Button from './common/Button';

const Format = () => {
  const setProblems = useSetAtom(problemsAtom);
  const choiceComponent = useAtomValue(choiceComponentAtom);
  const [entireComponent, setEntireComponent] = useAtom(entireComponentAtom);

  const handleReset = () => {
    if (!window.localStorage.getItem('entireComponent')) {
      return;
    }
    setEntireComponent([]);

    window.localStorage.clear();
    window.location.reload();
  };

  const createProblem = () => {
    if (entireComponent) {
      setProblems(prevProblems => {
        return [
          ...prevProblems,
          {
            id: uuidv4(),
            content: entireComponent,
            choice: choiceComponent,
          },
        ];
      });
    }
  };

  return (
    <FormatContainer>
      <Button onClick={createProblem} isFormat={true}>
        CREATE PROBLEM
      </Button>
      <Button onClick={handleReset} isFormat={true}>
        RESET
      </Button>
    </FormatContainer>
  );
};

const FormatContainer = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

export default Format;
