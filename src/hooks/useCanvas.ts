import { fabric } from 'fabric';
import { useEffect } from 'react';

type useCanvasProp = {
  fetchDataFn: () => Promise<void>;
  currentCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
};

/** @function
 * @param props 문제 데이터 패칭 함수, 캔버스 Ref
 * @description 캔버스 생성 훅
 */
const useCanvas = (props: useCanvasProp) => {
  const { fetchDataFn, currentCanvasRef } = props;

  useEffect(() => {
    currentCanvasRef.current = new fabric.Canvas('game-canvas', {
      width: 900,
      height: 700,
      backgroundColor: '#ffffff',
    });

    fetchDataFn();

    return () => {
      if (currentCanvasRef.current !== null) {
        currentCanvasRef.current.dispose();
      }
    };
  }, [currentCanvasRef]);
};

export default useCanvas;
