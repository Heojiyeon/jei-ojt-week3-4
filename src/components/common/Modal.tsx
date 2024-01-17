import {
  isOpenModalAtom,
  isOpenPreviewModalAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import { pageAtom } from '@/atoms/pagination';
import styled from '@emotion/styled';
import { useAtom, useSetAtom } from 'jotai';
import { ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

type ModalProps = {
  title?: string;
  children: ReactNode;
};

const Modal = ({ title, children }: ModalProps) => {
  const setPage = useSetAtom(pageAtom);
  const setIsOpenModal = useSetAtom(isOpenModalAtom);
  const setIsOpenPreviewModal = useSetAtom(isOpenPreviewModalAtom);

  const [modalTitle, setModalTitle] = useAtom(modalTitleAtom);

  const closeModal = useCallback(
    (
      e:
        | React.MouseEvent<HTMLDivElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();

      if (modalTitle === 'Preview') {
        setIsOpenPreviewModal(false);
      } else {
        setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
      }

      setModalTitle('');
      setPage(1);
    },
    [setIsOpenModal, setModalTitle]
  );

  return createPortal(
    <BackgroundDim>
      <ModalContainer
        style={{
          transition: 'all ease 0.2s',
        }}
      >
        <ModalTitle>{title}</ModalTitle>
        {title !== '게임페이지' && (
          <ModalCloseButton onClick={closeModal}>
            <AiOutlineClose />
          </ModalCloseButton>
        )}
        <ModalContentContainer>{children}</ModalContentContainer>
      </ModalContainer>
    </BackgroundDim>,
    document.body
  );
};

const BackgroundDim = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(40, 40, 40, 0.2);
`;

const ModalContainer = styled('div')`
  width: 940px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px 10px 10px 10px;
`;

const ModalTitle = styled('div')`
  font-size: 1.8rem;
  margin: 1.8rem;
`;

const ModalCloseButton = styled('button')`
  font-size: 1.8rem;
  position: fixed;
  top: 1.8rem;
  right: 1.8rem;
  margin: 4px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const ModalContentContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
