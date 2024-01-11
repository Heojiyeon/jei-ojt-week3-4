import styled from '@emotion/styled';
import Button from './common/Button';

const Format = () => {
  const handleReset = () => {
    if (!window.localStorage.getItem('entireComponent')) {
      return;
    }
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <FormatContainer>
      <Button onClick={handleReset} isFormat={true}>
        RESET
      </Button>
    </FormatContainer>
  );
};

const FormatContainer = styled('div')`
  display: flex;
  align-items: center;
`;

export default Format;
