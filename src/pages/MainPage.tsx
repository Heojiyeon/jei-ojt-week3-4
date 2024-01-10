import {
  TargetComponent,
  addComponentAtom,
  selectedImagesAtom,
} from '@/atoms/component';

import {
  isOpenModalAtom,
  isOpenPreviewModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import Choice from '@/components/Choice';
import Format from '@/components/Format';
import Pagination from '@/components/Pagination';
import Toolbar from '@/components/Toolbar';
import View from '@/components/View';
import Modal from '@/components/common/Modal';
import { fabric } from 'fabric';
import { Ellipse, Image, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

interface addedImage extends Image {
  src: string;
}

const MainPage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const modalTitle = useAtomValue(modalTitleAtom);
  const modalContent = useAtomValue(modalContentAtom);

  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const isOpenPreviewModal = useAtomValue(isOpenPreviewModalAtom);

  const selectedImages = useAtomValue(selectedImagesAtom);
  const setAddComponent = useSetAtom(addComponentAtom);

  const handleAddImagesButton = () => {
    if (selectedImages.length !== null) {
      setAddComponent('image');
    }
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  /**
   * 캔버스 내 line 컴포넌트 추가 함수
   */
  const addLineComponent = (data: Polyline) => {
    console.log('create line');
    const newLine = new fabric.Polyline(data?.points!, {
      width: data.width,
      height: data.height,
      stroke: data.stroke,
      top: data.top,
      left: data.left,
      type: 'line',
    });

    // 추가적인 속성에 따른 생성
    if (data.angle) {
      newLine.set('angle', data.angle);
    }
    if (data.scaleX) {
      newLine.set('scaleX', data.scaleX);
      newLine.set('scaleY', data.scaleY);
    }
    if (data.strokeWidth) {
      newLine.set('strokeWidth', data.strokeWidth);
    }
    if (data.strokeDashArray) {
      newLine.set('strokeDashArray', data.strokeDashArray);
    }

    if (canvasRef.current !== null) {
      canvasRef.current.add(newLine);
      canvasRef.current.requestRenderAll();
    }
  };

  /**
   * 캔버스 내 Circle 컴포넌트 추가 함수
   */
  const addCircleComponent = (data: Ellipse) => {
    console.log('create newCircle');
    const newCircle = new fabric.Ellipse({
      selectable: false,
      width: data.width,
      height: data.height,
      fill: data.fill,
      stroke: data.stroke,
      top: data.top,
      left: data.left,
      rx: data.rx,
      ry: data.ry,
      type: 'circle',
    });

    // 추가적인 속성에 따른 생성
    if (data.angle) {
      newCircle.set('angle', data.angle);
    }
    if (data.scaleX) {
      newCircle.set('scaleX', data.scaleX);
      newCircle.set('scaleY', data.scaleY);
    }
    if (data.strokeWidth) {
      newCircle.set('strokeWidth', data.strokeWidth);
    }
    if (data.strokeDashArray) {
      newCircle.set('strokeDashArray', data.strokeDashArray);
    }

    if (canvasRef.current !== null) {
      canvasRef.current.add(newCircle);
      canvasRef.current.requestRenderAll();
    }
  };

  /**
   * 캔버스 내 Rect 컴포넌트 추가 함수
   */
  const addRectComponent = (data: Rect) => {
    const newRect = new fabric.Rect({
      selectable: false,
      width: data.width,
      height: data.height,
      fill: data.fill,
      stroke: data.stroke,
      top: data.top,
      left: data.left,
      type: 'rect',
    });
    // 추가적인 속성에 따른 생성
    if (data.angle) {
      newRect.set('angle', data.angle);
    }
    if (data.scaleX) {
      newRect.set('scaleX', data.scaleX);
      newRect.set('scaleY', data.scaleY);
    }
    if (data.strokeWidth) {
      newRect.set('strokeWidth', data.strokeWidth);
    }
    if (data.strokeDashArray) {
      newRect.set('strokeDashArray', data.strokeDashArray);
    }

    if (canvasRef.current !== null) {
      canvasRef.current.add(newRect);
      canvasRef.current.requestRenderAll();
    }
  };

  /**
   * 캔버스 내 텍스트 컴포넌트 추가 함수
   */
  const addTextComponent = (data: Textbox) => {
    const newText = new fabric.Textbox('Text', {
      stroke: data.stroke,
      minWidth: data.minWidth,
      width: data.width,
      height: data.height,
      top: data.top,
      left: data.left,
      splitByGrapheme: data.splitByGrapheme,
      styles: data.styles,
      text: data.text,
      type: 'text',
    });
    // 추가적인 속성에 따른 생성
    if (data.angle) {
      newText.set('angle', data.angle);
    }
    if (data.scaleX) {
      newText.set('scaleX', data.scaleX);
      newText.set('scaleY', data.scaleY);
    }
    if (data.strokeWidth) {
      newText.set('strokeWidth', data.strokeWidth);
    }
    if (data.strokeDashArray) {
      newText.set('strokeDashArray', data.strokeDashArray);
    }

    if (canvasRef.current !== null) {
      canvasRef.current.add(newText);
      canvasRef.current.requestRenderAll();
    }
  };

  /**
   * 캔버스 내 이미지 컴포넌트 추가 함수
   */
  const addImageComponent = (data: addedImage) => {
    fabric.Image.fromURL(
      data!.src,
      function (img) {
        img.set('top', data.top);
        img.set('left', data.left);

        // 추가적인 속성에 따른 생성
        if (data.angle) {
          img.set('angle', data.angle);
        }
        if (data.scaleX) {
          img.set('scaleX', data.scaleX);
          img.set('scaleY', data.scaleY);
        }
        if (data.strokeWidth) {
          img.set('strokeWidth', data.strokeWidth);
        }
        if (data.strokeDashArray) {
          img.set('strokeDashArray', data.strokeDashArray);
        }
        if (canvasRef.current !== null) {
          canvasRef.current.add(img);
          canvasRef.current.requestRenderAll();
        }
      },
      {
        crossOrigin: 'Anonymous',
      }
    );
  };

  useEffect(() => {
    if (isOpenPreviewModal) {
      canvasRef.current = new fabric.Canvas('preview-canvas', {
        width: 800,
        height: 700,
        backgroundColor: '#ffffff',
      });

      const entireComponentData =
        window.localStorage.getItem('entireComponent');

      if (entireComponentData) {
        JSON.parse(entireComponentData).map((component: TargetComponent) => {
          switch (component.type) {
            case 'image':
              addImageComponent(component as addedImage);
              break;

            case 'text':
              addTextComponent(component as Textbox);
              break;

            case 'rect':
              addRectComponent(component as Rect);
              break;

            case 'circle':
              addCircleComponent(component as Ellipse);
              break;

            case 'line':
              addLineComponent(component as Polyline);
              break;

            default:
              break;
          }
          canvasRef.current?.renderAll();
        });
      }

      return () => {
        if (canvasRef.current !== null) {
          canvasRef.current.dispose();
        }
      };
    }
  }, [canvasRef, isOpenPreviewModal]);

  return (
    <>
      {isOpenModal && (
        <Modal title={modalTitle}>
          {modalTitle === 'Image List' && (
            <div>
              <div id="modal-image-content">{modalContent}</div>
              <Pagination />
              <button onClick={handleAddImagesButton}>추가</button>
            </div>
          )}
        </Modal>
      )}
      {isOpenPreviewModal && (
        <Modal title={modalTitle}>
          {modalTitle === 'Preview' && <canvas id="preview-canvas"></canvas>}
        </Modal>
      )}
      <Toolbar />
      <Format />
      <View />
      <Choice />
    </>
  );
};

export default MainPage;
