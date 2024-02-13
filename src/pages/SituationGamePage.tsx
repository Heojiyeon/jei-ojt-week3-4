import { fetchData, handleFetchData } from '@/utils/handleFetchData';
import styled from '@emotion/styled';
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';

/**
 * @returns 상황 추론 게임 페이지
 */
const SituationGamePage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [currentProblemOrder, setCurrentProblemOrder] = useState(0);
  const [countOfCorrect, setCountOfCorrect] = useState(0);

  const fetchSituationGameData = async () => {
    const problems = await fetchData('situation-game');

    handleFetchData({
      currentProblemOrder,
      countOfCorrect,
      setCountOfCorrect,
      setCurrentProblemOrder,
      canvasRef,
      problems,
    });
  };

  /**
   * 캔버스 생성
   */
  useEffect(() => {
    canvasRef.current = new fabric.Canvas('game-canvas', {
      width: 900,
      height: 700,
      backgroundColor: '#ffffff',
    });

    fetchSituationGameData();

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasRef, currentProblemOrder]);

  return (
    <CanvasContainer>
      <canvas id="game-canvas"></canvas>
    </CanvasContainer>
  );
};

const CanvasContainer = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default SituationGamePage;
