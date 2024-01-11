import styled from '@emotion/styled';

type TextProp = {
  content: string;
  onClick: () => void;
};

const Text = ({ content, onClick }: TextProp) => {
  return <TextContainer onClick={onClick}>{content}</TextContainer>;
};

const TextContainer = styled('div')`
  color: #0080ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;

export default Text;
