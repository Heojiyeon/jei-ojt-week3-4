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

import {
  LuAlignHorizontalJustifyCenter,
  LuAlignVerticalJustifyCenter,
} from 'react-icons/lu';

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <GroupContainer id="content-publish">
        <Button onClick={() => console.log('save')}>
          {<FaSave size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('preview')}>
          {<MdPreview size="1.5rem" />}
        </Button>
      </GroupContainer>
      <GroupContainer id="add-component">
        <Button onClick={() => console.log('add text')}>
          {<TbTextIncrease size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add image')}>
          {<LuImagePlus size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add rectangle')}>
          {<BiRectangle size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add circle')}>
          {<BiCircle size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add line')}>
          {<PiLineSegment size="1.5rem" />}
        </Button>
        <Button onClick={() => console.log('add polygon')}>
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
