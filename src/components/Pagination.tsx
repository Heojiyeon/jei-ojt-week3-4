import { ImagesAtom, numOfImagesAtom } from '@/atoms/image';
import { modalContentAtom } from '@/atoms/modal';
import { numOfPageLimitAtom, pageAtom } from '@/atoms/pagination';
import { Image } from '@/types/Image';
import styled from '@emotion/styled';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Pagination = () => {
  const images = useAtomValue(ImagesAtom);
  const totalNumOfImages = useAtomValue(numOfImagesAtom);
  const numOfPageLimit = useAtomValue(numOfPageLimitAtom);

  const [, setPage] = useAtom(pageAtom);
  const [, setModalContent] = useAtom(modalContentAtom);

  const [startPageNumber, setStartPageNumber] = useState(0);

  const numOfImages = Math.ceil(totalNumOfImages / numOfPageLimit);

  const setModalContentByPage = async (currentPage: number) => {
    const getImageUrl = (currentContent: Image) =>
      `https://sol-api.esls.io/images/A1/${currentContent?.imageId}.${currentContent?.extension}`;

    const offset = currentPage * numOfPageLimit;

    const slicedImages =
      images && images.slice(offset, offset + numOfPageLimit);

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
            />
          ))}
      </>
    );
  };

  return (
    <PaginationContainer>
      <StyledButton
        onClick={() => {
          if (startPageNumber > 1) {
            setStartPageNumber(
              prevStartPageNumber => (prevStartPageNumber -= 4)
            );
          } else {
            alert('가장 첫 페이지 입니다!');
          }
        }}
      >
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
      <StyledButton
        onClick={() => {
          if (startPageNumber <= 86) {
            setStartPageNumber(
              prevStartPageNumber => (prevStartPageNumber += 4)
            );
          } else {
            alert('가장 마지막 페이지 입니다!');
          }
        }}
      >
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