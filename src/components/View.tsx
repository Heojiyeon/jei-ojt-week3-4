import { entireComponentAtom } from '@/atoms/component';
import { fabric } from 'fabric';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';

const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const entireComponent = useAtomValue(entireComponentAtom);

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 1008,
      height: 970,
      backgroundColor: '#ffffff',
    });

    if (entireComponent.length !== 0) {
      entireComponent.map(component => {
        if (canvasRef.current !== null) {
          canvasRef.current.add(component.render());
        }
      });

      canvasRef.current.renderAll();
    }

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasRef, entireComponent]);

  return <canvas id="view-canvas"></canvas>;
};

export default View;
