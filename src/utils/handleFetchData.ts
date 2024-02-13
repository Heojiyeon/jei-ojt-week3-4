import { addedGroup, addedImage } from '@/atoms/component';
import { getIndexedDB } from '@/data';
import { Games } from '@/types/Game';
import { HandledProblem, Problem } from '@/types/Problem';
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
} from './handleComponent';
import { handlePreviewComponent } from './handlePreviewComponent';
import { fabric } from 'fabric';
import { ChoiceOptionContent } from '@/types/Choice';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';

const { VITE_TARGET_ORIGIN } = import.meta.env;

/** @function
 * @returns 문제 정보 데이터
 * @description indexedDB 내부에서 문제 정보 데이터를 가져오는 함수
 */
export const fetchData = async (currentGameType: Games) => {
  const entireProblems: HandledProblem[] = [];
  try {
    const problems = (await getIndexedDB({
      gameType: currentGameType,
    })) as Problem[];

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

/** @function
 * @description 전체 문제 정보 중 현재 문제 순서에 따라 문항을 생성하는 함수
 */

type handleFetchDataProp = {
  currentProblemOrder: number;
  countOfCorrect: number;
  setCountOfCorrect: (value: React.SetStateAction<number>) => void;
  setCurrentProblemOrder: (value: React.SetStateAction<number>) => void;
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  problems: HandledProblem[];
};

export const handleFetchData = ({
  currentProblemOrder,
  countOfCorrect,
  setCountOfCorrect,
  setCurrentProblemOrder,
  canvasRef,
  problems,
}: handleFetchDataProp) => {
  if (currentProblemOrder >= problems.length) {
    const result = [countOfCorrect === 0 ? 0 : countOfCorrect, problems[0].id];
    window.parent.postMessage(result, VITE_TARGET_ORIGIN);
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
                createdGroup.left!,
                setCountOfCorrect,
                setCurrentProblemOrder,
                canvasRef
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
                    img.left!,
                    setCountOfCorrect,
                    setCurrentProblemOrder,
                    canvasRef
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
                createdText.left!,
                setCountOfCorrect,
                setCurrentProblemOrder,
                canvasRef
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
                createdRect.left!,
                setCountOfCorrect,
                setCurrentProblemOrder,
                canvasRef
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
                createdCircle.left!,
                setCountOfCorrect,
                setCurrentProblemOrder,
                canvasRef
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
                createdLine.left!,
                setCountOfCorrect,
                setCurrentProblemOrder,
                canvasRef
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
