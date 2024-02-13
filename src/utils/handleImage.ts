import { Image } from '@/types/Image';
import { SetStateAction } from 'react';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

/** @function
 * @param setSelectedImages 선택된 이미지를 selectedImages 배열에 추가할 함수
 * @param imageUrl 이미지 url 정보
 * @description 선택된 이미지를 핸들링하는 함수
 */
export const clickImage = (
  setSelectedImages: SetAtom<[SetStateAction<string[]>], void>,
  imageUrl: string
) => {
  setSelectedImages(prevSelectedImages => [...prevSelectedImages, imageUrl]);
};

/** @function
 * @param currentContent 현재 이미지 정보
 * @returns 해당 이미지의 url
 */
export const getImageUrl = (currentContent: Image) => {
  return `https://sol-api.esls.io/images/A1/${currentContent.imageId}.${currentContent.extension}`;
};
