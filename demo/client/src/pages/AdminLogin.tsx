import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AuthResponse } from "@shared/schema";

interface AdminLoginProps {
  onLogin: (token: string, admin: any) => void;
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    title: "Admin Login",
    email: "Email",
    password: "Password",
    login: "Login",
    loggingIn: "Logging in...",
    error: "Invalid credentials. Please try again.",
    emailPlaceholder: "admin@example.com"
  },
  hi: {
    title: "व्यवस्थापक लॉगिन",
    email: "ईमेल",
    password: "पासवर्ड",
    login: "लॉगिन",
    loggingIn: "लॉगिन हो रहा है...",
    error: "अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।",
    emailPlaceholder: "admin@example.com"
  },
  te: {
    title: "అడ్మిన్ లాగిన్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    login: "లాగిన్",
    loggingIn: "లాగిన్ అవుతోంది...",
    error: "చెల్లని రుసుములు. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    emailPlaceholder: "admin@example.com"
  }
};

export default function AdminLogin({ onLogin, language }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const t = translations[language];

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest<AuthResponse>('POST', '/api/admin/login', credentials);
      return response;
    },
    onSuccess: (data) => {
      onLogin(data.token, data.admin);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      setLocation('/admin');
    },
    onError: () => {
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center" data-testid="text-login-title">
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                disabled={loginMutation.isPending}
                data-testid="input-email"
              />
            </div>
            
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loginMutation.isPending}
                data-testid="input-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              {loginMutation.isPending ? t.loggingIn : t.login}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
