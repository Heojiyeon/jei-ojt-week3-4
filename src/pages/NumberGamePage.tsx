import { GAME_TYPE_NUMBER } from '@/constants/game';
import useCanvas from '@/hooks/useCanvas';
import { fetchData, handleFetchData } from '@/utils/handleFetchData';
import styled from '@emotion/styled';
import { fabric } from 'fabric';
import { useRef, useState } from 'react';

/**
 * @returns 숫자 맞추기 게임 페이지
 */
const NumberGamePage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [currentProblemOrder, setCurrentProblemOrder] = useState(0);
  const [countOfCorrect, setCountOfCorrect] = useState(0);

  const fetchNumberGameData = async () => {
    const problems = await fetchData(GAME_TYPE_NUMBER);

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
  useCanvas({
    fetchDataFn: fetchNumberGameData,
    currentCanvasRef: canvasRef,
  });

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

export default NumberGamePage;
