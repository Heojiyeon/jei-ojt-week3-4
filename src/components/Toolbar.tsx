import styled from '@emotion/styled';
import Button from './common/Button';
import Text from './common/Text';

import { BiCircle, BiRectangle } from 'react-icons/bi';
import { BsBorderStyle, BsBorderWidth } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { GiPaintBrush } from 'react-icons/gi';
import { LuImagePlus } from 'react-icons/lu';
import { MdPreview } from 'react-icons/md';
import { PiLineSegment } from 'react-icons/pi';
import { RiPaintFill } from 'react-icons/ri';
import { TbTextIncrease } from 'react-icons/tb';

import { getImages } from '@/apis/image';
import {
  addComponentAtom,
  addGroupComponentAtom,
  choiceComponentAtom,
  entireComponentAtom,
  selectedImagesAtom,
} from '@/atoms/component';
import { ImagesAtom, numOfImagesAtom } from '@/atoms/image';
import {
  isOpenModalAtom,
  isOpenPreviewModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import {
  SelectedBorderSize,
  SelectedBorderStyle,
  SelectedColor,
  TypeOfPaint,
  selectedBorderSizeAtom,
  selectedBorderStyleAtom,
  selectedColorAtom,
  typeOfPaintAtom,
} from '@/atoms/style';
import { BORDER_SIZE, BORDER_STYLE, COLORS } from '@/constants/styles';
import { Image } from '@/types/Image';
import { clickImage, getImageUrl } from '@/utils/handleImage';
import { useAtomValue, useSetAtom } from 'jotai';
import PopOver from './common/PopOver';
import { ENTIRE_COMPONENT } from '@/constants/game';
import { memo, useCallback } from 'react';

/**
 * @returns 툴바 컴포넌트
 */
const Toolbar = () => {
  const setIsOpenModal = useSetAtom(isOpenModalAtom);
  const setModalTitle = useSetAtom(modalTitleAtom);
  const setModalContent = useSetAtom(modalContentAtom);
  const setAddGroupComponent = useCallback(
    useSetAtom(addGroupComponentAtom),
    []
  );

  const setImages = useSetAtom(ImagesAtom);
  const setNumOfImages = useSetAtom(numOfImagesAtom);
  const setSelectedImages = useSetAtom(selectedImagesAtom);

  const setAddComponent = useSetAtom(addComponentAtom);

  const setSelectedColor = useSetAtom(selectedColorAtom);
  const setTypeOfPaint = useSetAtom(typeOfPaintAtom);
  const setSelectedBorderSize = useSetAtom(selectedBorderSizeAtom);
  const setSelectedBorderStyle = useSetAtom(selectedBorderStyleAtom);
  const setIsOpenPreviewModal = useSetAtom(isOpenPreviewModalAtom);

  const entireComponent = useAtomValue(entireComponentAtom);
  const choiceComponent = useAtomValue(choiceComponentAtom);

  /** @function
   * @description 저장 버튼 클릭 핸들링 함수
   */
  const handleSaveButton = () => {
    window.localStorage.clear();

    /** @constant
     * @description 기존에 존재하는 선택지 옵션 정보
     */
    const alreadyExistedChoices = window.localStorage.getItem('choices');

    if (alreadyExistedChoices === JSON.stringify(choiceComponent)) {
      return;
    }

    window.localStorage.setItem('choices', JSON.stringify(choiceComponent));

    /** @constant
     * @description 기존에 존재하는 전체 컴포넌트 정보
     */
    const alreadyExistedEntireComponent =
      window.localStorage.getItem(ENTIRE_COMPONENT);

    if (alreadyExistedEntireComponent === JSON.stringify(entireComponent)) {
      return;
    }

    window.localStorage.setItem(
      ENTIRE_COMPONENT,
      JSON.stringify(entireComponent)
    );
  };

  /** @function
   * @param currentType {string} 현재 스타일링 타입
   * @param currentColor  {string} 현재 색상
   * @param currentStrokeWidth {number} 현재 선의 넓이
   * @param currentStorkeStyle {string} 현재 선의 스타일
   * @description 스타일링 추가 함수
   */
  const handleStyle = useCallback(
    (
      currentType: string,
      currentColor?: string,
      currentStrokeWidth?: number,
      currentStorkeStyle?: string
    ) => {
      setTypeOfPaint(currentType as TypeOfPaint);

      currentColor && setSelectedColor(currentColor as SelectedColor);
      currentStrokeWidth &&
        setSelectedBorderSize(currentStrokeWidth as SelectedBorderSize);
      currentStorkeStyle &&
        setSelectedBorderStyle(currentStorkeStyle as SelectedBorderStyle);
    },
    [setTypeOfPaint, setSelectedBorderSize, setSelectedColor]
  );

  /** @function
   * @description 최초 이미지 렌더링 함수
   */
  const handleImage = async () => {
    const images = await getImages();

    // extension이 존재하는 이미지 필터링
    const filteredImages = images.filter(
      (image: Image) => image.extension.length !== 0
    );
    setImages(filteredImages);
    setNumOfImages(filteredImages.length);

    if (images) {
      const slicedImages = images.slice(0, 9);

      setModalContent(
        <>
          {slicedImages.map((image: Image) => {
            return (
              <img
                className="image-item"
                key={image.imageId}
                src={getImageUrl(image)}
                alt="이미지"
                width={150}
                height={140}
                onClick={() =>
                  clickImage(setSelectedImages, getImageUrl(image))
                }
              />
            );
          })}
        </>
      );
    }
  };

  /** @function
   * @param currTitle 현재 모달 제목
   * @description 모달 핸들링 함수
   */
  const handleModal = useCallback(
    async (currTitle: string) => {
      setModalTitle(currTitle);

      if (currTitle === 'Image List') {
        setIsOpenModal(true);
        handleImage();
      } else {
        setIsOpenPreviewModal(true);
      }
    },
    [setModalTitle, setIsOpenModal, handleImage, setIsOpenPreviewModal]
  );

  return (
    <ToolbarContainer>
      <GroupContainer id="add-component">
        <Button onClick={() => setAddComponent('text')}>
          {<TbTextIncrease size="1.5rem" />}
        </Button>
        <Button onClick={() => handleModal('Image List')}>
          {<LuImagePlus size="1.5rem" />}
        </Button>
        <Button onClick={() => setAddComponent('rect')}>
          {<BiRectangle size="1.5rem" />}
        </Button>
        <Button onClick={() => setAddComponent('circle')}>
          {<BiCircle size="1.5rem" />}
        </Button>
        <Button onClick={() => setAddComponent('line')}>
          {<PiLineSegment size="1.5rem" />}
        </Button>
      </GroupContainer>
      <GroupContainer id="add-component-style">
        <PopOver
          trigger={<RiPaintFill size="1.5rem" />}
          content={
            <PaintContainer>
              {COLORS.map(color => (
                <ColorBoxLi
                  key={color.id}
                  onClick={() =>
                    handleStyle('fill', color.hex as SelectedColor)
                  }
                >
                  <ColorBox
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: `${color.hex}`,
                      borderStyle: color.id ? 'solid' : 'dashed',
                    }}
                  ></ColorBox>
                </ColorBoxLi>
              ))}
            </PaintContainer>
          }
        ></PopOver>
        <PopOver
          trigger={<GiPaintBrush size="1.5rem" />}
          content={
            <PaintContainer>
              {COLORS.map(color => (
                <ColorBoxLi
                  key={color.id}
                  onClick={() =>
                    handleStyle('stroke', color.hex as SelectedColor)
                  }
                >
                  <ColorBox
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: `${color.hex}`,
                      borderStyle: color.id ? 'solid' : 'dashed',
                    }}
                  ></ColorBox>
                </ColorBoxLi>
              ))}
            </PaintContainer>
          }
        ></PopOver>
        <PopOver
          trigger={<BsBorderWidth size="1.5rem" />}
          content={
            <BorderContainer>
              {BORDER_SIZE.map(borderSize => (
                <BorderLi
                  key={borderSize.size}
                  onClick={() =>
                    handleStyle(
                      'strokeWidth',
                      '',
                      borderSize.size as SelectedBorderSize
                    )
                  }
                >
                  {borderSize.size}px
                </BorderLi>
              ))}
            </BorderContainer>
          }
        ></PopOver>
        <PopOver
          trigger={<BsBorderStyle size="1.5rem" />}
          content={
            <BorderContainer>
              {BORDER_STYLE.map(borderStyle => (
                <BorderLi
                  key={borderStyle.style}
                  onClick={() =>
                    handleStyle(
                      'strokeStyle',
                      '',
                      undefined,
                      borderStyle.style as SelectedBorderStyle
                    )
                  }
                >
                  <div
                    style={{ border: `1px ${borderStyle.style} black` }}
                  ></div>
                </BorderLi>
              ))}
            </BorderContainer>
          }
        ></PopOver>
      </GroupContainer>
      <GroupContainer id="group-component">
        <Text onClick={() => setAddGroupComponent(true)} content="그룹화" />
      </GroupContainer>
      <PublishGroupContainer id="content-publish">
        <Button onClick={handleSaveButton}>{<FaSave size="1.5rem" />}</Button>
        <Button onClick={() => handleModal('Preview')}>
          {<MdPreview size="1.5rem" />}
        </Button>
      </PublishGroupContainer>
    </ToolbarContainer>
  );
};

const ToolbarContainer = styled('div')`
  display: flex;
  margin: auto 0;
  align-items: center;
  padding: 1.2rem;
`;

const PublishGroupContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const GroupContainer = styled('div')`
  display: flex;
  align-items: center;
  border-right: 1px solid #d4d7d7;
`;

const ColorBox = styled('div')`
  border: 1px solid #d3d3d3;
`;

const ColorBoxLi = styled('li')`
  list-style: none;
  margin: 2px;
  flex: 1;
`;

const PaintContainer = styled('ul')`
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  margin: 0.2rem;
`;

const BorderContainer = styled('ul')`
  padding: 0;
`;

const BorderLi = styled('li')`
  list-style: none;
  padding: 0.5rem;
  margin: 0.5rem;
  &:hover {
    background-color: #f2f5f5;
  }
`;

export default memo(Toolbar);
