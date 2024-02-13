import FabricFeedbackText from '@/components/Fabric/FabricFeedbackText';
import { ChoiceOptionContent } from '@/types/Choice';

/** @function
 * @param choiceComponent 모든 선택지 옵션 컴포넌트
 * @param currentComponentName 선택된 컴포넌트 이름
 * @param currentTop 컴포넌트의 y축 위치 값
 * @param currentLeft 컴포넌트의 x축 위치 값
 * @param setCountOfCorrect 정답 개수를 카운트하는 함수
 * @param setCurrentProblemOrder 현재 문항의 순서를 바꾸는 함수
 * @description 캔버스 내에 컴포넌트를 생성하는 함수
 */
export const handlePreviewComponent = (
  choiceComponent: ChoiceOptionContent[],
  currentComponentName: string,
  currentTop: number,
  currentLeft: number,
  setCountOfCorrect: (value: React.SetStateAction<number>) => void,
  setCurrentProblemOrder: (value: React.SetStateAction<number>) => void,
  canvasRef: React.MutableRefObject<fabric.Canvas | null>
) => {
  const correctComponentName = choiceComponent.filter(
    component => component.isCorrect === true
  )[0].name;

  let bubbleText: fabric.Text;

  if (correctComponentName && correctComponentName === currentComponentName) {
    setCountOfCorrect(prevCountOfCorrect => (prevCountOfCorrect += 1));

    bubbleText = new FabricFeedbackText({
      isCorrect: true,
      currentTop,
      currentLeft,
    }).render();
  } else {
    setCountOfCorrect(prevCountOfCorrect => {
      return prevCountOfCorrect ? prevCountOfCorrect : 0;
    });

    bubbleText = new FabricFeedbackText({
      isCorrect: false,
      currentTop,
      currentLeft,
    }).render();
  }

  canvasRef.current?.add(bubbleText);

  setTimeout(() => {
    canvasRef.current?.remove(bubbleText);
    canvasRef.current?.clear();
    setCurrentProblemOrder(
      prevCurrentProblemOrder => (prevCurrentProblemOrder += 1)
    );
  }, 500);
};
