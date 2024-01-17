import { SavedComponent, addedGroup, addedImage } from '@/atoms/component';
import Modal from '@/components/common/Modal';
import { getIndexedDB } from '@/data';
import { ChoiceOptionContent } from '@/types/Choice';
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
} from '@/utils/handleComponent';
import { fabric } from 'fabric';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useEffect, useRef, useState } from 'react';

interface Problem {
  id: string;
  content: string;
  choice: string;
}

interface HandledProblem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceOptionContent[];
}

const { VITE_TARGET_ORIGIN } = import.meta.env;

const GamePage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [currentProblemOrder, setCurrentProblemOrder] = useState(0);
  const [countOfCorrect, setCountOfCorrect] = useState(0);

  const handlePreviewComponent = (
    choiceComponent: ChoiceOptionContent[],
    currentComponentName: string,
    currentTop: number,
    currentLeft: number
  ) => {
    const correctComponentName = choiceComponent.filter(
      component => component.isCorrect === true
    )[0].name;

    let bubbleText: fabric.Text;

    // 정답인 경우
    if (correctComponentName && correctComponentName === currentComponentName) {
      setCountOfCorrect(prevCountOfCorrect => (prevCountOfCorrect += 1));

      bubbleText = new fabric.Text('정답입니다!', {
        fontSize: 30,
        fill: '#0000FF',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
    }
    // 오답인 경우
    else {
      bubbleText = new fabric.Text('오답입니다!', {
        fontSize: 30,
        fill: '#E5001A',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
    }

    setTimeout(() => {
      canvasRef.current?.remove(bubbleText);
      canvasRef.current?.clear();
      setCurrentProblemOrder(
        prevCurrentProblemOrder => (prevCurrentProblemOrder += 1)
      );
    }, 500);
  };

  /**
   * indexedDB 데이터 불러오기
   */
  const fetchData = async () => {
    const entireProblems: HandledProblem[] = [];
    try {
      const problems = (await getIndexedDB()) as Problem[];

      problems.map((problem: Problem) => {
        const modifiedProblem = {
          ...problem,
          content: JSON.parse(problem.content),
          choice: JSON.parse(problem.choice),
        };
        entireProblems.push(modifiedProblem);
      });
    } catch (error) {
      console.error('Error getting problems:', error);
    }
    return entireProblems;
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

    /**
     * 문제 생성∏
     */
    const handleFetchData = async () => {
      const problems = await fetchData();

      if (currentProblemOrder >= problems.length) {
        window.parent.postMessage(countOfCorrect, VITE_TARGET_ORIGIN);
        return;
      }

      const { content, choice } = problems && problems[currentProblemOrder];

      content &&
        content.forEach(targetContent => {
          switch (targetContent.info.type) {
            case 'group':
              const createdGroup = addExistedGroupComponent(
                targetContent.info as addedGroup
              );
              createdGroup.set('name', targetContent.name);
              createdGroup.set('selectable', false);
              createdGroup.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  targetChoice => targetChoice.name === targetContent.name
                ) !== -1
              ) {
                createdGroup.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
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
              } = targetContent.info as addedImage;
              fabric.Image.fromURL(
                src,
                function (img) {
                  img.set('name', targetContent.name);
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
                    choice.findIndex(
                      (choice: ChoiceOptionContent) =>
                        choice.name === targetContent.name
                    ) !== -1
                  ) {
                    img.on('mousedown', () =>
                      handlePreviewComponent(
                        choice,
                        img.name!,
                        img.top!,
                        img.left!
                      )
                    );
                    img.set('hoverCursor', 'pointer');
                  }

                  canvasRef.current?.add(img as addedImage);
                  canvasRef.current?.requestRenderAll();
                },
                {
                  crossOrigin: src,
                }
              );
              break;

            case 'text':
              const createdText = addExistedTextComponent(
                targetContent.info as Textbox
              );
              createdText.set('fontSize', 30);
              createdText.set('name', targetContent.name);
              createdText.set('fontFamily', 'SUIT-Regular');
              createdText.set('selectable', false);
              createdText.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === targetContent.name
                ) !== -1
              ) {
                createdText.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
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
                targetContent.info as Rect
              );
              createdRect.set('name', targetContent.name);
              createdRect.set('selectable', false);
              createdRect.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === targetContent.name
                ) !== -1
              ) {
                createdRect.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
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
                targetContent.info as Ellipse
              );
              createdCircle.set('name', targetContent.name);
              createdCircle.set('selectable', false);
              createdCircle.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === targetContent.name
                ) !== -1
              ) {
                createdCircle.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
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
                targetContent.info as Polyline
              );
              createdLine.set('name', targetContent.name);
              createdLine.set('selectable', false);
              createdLine.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === targetContent.name
                ) !== -1
              ) {
                createdLine.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
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
        });
    };
    handleFetchData();

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasRef, currentProblemOrder]);

  return (
    <div>
      <Modal>
        <canvas id="game-canvas"></canvas>
      </Modal>
    </div>
  );
};

export default GamePage;
