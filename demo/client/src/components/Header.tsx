import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  language: 'en' | 'hi' | 'te';
  onLanguageChange: (lang: 'en' | 'hi' | 'te') => void;
  isAdmin?: boolean;
  onLogout?: () => void;
}

const translations = {
  en: {
    home: "Home",
    camps: "Health Camps",
    vaccines: "Vaccines",
    schemes: "Schemes",
    adminLogin: "Admin Login",
    logout: "Logout",
    dashboard: "Dashboard"
  },
  hi: {
    home: "होम",
    camps: "स्वास्थ्य शिविर",
    vaccines: "टीके",
    schemes: "योजनाएं",
    adminLogin: "व्यवस्थापक लॉगिन",
    logout: "लॉग आउट",
    dashboard: "डैशबोर्ड"
  },
  te: {
    home: "హోమ్",
    camps: "ఆరోగ్య శిబిరాలు",
    vaccines: "టీకాలు",
    schemes: "పథకాలు",
    adminLogin: "అడ్మిన్ లాగిన్",
    logout: "లాగ్ అవుట్",
    dashboard: "డాష్‌బోర్డ్"
  }
};

export function Header({ language, onLanguageChange, isAdmin, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const t = translations[language];

  const navLinks = isAdmin ? [
    { path: "/admin", label: t.dashboard }
  ] : [
    { path: "/", label: t.home },
    { path: "/camps", label: t.camps },
    { path: "/vaccines", label: t.vaccines },
    { path: "/schemes", label: t.schemes }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-home-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-xl font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-foreground">Arogya</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors hover-elevate active-elevate-2 ${
                  location === link.path 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'text-foreground'
                }`}
                data-testid={`link-nav-${link.path.slice(1) || 'home'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-md p-1">
              {(['en', 'hi', 'te'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 text-sm font-medium rounded transition-colors hover-elevate active-elevate-2 ${
                    language === lang 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground'
                  }`}
                  data-testid={`button-language-${lang}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {isAdmin ? (
              <Button onClick={onLogout} variant="outline" size="sm" data-testid="button-logout">
                {t.logout}
              </Button>
            ) : (
              <Link href="/admin/login" data-testid="link-admin-login">
                <Button variant="outline" size="sm">
                  {t.adminLogin}
                </Button>
              </Link>
            )}

            <button
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`block px-4 py-3 rounded-md font-medium hover-elevate active-elevate-2 ${
                  location === link.path 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.path.slice(1) || 'home'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
