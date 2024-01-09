import styled from '@emotion/styled';
import Button from './common/Button';
import Text from './common/Text';

import { BiCircle, BiPolygon, BiRectangle } from 'react-icons/bi';
import { BsBorderStyle, BsBorderWidth } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { GiPaintBrush } from 'react-icons/gi';
import { IoIosCheckbox } from 'react-icons/io';
import {
  LuAlignHorizontalJustifyCenter,
  LuAlignVerticalJustifyCenter,
  LuImagePlus,
} from 'react-icons/lu';
import {
  MdAlignHorizontalCenter,
  MdAlignVerticalCenter,
  MdPreview,
} from 'react-icons/md';
import { PiLineSegment, PiMathOperationsFill } from 'react-icons/pi';
import { RiPaintFill } from 'react-icons/ri';
import { TbTextIncrease } from 'react-icons/tb';

import { getImages } from '@/apis/image';
import { SelectedColor, selectedColorAtom } from '@/atoms/color';
import {
  addComponentAtom,
  addGroupComponentAtom,
  isPolygonAtom,
  selectedImagesAtom,
  targetComponentAtom,
} from '@/atoms/component';
import { ImagesAtom, numOfImagesAtom } from '@/atoms/image';
import {
  isOpenModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import { COLORS } from '@/constants/colors';
import { Image } from '@/types/Image';
import { clickImage, getImageUrl } from '@/utils/handleImage';
import { useAtom, useSetAtom } from 'jotai';
import PopOver from './common/PopOver';

const Toolbar = () => {
  const setIsOpenModal = useSetAtom(isOpenModalAtom);
  const setModalTitle = useSetAtom(modalTitleAtom);
  const setModalContent = useSetAtom(modalContentAtom);
  const setAddGroupComponent = useSetAtom(addGroupComponentAtom);

  const setImages = useSetAtom(ImagesAtom);
  const setNumOfImages = useSetAtom(numOfImagesAtom);
  const setSelectedImages = useSetAtom(selectedImagesAtom);

  const setIsPolygon = useSetAtom(isPolygonAtom);
  const setAddComponent = useSetAtom(addComponentAtom);

  const setSlectedColor = useSetAtom(selectedColorAtom);

  /**
   * 최초 이미지 렌더링 함수
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

  const handleModal = async (currTitle: string) => {
    if (currTitle === 'Image List') {
      handleImage();
    }

    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
    setModalTitle(currTitle);
  };

  return (
    <ToolbarContainer>
      <GroupContainer id="content-publish">
        <Button
          onClick={() => {
            console.log('save');
          }}
        >
          {<FaSave size="1.5rem" />}
        </Button>
        <Button onClick={() => handleModal('Preview')}>
          {<MdPreview size="1.5rem" />}
        </Button>
      </GroupContainer>
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
        <Button
          onClick={() => {
            setIsPolygon(prevIsPolygon => !prevIsPolygon);
          }}
        >
          {<BiPolygon size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add clock')}>
          {<FaRegClock size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add formula')}>
          {<PiMathOperationsFill size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add checkBox')}>
          {<IoIosCheckbox size="1.5rem" />}
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
                  onClick={() => setSlectedColor(color.hex as SelectedColor)}
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
        <Button onClick={() => console.log('add brush')}>
          {<GiPaintBrush size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add border')}>
          {<BsBorderWidth size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add border style')}>
          {<BsBorderStyle size="1.5rem" />}
        </Button>
      </GroupContainer>
      <GroupContainer id="group-component">
        <Text onClick={() => setAddGroupComponent(true)} content="그룹화" />
        <Button onClick={() => console.log('add horizontal center')}>
          {<MdAlignHorizontalCenter size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add vertical center')}>
          {<MdAlignVerticalCenter size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add horizontal justify center')}>
          {<LuAlignHorizontalJustifyCenter size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add vertical justify center')}>
          {<LuAlignVerticalJustifyCenter size="1.5rem" />}
        </Button>
      </GroupContainer>
    </ToolbarContainer>
  );
};

const ToolbarContainer = styled('div')`
  display: flex;
  margin: auto 0;
  align-items: center;
  padding: 1.2rem;
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

export default Toolbar;
