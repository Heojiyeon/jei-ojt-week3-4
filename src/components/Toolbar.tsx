import styled from '@emotion/styled';
import Button from './common/Button';
import Text from './common/Text';

import { BiCircle, BiPolygon, BiRectangle } from 'react-icons/bi';
import { BsBorderStyle, BsBorderWidth } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { GiPaintBrush } from 'react-icons/gi';
import { IoIosCheckbox } from 'react-icons/io';
import { LuImagePlus } from 'react-icons/lu';
import { MdPreview } from 'react-icons/md';
import { PiLineSegment, PiMathOperationsFill } from 'react-icons/pi';
import { RiPaintFill } from 'react-icons/ri';
import { TbTextIncrease } from 'react-icons/tb';

import { MdAlignHorizontalCenter, MdAlignVerticalCenter } from 'react-icons/md';

import { getImages } from '@/apis/image';
import { entireComponentAtom, isPolygonAtom } from '@/atoms/component';
import { ImagesAtom, numOfImagesAtom } from '@/atoms/image';
import {
  isOpenModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import { numOfPageLimitAtom, pageAtom } from '@/atoms/pagination';
import { Image } from '@/types/Image';
import { useAtom, useAtomValue } from 'jotai';
import {
  LuAlignHorizontalJustifyCenter,
  LuAlignVerticalJustifyCenter,
} from 'react-icons/lu';
import FabricEllipse from './Fabric/FabricEllipse';
import FabricPolyLine from './Fabric/FabricLine';
import FabricRect from './Fabric/FabricRect';
import FabricText from './Fabric/FabricText';

const Toolbar = () => {
  const page = useAtomValue(pageAtom);
  const numOfPageLimit = useAtomValue(numOfPageLimitAtom);

  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [, setModalTitle] = useAtom(modalTitleAtom);
  const [, setModalContent] = useAtom(modalContentAtom);
  const [, setNumOfImages] = useAtom(numOfImagesAtom);
  const [, setImages] = useAtom(ImagesAtom);
  const [, setEntireComponent] = useAtom(entireComponentAtom);
  const [, setIsPolygon] = useAtom(isPolygonAtom);

  /**
   * 이미지 불러오기 기능
   */
  const handleImage = async () => {
    const images = await getImages();

    // extension이 존재하는 이미지 필터링
    const filteredImages = images.filter(
      (image: Image) => image.extension.length !== 0
    );
    setImages(filteredImages);
    setNumOfImages(filteredImages.length);

    const offset = (page - 1) * numOfPageLimit;
    const slicedImages =
      images && images.slice(offset, offset + numOfPageLimit);

    const getImageUrl = (currentContent: Image) =>
      `https://sol-api.esls.io/images/A1/${currentContent?.imageId}.${currentContent?.extension}`;

    setModalContent(
      <>
        {slicedImages.map((image: Image) => (
          <img
            className="image-item"
            key={image.imageId}
            src={getImageUrl(image)}
            alt="이미지"
            width={150}
            height={140}
          />
        ))}
      </>
    );
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
        <Button
          onClick={() => {
            const newText = new FabricText();

            setEntireComponent(prevEntireComponent => [
              ...prevEntireComponent,
              newText,
            ]);
          }}
        >
          {<TbTextIncrease size="1.5rem" />}
        </Button>
        <Button
          onClick={() => {
            handleModal('Image List');
            getImages();
          }}
        >
          {<LuImagePlus size="1.5rem" />}
        </Button>
        <Button
          onClick={() => {
            const newText = new FabricRect();

            setEntireComponent(prevEntireComponent => [
              ...prevEntireComponent,
              newText,
            ]);
          }}
        >
          {<BiRectangle size="1.5rem" />}
        </Button>
        <Button
          onClick={() => {
            const newEllipse = new FabricEllipse();

            setEntireComponent(prevEntireComponent => [
              ...prevEntireComponent,
              newEllipse,
            ]);
          }}
        >
          {<BiCircle size="1.5rem" />}
        </Button>
        <Button
          onClick={() => {
            const newPolyLine = new FabricPolyLine();

            setEntireComponent(prevEntireComponent => [
              ...prevEntireComponent,
              newPolyLine,
            ]);
          }}
        >
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
        <Button onClick={() => console.log('add paint')}>
          {<RiPaintFill size="1.5rem" />}
        </Button>
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
        <Text onClick={() => console.log('그룹화')} content="그룹화" />
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
  padding: 0.7rem;
  border-right: 1px solid #d4d7d7;
`;

export default Toolbar;
