import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AgendaPage from './pages/AgendaPage';
import './App.css';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/agenda' element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
        <Route path='/' element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
