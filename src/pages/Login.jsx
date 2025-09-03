import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import useStore from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginWithPassword = useStore(state => state.loginWithPassword);
  const isLoading = useStore(state => state.isLoading); 
  const user = useStore(state => state.user);
  const isAdmin = useStore(state => state.isAdmin);
  const language = useStore(state => state.language);

  const content = {
    es: {
      backToHome: "Volver al Inicio",
      welcomeBack: "¡Bienvenido de Nuevo!",
      emailLabel: "Correo Electrónico",
      passwordLabel: "Contraseña",
      signIn: "Iniciar Sesión",
      signingIn: "Iniciando Sesión...",
      noAccount: "¿No tienes una cuenta?",
      register: "Registrarse",
      aboutUs: "¿Quiénes Somos?",
      services: "Servicios",
      contact: "Contacto",
      loginSuccess: "¡Inicio de sesión exitoso!",
      welcomeMessage: "¡Bienvenido de vuelta!",
      loginFailed: "Error al iniciar sesión",
      invalidCredentials: "Credenciales de inicio de sesión inválidas. Por favor, verifica tu correo y contraseña."
    },
    en: {
      backToHome: "Back to Home",
      welcomeBack: "Welcome Back!",
      emailLabel: "Email",
      passwordLabel: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      register: "Register",
      aboutUs: "About Us",
      services: "Services",
      contact: "Contact",
      loginSuccess: "Login successful!",
      welcomeMessage: "Welcome back!",
      loginFailed: "Login failed",
      invalidCredentials: "Invalid login credentials. Please check your email and password."
    }
  };
  const currentContent = content[language];

  useEffect(() => {
    if (user) {
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    
    const result = await loginWithPassword(email, password);
    
    if (result.error) {
      let errorMessage = result.error.message;
      if (result.error.message.includes("Invalid login credentials")) {
        errorMessage = currentContent.invalidCredentials;
      }
      toast({
        title: currentContent.loginFailed,
        description: errorMessage,
        variant: "destructive",
      });
    } else if (result.user) {
      toast({
        title: currentContent.loginSuccess,
        description: currentContent.welcomeMessage,
        className: "bg-[var(--vibrant-coral)] text-white",
      });
    }
  };

  const handleNavigate = (path) => {
    if (path.startsWith('/#')) {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--light-peach-bg)] paw-pattern">
      <Card className="w-full max-w-md relative bg-white/80 backdrop-blur-sm custom-shadow border-0">
        <Button
          variant="ghost"
          className="absolute left-4 top-4 text-gray-500 hover:text-[var(--vibrant-coral)]"
          onClick={() => handleNavigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentContent.backToHome}
        </Button>
        <CardHeader className="text-center pt-16">
          <CardTitle className="text-2xl font-bold text-gray-800">{currentContent.welcomeBack}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">{currentContent.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-white/50"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">{currentContent.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-white/50"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? currentContent.signingIn : currentContent.signIn}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{currentContent.noAccount} </span>
            <Button
              variant="link"
              className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/90"
              onClick={() => handleNavigate('/register')}
            >
              {currentContent.register}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-[var(--vibrant-coral)] px-2 sm:px-3"
              onClick={() => handleNavigate('/#about')}
            >
              {currentContent.aboutUs}
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-[var(--vibrant-coral)] px-2 sm:px-3"
              onClick={() => handleNavigate('/#services')}
            >
              {currentContent.services}
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-[var(--vibrant-coral)] px-2 sm:px-3"
              onClick={() => handleNavigate('/#contact')}
            >
              {currentContent.contact}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;