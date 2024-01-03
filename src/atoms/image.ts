import { Image } from '@/types/Image';
import { atom } from 'jotai';

const numOfImagesAtom = atom<number>(0);
const ImagesAtom = atom<Image[] | null>(null);

export { ImagesAtom, numOfImagesAtom };
