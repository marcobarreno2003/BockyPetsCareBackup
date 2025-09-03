import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Instagram, Phone, Mail } from 'lucide-react';
import useStore from '@/lib/store';

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.521 2.024c.496-.002.99.043 1.477.132a4.17 4.17 0 013.101 3.102c.09.487.133.982.132 1.478V12a4.173 4.173 0 01-4.171 4.171H12c-2.304 0-4.171-1.867-4.171-4.171V6.735" />
    <path d="M8.448 6.735a4.17 4.17 0 013.552-4.13v10.545A2.085 2.085 0 1012 16.32v-3.168" />
    <path d="M16.142 7.83a2.085 2.085 0 10-2.085-2.085v3.168" />
  </svg>
);


const Footer = () => {
  const language = useStore(state => state.language);

  const content = {
    es: {
      brandName: "Bocky Pets Care",
      brandDescription: "Servicios profesionales de cuidado de mascotas con amor, confianza y calidad para todos tus queridos animales. ¡Tu familia peluda merece lo mejor!",
      quickLinksTitle: "Enlaces Rápidos",
      quickLinks: [
        { label: 'Inicio', id: 'hero' },
        { label: '¿Quiénes Somos?', id: 'about' },
        { label: 'Servicios', id: 'services' },
        { label: 'Contacto', id: 'contact' }
      ],
      servicesTitle: "Nuestros Servicios",
      services: [
        'Paseo de Perros',
        'Cuidado de Mascotas',
        'Cuidado Nocturno',
        'Guardería'
      ],
      contactTitle: "Contáctanos",
      contactPhone: "4359621307",
      contactEmail: "bockypetscare@gmail.com",
      contactDetails: "Área de Servicio: Houston, TX<br />Disponible los 7 días de la semana<br />Soporte de emergencia 24/7",
      copyright: `© ${new Date().getFullYear()} Bocky Pets Care. Todos los derechos reservados.`,
      madeWith: "Hecho con",
      forPets: "para mascotas y sus familias"
    },
    en: {
      brandName: "Bocky Pets Care",
      brandDescription: "Professional pet care services with love, trust, and quality care for all your beloved pets. Your furry family deserves the best!",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { label: 'Home', id: 'hero' },
        { label: 'About Us', id: 'about' },
        { label: 'Services', id: 'services' },
        { label: 'Contact', id: 'contact' }
      ],
      servicesTitle: "Our Services",
      services: [
        'Dog Walking',
        'Pet Sitting',
        'Overnight Care',
        'Daycare'
      ],
      contactTitle: "Contact Us",
      contactPhone: "4359621307",
      contactEmail: "bockypetscare@gmail.com",
      contactDetails: "Service Area: Houston, TX<br />Available 7 days a week<br />Emergency support 24/7",
      copyright: `© ${new Date().getFullYear()} Bocky Pets Care. All rights reserved.`,
      madeWith: "Made with",
      forPets: "for pets and their families"
    }
  };

  const currentContent = content[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { 
      href: "https://www.instagram.com/bockypetscare?igsh=b3l5ODFkaTZ2dXV0", 
      icon: Instagram, 
      label: language === 'es' ? "Síguenos en Instagram" : "Follow us on Instagram"
    },
    { 
      href: "https://www.tiktok.com/@bockypetscare?_t=ZM-8wsAJW6fSFR&_r=1", 
      icon: TikTokIcon, 
      label: language === 'es' ? "Síguenos en TikTok" : "Follow us on TikTok"
    }
  ];

  return (
    <footer className="bg-[var(--vibrant-coral)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/330c69aaf6e16ce75d2c07847d1eabbb.png" 
                alt="Bocky Pets Care logo" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-white">{currentContent.brandName}</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              {currentContent.brandDescription}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold text-white mb-6 block">{currentContent.quickLinksTitle}</span>
            <ul className="space-y-3">
              {currentContent.quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold text-white mb-6 block">{currentContent.servicesTitle}</span>
            <ul className="space-y-3">
              {currentContent.services.map((service) => (
                <li key={service}>
                  <span className="text-white/80">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold text-white mb-6 block">{currentContent.contactTitle}</span>
            <div className="space-y-4">
              <a 
                href={`tel:${currentContent.contactPhone}`}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300"
              >
                <Phone className="h-5 w-5" strokeWidth={2} />
                <span>{currentContent.contactPhone}</span>
              </a>
              <a 
                href={`mailto:${currentContent.contactEmail}`}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300"
              >
                <Mail className="h-5 w-5" strokeWidth={2} />
                <span>{currentContent.contactEmail}</span>
              </a>
              <p className="text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: currentContent.contactDetails }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              {currentContent.copyright}
            </p>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="text-sm">{currentContent.madeWith}</span>
              <Heart className="h-4 w-4 text-white fill-current" strokeWidth={2} />
              <span className="text-sm">{currentContent.forPets}</span>
              <div className="flex space-x-1 ml-2">
                <span className="text-lg">🐾</span>
                <span className="text-lg">🐾</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;