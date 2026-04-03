import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import TradePage from './pages/TradePage';
import ProfilePage from './pages/ProfilePage';
import AICoachPage from './pages/AICoachPage';
import DailySpinPage from './pages/DailySpinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="trade" element={<TradePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="ai-coach" element={<AICoachPage />} />
          <Route path="daily-spin" element={<DailySpinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
