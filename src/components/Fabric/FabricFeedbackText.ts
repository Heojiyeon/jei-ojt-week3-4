import fabric from '@/controller/fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricFeedbackTextProp = {
  isCorrect: boolean;
  currentTop: number;
  currentLeft: number;
};

/**
 * 패브릭 피드백 텍스트 컴포넌트
 */
class FabricFeedbackText {
  private FabricFeedbackText: fabric.Text;

  constructor({ isCorrect, currentTop, currentLeft }: FabricFeedbackTextProp) {
    this.FabricFeedbackText = new fabric.Text(
      isCorrect ? '정답입니다!' : '오답입니다!',
      {
        name: uuidv4(),
        fontSize: 30,
        fill: isCorrect ? '#0000FF' : '#E5001A',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      }
    );
  }
  render(): fabric.Text {
    return this.FabricFeedbackText;
  }
}

export default FabricFeedbackText;
