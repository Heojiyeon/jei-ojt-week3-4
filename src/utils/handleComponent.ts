import { TargetComponent, addedGroup, addedImage } from '@/atoms/component';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

/**
 * 캔버스 내 line 컴포넌트 추가 함수
 */
export const addExistedLineComponent = (data: Polyline) => {
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

  return newLine;
};

/**
 * 캔버스 내 Circle 컴포넌트 추가 함수
 */
export const addExistedCircleComponent = (data: Ellipse) => {
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

  return newCircle;
};

/**
 * 캔버스 내 Rect 컴포넌트 추가 함수
 */
export const addExistedRectComponent = (data: Rect) => {
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

  return newRect;
};

/**
 * 캔버스 내 텍스트 컴포넌트 추가 함수
 */
export const addExistedTextComponent = (data: Textbox) => {
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
  return newText;
};

/**
 * 캔버스 내 이미지 컴포넌트 추가 함수
 */
export const addExistedImageComponent = (data: addedImage) => {
  return new Promise((resolve, _) => {
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

        resolve(img);
      },
      {
        crossOrigin: data!.src,
      }
    );
  });
};

export const addExistedGroupComponent = (data: addedGroup) => {
  // objects에 따라 생성
  const createdObjects: TargetComponent[] = [];

  data.objects.map(async object => {
    switch (object.type) {
      case 'image':
        const newImage = await addExistedImageComponent(object as addedImage);
        createdObjects.push(newImage as addedImage);
        break;

      case 'text':
        const newText = addExistedTextComponent(object as Textbox);
        createdObjects.push(newText);
        break;

      case 'rect':
        const newRect = addExistedRectComponent(object as Rect);
        createdObjects.push(newRect);
        break;

      case 'circle':
        const newCircle = addExistedCircleComponent(object as Ellipse);
        createdObjects.push(newCircle);
        break;

      case 'line':
        const newLine = addExistedLineComponent(object as Polyline);
        createdObjects.push(newLine);
        break;

      default:
        break;
    }
  });
  // group에 추가
  const newGroup = new fabric.Group(createdObjects, {
    top: data.top,
    left: data.left,
  });
  return newGroup;
};
