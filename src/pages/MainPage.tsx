import { isOpenModalAtom, modalTitleAtom } from '@/atoms/modal';
import Choice from '@/components/Choice';
import Format from '@/components/Format';
import Toolbar from '@/components/Toolbar';
import View from '@/components/View';
import Modal from '@/components/common/Modal';
import { useAtomValue } from 'jotai';

const MainPage = () => {
  const isOpenModal = useAtomValue(isOpenModalAtom);
  const modalTitle = useAtomValue(modalTitleAtom);

  return (
    <>
      {isOpenModal && (
        <Modal title={modalTitle}>{<div>tmp content</div>}</Modal>
      )}
      <Toolbar />
      <Format />
      <View />
      <Choice />
    </>
  );
};

export default MainPage;
