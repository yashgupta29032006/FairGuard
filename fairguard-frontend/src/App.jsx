import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DataUpload from './pages/DataUpload';
import BiasAnalysis from './pages/BiasAnalysis';
import DecisionFirewall from './pages/DecisionFirewall';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<DataUpload />} />
          <Route path="/analysis" element={<BiasAnalysis />} />
          <Route path="/firewall" element={<DecisionFirewall />} />
          <Route path="/training" element={<PlaceholderPage title="Model Training Lab" />} />
          <Route path="/explainability" element={<PlaceholderPage title="Explainability Studio" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
