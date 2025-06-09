
import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { OperatorProvider } from './hooks/useOperators';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { DashboardPage } from './pages/DashboardPage';
import { OperatorDetailPage } from './pages/OperatorDetailPage';
import { AddOperatorPage } from './pages/AddOperatorPage';
import { Header } from './components/shared/Header';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Wrap OperatorProvider with AuthProvider */}
      <OperatorProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-slate-100">
            <Header />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/operator/new" element={<AddOperatorPage />} />
                <Route path="/operator/:operatorId" element={<OperatorDetailPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <footer className="bg-slate-800 text-white text-center p-4">
              <p>&copy; {new Date().getFullYear()} DGCA Risk Management System. For demonstration purposes.</p>
            </footer>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </HashRouter>
      </OperatorProvider>
    </AuthProvider>
  );
};

export default App;