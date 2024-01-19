import { choiceComponentAtom, entireComponentAtom } from '@/atoms/component';
import { gameTypeAtom, problemsAtom } from '@/atoms/problem';
import { addIndexedDB } from '@/data';
import styled from '@emotion/styled';
import { useAtom, useAtomValue } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import Button from './common/Button';

const Format = () => {
  const [problems, setProblems] = useAtom(problemsAtom);
  const [entireComponent, setEntireComponent] = useAtom(entireComponentAtom);

  const gameType = useAtomValue(gameTypeAtom);
  const choiceComponent = useAtomValue(choiceComponentAtom);

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
      addIndexedDB({ gameType, problems });
    }
  };

  const showProblem = () => {
    window.location.replace('/game');
  };

  return (
    <FormatContainer>
      <Button onClick={showProblem} isFormat={true}>
        SHOW PROBLEM
      </Button>
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
