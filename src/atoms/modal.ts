import { atom } from 'jotai';

const isOpenModalAtom = atom(false);
const modalTitleAtom = atom('');

export { isOpenModalAtom, modalTitleAtom };
