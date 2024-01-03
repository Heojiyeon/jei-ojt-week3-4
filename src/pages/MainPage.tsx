import {
  isOpenModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import Choice from '@/components/Choice';
import Format from '@/components/Format';
import Pagination from '@/components/Pagination';
import Toolbar from '@/components/Toolbar';
import View from '@/components/View';
import Modal from '@/components/common/Modal';
import { useAtomValue } from 'jotai';

const MainPage = () => {
  const isOpenModal = useAtomValue(isOpenModalAtom);
  const modalTitle = useAtomValue(modalTitleAtom);
  const modalContent = useAtomValue(modalContentAtom);

  return (
    <>
      {isOpenModal && (
        <Modal title={modalTitle}>
          <div>
            <div id="modal-image-content">{modalContent}</div>
            <Pagination />
          </div>
        </Modal>
      )}
      <Toolbar />
      <Format />
      <View />
      <Choice />
    </>
  );
};

export default MainPage;
