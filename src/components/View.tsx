import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';

const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 1008,
      height: 970,
      backgroundColor: '#ffffff',
    });

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasRef]);

  return <canvas id="view-canvas"></canvas>;
};

export default View;
