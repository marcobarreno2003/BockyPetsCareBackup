import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PawPrint, Home, Moon, Sun, Users, Briefcase } from 'lucide-react';
import useStore from '@/lib/store';

const ServicesSection = () => {
  const language = useStore(state => state.language);

  const content = {
    es: {
      title: "Nuestros Servicios",
      subtitle: "Servicios integrales de cuidado de mascotas diseñados para mantener a tus amigos peludos felices, saludables y amados mientras estás fuera. Cada servicio se adapta a las necesidades únicas de tu mascota.",
      services: [
        {
          iconComponent: PawPrint, 
          title: "Paseo de Perros",
          description: "Paseos energizantes y divertidos adaptados a las necesidades de tu perro.",
          features: [
            "15 min: $20",
            "30 min: $25",
            "1 hora: $30",
            "Seguimiento GPS y actualizaciones"
          ],
          price: "Desde $20",
          cta: "Reservar Paseo"
        },
        {
          iconComponent: Home, 
          title: "Cuidado de Mascotas a Domicilio",
          description: "Visitas a tu hogar para cuidar de tus mascotas, manteniendo su rutina y comodidad.",
          features: [
            "15 min: $20",
            "30 min: $25",
            "1 hora: $30",
            "Alimentación, juegos y medicación"
          ],
          price: "Desde $20",
          cta: "Reservar Cuidado"
        },
        {
          iconComponent: Moon, 
          title: "Cuidado Nocturno (Tu Casa)",
          description: "Cuidado durante 12 horas en la comodidad de tu hogar (7pm - 7am).",
          features: [
            "Compañía toda la noche",
            "Mantenimiento de rutina",
            "Alimentación y paseos",
            "Precio: $90"
          ],
          price: "$90",
          cta: "Reservar Noche"
        },
        {
          iconComponent: Users, 
          title: "Cuidado Nocturno (Nuestra Casa)",
          description: "Cuidado durante 12 horas en nuestro hogar seguro y acogedor (7pm - 7am).",
          features: [
            "Ambiente hogareño",
            "Supervisión constante",
            "Socialización (si aplica)",
            "Precio: $55"
          ],
          price: "$55",
          cta: "Reservar Estancia"
        },
        {
          iconComponent: Sun, 
          title: "Guardería Día Completo",
          description: "Un día lleno de diversión y cuidados para tu mascota (7am - 7pm).",
          features: [
            "1 Día: $35",
            "5 Días: $32/día",
            "10 Días: $30/día",
            "20 Días: $25.75/día",
            "30 Días: $17/día"
          ],
          price: "Desde $17/día",
          cta: "Reservar Guardería"
        },
        {
          iconComponent: Briefcase, 
          title: "Guardería Medio Día",
          description: "6 horas de cuidado y diversión para tu mascota.",
          features: [
            "1 Día: $25",
            "5 Días: $23/día",
            "10 Días: $22/día",
            "20 Días: $18/día",
            "30 Días: $12/día",
            "Juegos y socialización",
            "Horario flexible (6 horas)"
          ],
          price: "Desde $12/día",
          cta: "Reservar Guardería"
        }
      ],
      whyChoose: {
        title: "¿Por Qué Elegir Bocky Pets Care?",
        items: [
          {
            icon: "🏆",
            title: "Cuidadores de Confianza",
            description: "Profesionales con antecedentes verificados, asegurados y con experiencia"
          },
          {
            icon: "⏰",
            title: "Horario Flexible",
            description: "Servicios disponibles los 7 días de la semana, incluyendo festivos"
          },
          {
            icon: "💝",
            title: "Cuidado Asequible y Cariñoso",
            description: "Precios competitivos sin comprometer la calidad"
          },
          {
            icon: "⭐",
            title: "Calificación de 5 Estrellas",
            description: "Calificados consistentemente con 5 estrellas por nuestros clientes locales"
          }
        ]
      }
    },
    en: {
      title: "Our Services",
      subtitle: "Comprehensive pet care services designed to keep your furry friends happy, healthy, and loved while you're away. Every service is tailored to your pet's unique needs.",
      services: [
        {
          iconComponent: PawPrint, 
          title: "Dog Walking",
          description: "Energizing and fun walks tailored to your dog's needs.",
          features: [
            "15 min: $20",
            "30 min: $25",
            "1 hour: $30",
            "GPS tracking & updates"
          ],
          price: "From $20",
          cta: "Book Walk"
        },
        {
          iconComponent: Home, 
          title: "Pet Sitting",
          description: "In-home visits to care for your pets, maintaining their routine and comfort.",
          features: [
            "15 min: $20",
            "30 min: $25",
            "1 hour: $30",
            "Feeding, play & medication"
          ],
          price: "From $20",
          cta: "Book Visit"
        },
        {
          iconComponent: Moon, 
          title: "Overnight Care (Your Home)",
          description: "12-hour care in the comfort of your home (7pm - 7am).",
          features: [
            "All-night companionship",
            "Routine maintenance",
            "Feeding & walks",
            "Price: $90"
          ],
          price: "$90",
          cta: "Book Night"
        },
        {
          iconComponent: Users, 
          title: "Overnight Care (Our Home)",
          description: "12-hour care in our safe and cozy home (7pm - 7am).",
          features: [
            "Homely environment",
            "Constant supervision",
            "Socialization (if applicable)",
            "Price: $55"
          ],
          price: "$55",
          cta: "Book Stay"
        },
        {
          iconComponent: Sun, 
          title: "Day Care Full Day",
          description: "A full day of fun and care for your pet (7am - 7pm).",
          features: [
            "1 Day: $35",
            "5 Days: $32/day",
            "10 Days: $30/day",
            "20 Days: $25.75/day",
            "30 Days: $17/day"
          ],
          price: "From $17/day",
          cta: "Book Daycare"
        },
        {
          iconComponent: Briefcase, 
          title: "Day Care Half Day",
          description: "6 hours of care and fun for your pet.",
          features: [
            "1 Day: $25",
            "5 Days: $23/day",
            "10 Days: $22/day",
            "20 Days: $18/day",
            "30 Days: $12/day",
            "Playtime & socialization",
            "Flexible hours (6 hours)"
          ],
          price: "From $12/day",
          cta: "Book Daycare"
        }
      ],
      whyChoose: {
        title: "Why Choose Bocky Pets Care?",
        items: [
          {
            icon: "🏆",
            title: "Trusted Pet Sitters",
            description: "Background-checked, insured, and experienced professionals"
          },
          {
            icon: "⏰",
            title: "Flexible Scheduling",
            description: "Services available 7 days a week, including holidays"
          },
          {
            icon: "💝",
            title: "Affordable & Loving Care",
            description: "Competitive pricing without compromising on quality"
          },
          {
            icon: "⭐",
            title: "5-Star Rated",
            description: "Consistently rated 5 stars by our local clients"
          }
        ]
      }
    }
  };
  
  const currentContent = content[language] || content['en'];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!currentContent || !currentContent.services || !currentContent.whyChoose) {
    return <section id="services" className="py-20 bg-white"><div className="container mx-auto px-4 text-center"><p>Loading services...</p></div></section>;
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-[var(--vibrant-coral)]">{currentContent.title}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentContent.services.map((service, index) => {
            const IconComponent = service.iconComponent;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex" 
              >
                <Card className="h-full service-card-hover border-0 custom-shadow bg-white/80 backdrop-blur-sm flex flex-col w-full">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vibrant-coral)] rounded-2xl mb-4 mx-auto">
                      <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm min-h-[40px]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow flex flex-col justify-between">
                    <ul className="space-y-1.5 mb-6 text-sm">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <PawPrint className="h-4 w-4 text-[var(--vibrant-coral)] mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center mt-auto">
                      <div className="text-2xl font-bold text-[var(--vibrant-coral)] mb-4">{service.price}</div>
                      <Button 
                        onClick={scrollToContact}
                        className="w-full bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-full font-medium transition-all duration-300 py-2.5 text-base"
                      >
                        {service.cta}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-[var(--light-peach-bg)] rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">{currentContent.whyChoose.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.whyChoose.items.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;