import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import useStore from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const register = useStore(state => state.register);
  const language = useStore(state => state.language);

  const content = {
    es: {
      backToHome: "Volver al Inicio",
      createAccountTitle: "Crear una Cuenta",
      emailLabel: "Correo Electrónico",
      passwordLabel: "Contraseña",
      confirmPasswordLabel: "Confirmar Contraseña",
      createAccountButton: "Crear cuenta",
      creatingAccountButton: "Creando cuenta...",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      signInLink: "Iniciar Sesión",
      registrationFailTitle: "Falló el registro",
      passwordsDontMatch: "Las contraseñas no coinciden",
      registrationSuccessTitle: "¡Registro exitoso!",
      registrationSuccessDesc: "¡Bienvenido a Bocky Pets Care!"
    },
    en: {
      backToHome: "Back to Home",
      createAccountTitle: "Create an Account",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      createAccountButton: "Create account",
      creatingAccountButton: "Creating account...",
      alreadyHaveAccount: "Already have an account?",
      signInLink: "Sign in",
      registrationFailTitle: "Registration failed",
      passwordsDontMatch: "Passwords do not match",
      registrationSuccessTitle: "Registration successful!",
      registrationSuccessDesc: "Welcome to Bocky Pets Care!"
    }
  };
  const currentContent = content[language];

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: currentContent.registrationFailTitle,
        description: currentContent.passwordsDontMatch,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await register(email, password);
      
      if (error) throw error;

      toast({
        title: currentContent.registrationSuccessTitle,
        description: currentContent.registrationSuccessDesc,
        className: "bg-[var(--vibrant-coral)] text-white",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: currentContent.registrationFailTitle,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--light-peach-bg)] paw-pattern pt-24 md:pt-28">
      <Card className="w-full max-w-md relative bg-white/80 backdrop-blur-sm custom-shadow border-0">
        <Button
            variant="ghost"
            className="absolute left-4 top-4 text-gray-500 hover:text-[var(--vibrant-coral)]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentContent.backToHome}
        </Button>
        <CardHeader className="text-center pt-16">
          <CardTitle className="text-2xl font-bold text-gray-800">{currentContent.createAccountTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700">{currentContent.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">{currentContent.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700">{currentContent.confirmPasswordLabel}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 bg-white/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? currentContent.creatingAccountButton : currentContent.createAccountButton}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">{currentContent.alreadyHaveAccount} </span>
              <Button
                variant="link"
                className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/90 px-1"
                onClick={() => navigate('/login')}
              >
                {currentContent.signInLink}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;