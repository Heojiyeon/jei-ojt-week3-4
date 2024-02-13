import { selectedImagesAtom } from '@/atoms/component';
import { ImagesAtom, numOfImagesAtom } from '@/atoms/image';
import { modalContentAtom } from '@/atoms/modal';
import { numOfPageLimitAtom, pageAtom } from '@/atoms/pagination';
import { ALERT_FIRST_PAGE, ALERT_LAST_PAGE } from '@/constants/game';
import { Image } from '@/types/Image';
import { clickImage, getImageUrl } from '@/utils/handleImage';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

/**
 * @returns 페이지네이션 컴포넌트
 */
const Pagination = () => {
  const images = useAtomValue(ImagesAtom);
  const totalNumOfImages = useAtomValue(numOfImagesAtom);
  const numOfPageLimit = useAtomValue(numOfPageLimitAtom);

  const setPage = useSetAtom(pageAtom);
  const setModalContent = useSetAtom(modalContentAtom);
  const setSelectedImages = useSetAtom(selectedImagesAtom);

  const [startPageNumber, setStartPageNumber] = useState(0);

  const numOfImages = Math.ceil(totalNumOfImages / numOfPageLimit);

  /**
   * 이동 버튼 클릭 핸들링 함수
   * @param isLeftSide {boolean} 왼쪽 버튼 여부
   * @param startPageNumber {number} 현재 시작 페이지 번호
   */
  const handleMoveButton = (isLeftSide: boolean, startPageNumber: number) => {
    if (isLeftSide) {
      startPageNumber > 1
        ? setStartPageNumber(prevStartPageNumber => (prevStartPageNumber -= 4))
        : alert(ALERT_FIRST_PAGE);
    } else {
      startPageNumber <= 86
        ? setStartPageNumber(prevStartPageNumber => (prevStartPageNumber += 4))
        : alert(ALERT_LAST_PAGE);
    }
  };

  /**
   * 페이지 번호에 따른 모달 내 이미지 컴포넌트 생성 함수
   * @param currentPage 현재 페이지 번호
   */
  const setModalContentByPage = async (currentPage: number) => {
    const offset = currentPage * numOfPageLimit;

    if (images) {
      const slicedImages = images.slice(offset, offset + numOfPageLimit);

      setModalContent(
        <>
          {slicedImages &&
            slicedImages.map((image: Image) => (
              <img
                className="image-item"
                key={image.imageId}
                src={getImageUrl(image)}
                alt="이미지"
                width={160}
                height={140}
                onClick={() =>
                  clickImage(setSelectedImages, getImageUrl(image))
                }
              />
            ))}
        </>
      );
    }
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={() => handleMoveButton(true, startPageNumber)}>
        <AiOutlineDoubleLeft />
      </StyledButton>
      <div id="for-button">
        {Array(numOfImages)
          .fill(0)
          .map((_, index) => {
            if (index >= startPageNumber && index <= startPageNumber + 4) {
              return (
                <StyledButton
                  key={index}
                  onClick={() => {
                    setPage(index);
                    setModalContentByPage(index);
                  }}
                >
                  {index + 1}
                </StyledButton>
              );
            }
          })}
      </div>
      <StyledButton onClick={() => handleMoveButton(false, startPageNumber)}>
        <AiOutlineDoubleRight />
      </StyledButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const StyledButton = styled('button')`
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1rem;
  background: none;
  margin: 0.2rem;
  border: 0.8px solid #a7a8aa;
  border-radius: 10px;
`;

export default Pagination;
