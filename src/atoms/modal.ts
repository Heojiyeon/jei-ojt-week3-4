import { atom } from 'jotai';

const isOpenModalAtom = atom(false);
const modalTitleAtom = atom('');
const modalContentAtom = atom<JSX.Element | null>(null);

export { isOpenModalAtom, modalContentAtom, modalTitleAtom };
