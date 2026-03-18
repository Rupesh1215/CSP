import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import Home from "@/pages/Home";
import Camps from "@/pages/Camps";
import CampDetail from "@/pages/CampDetail";
import Vaccines from "@/pages/Vaccines";
import Schemes from "@/pages/Schemes";
import Search from "@/pages/Search";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function Router({ language, onLanguageChange, adminToken, onLogin, onLogout }: {
  language: 'en' | 'hi' | 'te';
  onLanguageChange: (lang: 'en' | 'hi' | 'te') => void;
  adminToken: string | null;
  onLogin: (token: string, admin: any) => void;
  onLogout: () => void;
}) {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        language={language} 
        onLanguageChange={onLanguageChange}
        isAdmin={!!adminToken}
        onLogout={onLogout}
      />
      
      <main className="flex-1">
        <Switch>
          <Route path="/" component={() => <Home language={language} />} />
          <Route path="/camps" component={() => <Camps language={language} />} />
          <Route path="/camps/:id" component={() => <CampDetail language={language} />} />
          <Route path="/vaccines" component={() => <Vaccines language={language} />} />
          <Route path="/schemes" component={() => <Schemes language={language} />} />
          <Route path="/search" component={() => <Search language={language} />} />
          <Route path="/admin/login" component={() => <AdminLogin onLogin={onLogin} language={language} />} />
          <Route path="/admin">
            {adminToken ? (
              <AdminDashboard adminToken={adminToken} />
            ) : (
              <AdminLogin onLogin={onLogin} language={language} />
            )}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>

      {!isAdminRoute && <Footer language={language} />}
      {!isAdminRoute && <ChatBot language={language} />}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as 'en' | 'hi' | 'te';
    if (storedLang) setLanguage(storedLang);

    const token = localStorage.getItem('adminToken');
    const data = localStorage.getItem('adminData');
    if (token && data) {
      setAdminToken(token);
      setAdminData(JSON.parse(data));
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'hi' | 'te') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const handleLogin = (token: string, admin: any) => {
    setAdminToken(token);
    setAdminData(admin);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(admin));
  };

  const handleLogout = () => {
    setAdminToken(null);
    setAdminData(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/';
  };

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router 
            language={language}
            onLanguageChange={handleLanguageChange}
            adminToken={adminToken}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
