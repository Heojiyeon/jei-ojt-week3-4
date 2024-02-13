import styled from '@emotion/styled';

type TextProp = {
  content: string;
  onClick: () => void;
};

/**
 *
 * @param content {string} 내부 값
 * @param onClick {() => void} 텍스트 클릭 핸들링 함수
 * @returns 텍스트 컴포넌트
 */
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
