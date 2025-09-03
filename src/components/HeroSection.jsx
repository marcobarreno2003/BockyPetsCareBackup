import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, Star, Shield } from 'lucide-react';
import useStore from '@/lib/store';

const HeroSection = () => {
  const language = useStore(state => state.language);
  
  const content = {
    es: {
      title: "EN BOCKY PETS CARE, CUIDAMOS LO QUE MAS AMAS.",
      subtitle: "Cuidado profesional con amor y dedicación para tus mascotas.",
      cta: "Reservar Ahora",
      stats: {
        pets: "Mascotas Felices",
        rating: "Calificación",
        support: "Soporte"
      },
      trustedCare: "Cuidado Confiable"
    },
    en: {
      title: "AT BOCKY PETS CARE, WE CARE FOR WHAT YOU LOVE MOST.",
      subtitle: "Professional care with love and dedication for your pets.",
      cta: "Book Now",
      stats: {
        pets: "Happy Pets",
        rating: "Rating",
        support: "Support"
      },
      trustedCare: "Trusted Care"
    }
  };

  const currentContent = content[language] || content['en'];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-gradient paw-pattern overflow-hidden pt-20 md:pt-24">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-[var(--vibrant-coral)]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Heart className="h-8 w-8" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-[var(--vibrant-coral)]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Star className="h-6 w-6" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-[var(--vibrant-coral)]/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <Shield className="h-10 w-10" strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[var(--vibrant-coral)]">{currentContent.title}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentContent.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {currentContent.cta}
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--vibrant-coral)]">500+</div>
                <div className="text-sm text-gray-600">{currentContent.stats.pets}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--vibrant-coral)]">5★</div>
                <div className="text-sm text-gray-600">{currentContent.stats.rating}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--vibrant-coral)]">24/7</div>
                <div className="text-sm text-gray-600">{currentContent.stats.support}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden custom-shadow aspect-w-3 aspect-h-4 md:aspect-w-4 md:aspect-h-5 lg:aspect-w-3 lg:aspect-h-4">
              <img  
                className="w-full h-full object-cover object-center" 
                alt="Happy dog with caretaker in a cozy home setting"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
              />
              
              <motion.div
                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-[var(--vibrant-coral)]" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700">
                    {currentContent.trustedCare}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;