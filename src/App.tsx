import { useEffect } from 'react';
import AppRouter from './Router';
import Layout from './components/Layout';
import { createIndexedDB } from './data';

const App = () => {
  /**
   * indexedDB 생성
   */
  useEffect(() => {
    createIndexedDB();
  }, []);

  return (
    <>
      <Layout>
        <AppRouter />
      </Layout>
    </>
  );
};

export default App;
