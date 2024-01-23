import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NumberGamePage from './pages/NumberGamePage';
import SituationGamePage from './pages/SituationGamePage';

const { VITE_PUBLIC_URL } = import.meta.env;

const AppRouter = () => {
  return (
    <Router basename={VITE_PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/situation-game" element={<SituationGamePage />} />
        <Route path="/number-game" element={<NumberGamePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
