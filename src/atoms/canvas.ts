import { atom } from 'jotai';

const canvasRefAtom = atom<fabric.Canvas | null>(null);

export { canvasRefAtom };
