import { choiceComponentAtom, entireComponentAtom } from '@/atoms/component';
import { gameTypeAtom, problemsAtom } from '@/atoms/problem';
import {
  ENTIRE_COMPONENT,
  GAME_TYPE_NUMBER,
  GAME_TYPE_SITUATION,
  NUMBER_GAME,
  SITUATION_GAME,
} from '@/constants/game';
import { addIndexedDB } from '@/data';
import { Games } from '@/types/Game';
import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAtom, useAtomValue } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import Button from './common/Button';
import { useCallback } from 'react';

/**
 * @returns 포맷 컴포넌트
 */
const Format = () => {
  const [problems, setProblems] = useAtom(problemsAtom);
  const [entireComponent, setEntireComponent] = useAtom(entireComponentAtom);
  const [gameType, setGameType] = useAtom(gameTypeAtom);

  const choiceComponent = useAtomValue(choiceComponentAtom);

  /**
   * 게임 타입을 설정하는 함수
   * @param currentGameType {Games} 현재 게임 타입
   */
  const handleGameType = (currentGameType: Games) => {
    setGameType(currentGameType);
  };

  /**
   * 리셋 버튼 클릭 핸들링 함수
   */
  const handleReset = useCallback(() => {
    if (!window.localStorage.getItem(ENTIRE_COMPONENT)) {
      return;
    }
    setEntireComponent([]);

    window.localStorage.clear();
    window.location.reload();
  }, [setEntireComponent]);

  /**
   * 문제 생성 함수
   */
  const createProblem = useCallback(() => {
    if (entireComponent && gameType !== null) {
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
  }, [entireComponent, gameType, setProblems, addIndexedDB]);

  /**
   * gameType에 따른 경로 이동 함수
   */
  const showProblem = useCallback(() => {
    window.location.replace(`/${gameType}`);
  }, []);

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
      <Select
        placeholder={!gameType ? 'SELECT GAME TYPE' : ''}
        onChange={e => handleGameType(e.target.value as Games)}
      >
        <option
          value="number-game"
          defaultChecked={gameType === GAME_TYPE_NUMBER ? true : false}
        >
          {NUMBER_GAME}
        </option>
        <option
          value="situation-game"
          defaultChecked={gameType === GAME_TYPE_SITUATION ? true : false}
        >
          {SITUATION_GAME}
        </option>
      </Select>
    </FormatContainer>
  );
};

const FormatContainer = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

export default Format;
