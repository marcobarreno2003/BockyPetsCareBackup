import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/lib/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useStore(state => state.user);
  const isAdmin = useStore(state => state.isAdmin);
  const logout = useStore(state => state.logout);
  const language = useStore(state => state.language);
  const toggleLanguage = useStore(state => state.toggleLanguage);

  const navItems = {
    es: [
      { label: 'Inicio', id: 'hero' },
      { label: '¿Quiénes Somos?', id: 'about' },
      { label: 'Servicios', id: 'services' },
      { label: 'Contacto', id: 'contact' }
    ],
    en: [
      { label: 'Home', id: 'hero' },
      { label: 'About Us', id: 'about' },
      { label: 'Services', id: 'services' },
      { label: 'Contact', id: 'contact' }
    ]
  };

  const currentNavItems = navItems[language];

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--soft-peach)]/50 custom-shadow">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="md:hidden flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/330c69aaf6e16ce75d2c07847d1eabbb.png" 
                alt="Bocky Pets Care logo" 
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--vibrant-coral)]"
            >
              {isMenuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </Button>
          </div>

          <motion.div 
            className="hidden md:flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/330c69aaf6e16ce75d2c07847d1eabbb.png" 
                alt="Bocky Pets Care logo" 
                className="h-16 w-auto"
              />
            </Link>
          </motion.div>

          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            {currentNavItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-[var(--vibrant-coral)] transition-colors duration-300 font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/90 px-2"
              >
                <Globe className="h-5 w-5 mr-1" strokeWidth={2} />
                {language.toUpperCase()}
              </Button>

              {user ? (
                <>
                  <Button
                    onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')}
                    size="sm"
                    className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full px-4 py-1.5 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" strokeWidth={2} />
                    {isAdmin ? (language === 'es' ? 'Admin' : 'Admin') : (language === 'es' ? 'Panel' : 'Dashboard')}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="text-[var(--vibrant-coral)] border-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/10 px-3 py-1.5"
                  >
                    <LogOut className="w-4 h-4 mr-1" strokeWidth={2} />
                    {language === 'es' ? 'Salir' : 'Logout'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    size="sm"
                    className="text-[var(--vibrant-coral)] border-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/10 px-3 py-1.5"
                  >
                    {language === 'es' ? 'Acceder' : 'Login'}
                  </Button>
                  <Button 
                    onClick={() => navigate('/register')}
                    size="sm"
                    className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full px-4 py-1.5 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {language === 'es' ? 'Registro' : 'Register'}
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 pb-4 border-t border-[var(--soft-peach)]/50"
            >
              <div className="flex flex-col space-y-3 pt-3">
                {currentNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-700 hover:text-[var(--vibrant-coral)] transition-colors duration-300 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}

                <Button
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  variant="ghost"
                  className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/90 justify-start py-2"
                >
                  <Globe className="h-5 w-5 mr-2" strokeWidth={2} />
                  {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </Button>
                
                {user ? (
                  <>
                    <Button
                      onClick={() => {
                        navigate(isAdmin ? '/admin' : '/dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white w-full py-2.5"
                    >
                      <User className="w-4 h-4 mr-2" strokeWidth={2} />
                      {isAdmin ? (language === 'es' ? 'Panel Admin' : 'Admin Panel') : (language === 'es' ? 'Mi Panel' : 'My Dashboard')}
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="text-[var(--vibrant-coral)] border-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/10 w-full py-2.5"
                    >
                      <LogOut className="w-4 h-4 mr-2" strokeWidth={2} />
                      {language === 'es' ? 'Cerrar Sesión' : 'Logout'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="text-[var(--vibrant-coral)] border-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/10 w-full py-2.5"
                    >
                      {language === 'es' ? 'Iniciar Sesión' : 'Login'}
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white w-full py-2.5"
                    >
                      {language === 'es' ? 'Registrarse' : 'Register'}
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;