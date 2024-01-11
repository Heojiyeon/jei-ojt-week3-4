import {
  SavedComponent,
  addComponentAtom,
  addedGroup,
  addedImage,
  choiceComponentAtom,
  selectedImagesAtom,
} from '@/atoms/component';
import styled from '@emotion/styled';

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

  const [choiceComponent, setChoiceComponent] = useAtom(choiceComponentAtom);

  const handleAddImagesButton = () => {
    if (selectedImages.length !== null) {
      setAddComponent('image');
    }
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  const handlePreviewComponent = (
    currentComponentName: string,
    currentTop: number,
    currentLeft: number
  ) => {
    const correctComponentName = choiceComponent.filter(
      component => component.isCorrect === true
    )[0].name;

    if (correctComponentName && correctComponentName === currentComponentName) {
      const bubbleText = new fabric.Text('정답입니다!', {
        fontSize: 30,
        fill: '#0000FF',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
      setTimeout(() => {
        canvasRef.current?.remove(bubbleText);
      }, 500);
    } else {
      const bubbleText = new fabric.Text('오답입니다!', {
        fontSize: 30,
        fill: '#E5001A',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
      setTimeout(() => {
        canvasRef.current?.remove(bubbleText);
      }, 500);
    }
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
        selection: false,
      });

      /**
       * 기존에 저장된 컴포넌트가 있는지 확인해서 화면에 출력
       */
      const entireComponentData =
        window.localStorage.getItem('entireComponent');

      if (entireComponentData) {
        JSON.parse(entireComponentData).map(
          async (component: SavedComponent) => {
            switch (component.info.type) {
              case 'group':
                const createdGroup = addExistedGroupComponent(
                  component.info as addedGroup
                );
                createdGroup.set('name', component.name);
                createdGroup.set('selectable', false);
                createdGroup.set('hoverCursor', 'default');

                if (
                  choiceComponent.findIndex(
                    choice => choice.name === component.name
                  ) !== -1
                ) {
                  createdGroup.on('mousedown', () =>
                    handlePreviewComponent(
                      createdGroup.name!,
                      createdGroup.top!,
                      createdGroup.left!
                    )
                  );
                  createdGroup.set('hoverCursor', 'pointer');
                }

                canvasRef.current?.add(createdGroup as addedGroup);
                canvasRef.current?.requestRenderAll();
                break;

              case 'image':
                const {
                  src,
                  top,
                  left,
                  angle,
                  scaleX,
                  scaleY,
                  strokeWidth,
                  strokeDashArray,
                } = component.info as addedImage;
                fabric.Image.fromURL(
                  src,
                  function (img) {
                    img.set('name', component.name);
                    img.set('top', top);
                    img.set('left', left);

                    // 추가적인 속성에 따른 생성
                    if (angle) {
                      img.set('angle', angle);
                    }
                    if (scaleX) {
                      img.set('scaleX', scaleX);
                      img.set('scaleY', scaleY);
                    }
                    if (strokeWidth) {
                      img.set('strokeWidth', strokeWidth);
                    }
                    if (strokeDashArray) {
                      img.set('strokeDashArray', strokeDashArray);
                    }

                    img.set('selectable', false);
                    img.set('hoverCursor', 'default');

                    if (
                      choiceComponent.findIndex(
                        choice => choice.name === component.name
                      ) !== -1
                    ) {
                      img.on('mousedown', () =>
                        handlePreviewComponent(img.name!, img.top!, img.left!)
                      );
                      img.set('hoverCursor', 'pointer');
                    }

                    canvasRef.current?.add(img as addedImage);
                    canvasRef.current?.requestRenderAll();
                  },
                  {
                    crossOrigin: 'Anonymous',
                  }
                );
                break;

              case 'text':
                const createdText = addExistedTextComponent(
                  component.info as Textbox
                );
                createdText.set('fontSize', 30);
                createdText.set('name', component.name);
                createdText.set('fontFamily', 'SUIT-Regular');
                createdText.set('selectable', false);
                createdText.set('hoverCursor', 'default');

                if (
                  choiceComponent.findIndex(
                    choice => choice.name === component.name
                  ) !== -1
                ) {
                  createdText.on('mousedown', () =>
                    handlePreviewComponent(
                      createdText.name!,
                      createdText.top!,
                      createdText.left!
                    )
                  );
                  createdText.set('hoverCursor', 'pointer');
                }

                canvasRef.current?.add(createdText as Textbox);
                canvasRef.current?.requestRenderAll();
                break;

              case 'rect':
                const createdRect = addExistedRectComponent(
                  component.info as Rect
                );
                createdRect.set('name', component.name);
                createdRect.set('selectable', false);
                createdRect.set('hoverCursor', 'default');

                if (
                  choiceComponent.findIndex(
                    choice => choice.name === component.name
                  ) !== -1
                ) {
                  createdRect.on('mousedown', () =>
                    handlePreviewComponent(
                      createdRect.name!,
                      createdRect.top!,
                      createdRect.left!
                    )
                  );
                  createdRect.set('hoverCursor', 'pointer');
                }

                canvasRef.current?.add(createdRect as Rect);
                canvasRef.current?.requestRenderAll();
                break;

              case 'circle':
                const createdCircle = addExistedCircleComponent(
                  component.info as Ellipse
                );
                createdCircle.set('name', component.name);
                createdCircle.set('selectable', false);
                createdCircle.set('hoverCursor', 'default');

                if (
                  choiceComponent.findIndex(
                    choice => choice.name === component.name
                  ) !== -1
                ) {
                  createdCircle.on('mousedown', () =>
                    handlePreviewComponent(
                      createdCircle.name!,
                      createdCircle.top!,
                      createdCircle.left!
                    )
                  );
                  createdCircle.set('hoverCursor', 'pointer');
                }

                canvasRef.current?.add(createdCircle as Ellipse);
                canvasRef.current?.requestRenderAll();
                break;

              case 'line':
                const createdLine = addExistedLineComponent(
                  component.info as Polyline
                );
                createdLine.set('name', component.name);
                createdLine.set('selectable', false);
                createdLine.set('hoverCursor', 'default');

                if (
                  choiceComponent.findIndex(
                    choice => choice.name === component.name
                  ) !== -1
                ) {
                  createdLine.on('mousedown', () =>
                    handlePreviewComponent(
                      createdLine.name!,
                      createdLine.top!,
                      createdLine.left!
                    )
                  );
                  createdLine.set('hoverCursor', 'pointer');
                }

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
            <ModalContentContainer>
              <div id="modal-image-content">{modalContent}</div>
              <Pagination />
              <AddButtonContainer>
                <AddButton onClick={handleAddImagesButton}>추가</AddButton>
              </AddButtonContainer>
            </ModalContentContainer>
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

const ModalContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const AddButtonContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const AddButton = styled('button')`
  background: none;
  border: 1px solid #7286d3;
  width: 5rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: semibold;
  border-radius: 8px;
  color: #7286d3;
  &:hover {
    cursor: pointer;
    background-color: #7286d3;
    color: #ffffff;
    border: 1px solid #7286d3;
  }
`;

export default MainPage;
