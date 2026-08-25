import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { VivaExplainerModal } from './components/common/VivaExplainerModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { FindTeammatesPage } from './pages/FindTeammatesPage';
import { ProjectIdeasPage } from './pages/ProjectIdeasPage';
import { MyProjectsPage } from './pages/MyProjectsPage';
import { MyTeamsPage } from './pages/MyTeamsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVivaModalOpen, setIsVivaModalOpen] = useState(false);

  // Helper to change page and close mobile sidebar
  const navigateTo = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAuthOrLanding = ['landing', 'login', 'register'].includes(activePage);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenVivaModal={() => setIsVivaModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex flex-1 relative">
        
        {/* Sidebar (shown on authenticated dashboard pages) */}
        {!isAuthOrLanding && (
          <Sidebar
            activePage={activePage}
            setActivePage={navigateTo}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <main className={`flex-1 transition-all duration-300 ${!isAuthOrLanding ? 'lg:pl-64' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            {activePage === 'landing' && (
              <LandingPage 
                onGetStarted={() => navigateTo(isAuthenticated ? 'dashboard' : 'login')}
                onOpenVivaModal={() => setIsVivaModalOpen(true)}
              />
            )}

            {activePage === 'login' && (
              <LoginPage 
                onNavigateRegister={() => navigateTo('register')}
                onLoginSuccess={() => navigateTo('dashboard')}
              />
            )}

            {activePage === 'register' && (
              <RegisterPage 
                onNavigateLogin={() => navigateTo('login')}
                onRegisterSuccess={() => navigateTo('dashboard')}
              />
            )}

            {activePage === 'dashboard' && (
              <DashboardPage 
                setActivePage={navigateTo}
                onOpenVivaModal={() => setIsVivaModalOpen(true)}
              />
            )}

            {activePage === 'find-teammates' && (
              <FindTeammatesPage 
                setActivePage={navigateTo}
                onOpenVivaModal={() => setIsVivaModalOpen(true)}
              />
            )}

            {activePage === 'project-ideas' && (
              <ProjectIdeasPage 
                setActivePage={navigateTo}
              />
            )}

            {activePage === 'my-projects' && (
              <MyProjectsPage 
                setActivePage={navigateTo}
              />
            )}

            {activePage === 'my-teams' && (
              <MyTeamsPage 
                setActivePage={navigateTo}
                onOpenVivaModal={() => setIsVivaModalOpen(true)}
              />
            )}

            {activePage === 'profile' && (
              <ProfilePage />
            )}

            {activePage === 'notifications' && (
              <NotificationsPage 
                setActivePage={navigateTo}
              />
            )}

            {activePage === 'settings' && (
              <SettingsPage 
                onOpenVivaModal={() => setIsVivaModalOpen(true)}
              />
            )}

          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer onOpenVivaModal={() => setIsVivaModalOpen(true)} />

      {/* Viva Mathematical Specification & Exam Panel Modal */}
      <VivaExplainerModal
        isOpen={isVivaModalOpen}
        onClose={() => setIsVivaModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
