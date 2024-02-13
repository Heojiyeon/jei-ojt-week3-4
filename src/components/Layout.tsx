import styled from '@emotion/styled';
import { ReactNode } from 'react';

type LayoutProp = {
  children: ReactNode;
};

/**
 *
 * @param children {ReactNode}
 * @returns 레이아웃 컴포넌트
 */
const Layout = ({ children }: LayoutProp) => {
  return (
    <CenteredLayoutContainer>
      <LayoutContainer>{children}</LayoutContainer>
    </CenteredLayoutContainer>
  );
};

const CenteredLayoutContainer = styled('div')`
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 1000px;
  height: 800px;
`;
const LayoutContainer = styled('div')`
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 6fr 4fr;
`;

export default Layout;
