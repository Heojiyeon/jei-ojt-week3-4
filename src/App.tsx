import AppRouter from './Router';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <Layout>
        <AppRouter />
      </Layout>
    </>
  );
};

export default App;
