import { Image } from '@/types/Image';
import { SetStateAction } from 'react';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

export const clickImage = (
  setSelectedImages: SetAtom<[SetStateAction<string[]>], void>,
  imageUrl: string
) => {
  setSelectedImages(prevSelectedImages => [...prevSelectedImages, imageUrl]);
};

export const getImageUrl = (currentContent: Image) => {
  return `https://sol-api.esls.io/images/A1/${currentContent.imageId}.${currentContent.extension}`;
};
