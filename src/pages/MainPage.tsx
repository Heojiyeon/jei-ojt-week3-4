import { addComponentAtom, selectedImagesAtom } from '@/atoms/component';
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
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

const MainPage = () => {
  const modalTitle = useAtomValue(modalTitleAtom);
  const modalContent = useAtomValue(modalContentAtom);

  const selectedImages = useAtomValue(selectedImagesAtom);

  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const setAddComponent = useSetAtom(addComponentAtom);

  const handleAddImagesButton = () => {
    if (selectedImages.length !== null) {
      setAddComponent('image');
    }
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  return (
    <>
      {isOpenModal && (
        <Modal title={modalTitle}>
          {modalTitle === 'Image List' && (
            <div>
              <div id="modal-image-content">{modalContent}</div>
              <Pagination />
              <button onClick={handleAddImagesButton}>추가</button>
            </div>
          )}
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
