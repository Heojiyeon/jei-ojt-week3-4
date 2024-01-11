import {
  TargetComponent,
  addComponentAtom,
  addedGroup,
  addedImage,
  choiceComponentAtom,
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
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedImageComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
} from '@/utils/handleComponent';
import { fabric } from 'fabric';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const MainPage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const modalTitle = useAtomValue(modalTitleAtom);
  const modalContent = useAtomValue(modalContentAtom);

  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const isOpenPreviewModal = useAtomValue(isOpenPreviewModalAtom);

  const selectedImages = useAtomValue(selectedImagesAtom);
  const setAddComponent = useSetAtom(addComponentAtom);

  const setChoiceComponent = useSetAtom(choiceComponentAtom);

  const handleAddImagesButton = () => {
    if (selectedImages.length !== null) {
      setAddComponent('image');
    }
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  useEffect(() => {
    const alreadyExistedChoices = window.localStorage.getItem('choices');

    if (alreadyExistedChoices) {
      setChoiceComponent(JSON.parse(alreadyExistedChoices));
    }
  }, []);

  useEffect(() => {
    if (isOpenPreviewModal) {
      canvasRef.current = new fabric.Canvas('preview-canvas', {
        width: 800,
        height: 700,
        backgroundColor: '#ffffff',
      });

      /**
       * 기존에 저장된 컴포넌트가 있는지 확인해서 화면에 출력
       */
      const entireComponentData =
        window.localStorage.getItem('entireComponent');

      if (entireComponentData) {
        JSON.parse(entireComponentData).map(
          async (component: TargetComponent) => {
            // console.log(typeof component, component as Group);
            switch (component.type) {
              case 'group':
                const createdGroup = addExistedGroupComponent(
                  component as addedGroup
                );
                canvasRef.current?.add(createdGroup as addedGroup);
                canvasRef.current?.requestRenderAll();
                break;

              case 'image':
                const createdImage = await addExistedImageComponent(
                  component as addedImage
                );
                canvasRef.current?.add(createdImage as addedImage);
                canvasRef.current?.requestRenderAll();
                break;

              case 'text':
                const createdText = addExistedTextComponent(
                  component as Textbox
                );
                canvasRef.current?.add(createdText as Textbox);
                canvasRef.current?.requestRenderAll();
                break;

              case 'rect':
                const createdRect = addExistedRectComponent(component as Rect);
                canvasRef.current?.add(createdRect as Rect);
                canvasRef.current?.requestRenderAll();
                break;

              case 'circle':
                const createdCircle = addExistedCircleComponent(
                  component as Ellipse
                );
                canvasRef.current?.add(createdCircle as Ellipse);
                canvasRef.current?.requestRenderAll();
                break;

              case 'line':
                const createdLine = addExistedLineComponent(
                  component as Polyline
                );
                canvasRef.current?.add(createdLine as Polyline);
                canvasRef.current?.requestRenderAll();
                break;

              default:
                break;
            }
            canvasRef.current?.renderAll();
          }
        );
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
