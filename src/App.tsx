import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import AppRouter from './Router';
import { problemsAtom } from './atoms/problem';
import Layout from './components/Layout';
import { createIndexedDB } from './data';

const App = () => {
  const problems = useAtomValue(problemsAtom);

  /**
   * indexedDB 생성
   */
  useEffect(() => {
    createIndexedDB({ problems });
  }, [problems]);

  return (
    <>
      <Layout>
        <AppRouter />
      </Layout>
    </>
  );
};

export default App;
