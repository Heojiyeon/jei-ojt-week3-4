import styled from '@emotion/styled';
import Button from './common/Button';

const Format = () => {
  return (
    <FormatContainer>
      <Button onClick={() => console.log('format click!')} isFormat={true}>
        FORMAT
      </Button>
      <Button onClick={() => console.log('sound click!')} isFormat={true}>
        SOUND
      </Button>
    </FormatContainer>
  );
};

const FormatContainer = styled('div')`
  display: flex;
  align-items: center;
`;

export default Format;
