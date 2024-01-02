import styled from '@emotion/styled';
import { ReactNode } from 'react';

type LayoutProp = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled('div')`
  width: 90rem;
  height: 67.5rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  display: grid;
  grid-template-rows: 2fr 8fr;
  grid-template-columns: 7fr 3fr;
`;

export default Layout;
