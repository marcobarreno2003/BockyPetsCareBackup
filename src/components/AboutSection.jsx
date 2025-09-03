import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Clock, Shield, Target, Eye } from 'lucide-react';
import useStore from '@/lib/store';

const AboutSection = () => {
  const language = useStore(state => state.language);

  const content = {
    es: {
      mainTitle: "Bocky Pets Care",
      title: "¿Quiénes Somos?",
      description: "Somos un equipo de profesionales capacitados para atender las necesidades específicas de cada mascota, proporcionándole un ambiente seguro y cariñoso. Nuestro compromiso es acompañarlas con dedicación y esmero, brindando tranquilidad y confianza a sus propietarios mediante una atención de calidad y servicios especializados en el cuidado de sus mascotas. Fomentamos una comunidad responsable y amorosa hacia los animales, promoviendo su bienestar y felicidad.",
      mission: {
        icon: Target,
        title: "Nuestra Misión",
        text: "Es Brindar un espacio seguro y acogedor donde las mascotas reciban cuidado, cariño y atención personalizada, comprometiéndonos a garantizar su bienestar físico y emocional mientras sus dueños están ausentes."
      },
      vision: {
        icon: Eye,
        title: "Nuestra Visión",
        text: "Ser reconocidos como la mejor opción y líderes en la prestación de servicios de cuidado, educación y recreación de mascotas en Houston, TX. Destacándonos por nuestra excelencia en el bienestar animal, nuestro trato personalizado y el compromiso con la felicidad de cada mascota. Aspiramos a ofrecer un servicio de calidad excepcional, generando confianza y tranquilidad en cada propietario."
      },
      values: {
        title: "Nuestros Valores",
        items: [
          {
            icon: Heart,
            title: "Compromiso",
            description: "Atendemos cada mascota con responsabilidad y dedicación"
          },
          {
            icon: Users,
            title: "Confianza",
            description: "Generamos seguridad y tranquilidad para los propietarios"
          },
          {
            icon: Award,
            title: "Amor por los animales",
            description: "Promovemos un trato respetuoso y afectuoso"
          },
          {
            icon: Shield,
            title: "Profesionalismo",
            description: "Contamos con un equipo capacitado en bienestar animal"
          },
          {
            icon: Clock,
            title: "Innovación",
            description: "Mejoramos constantemente nuestros servicios"
          }
        ]
      }
    },
    en: {
      mainTitle: "Bocky Pets Care",
      title: "About Us",
      description: "We are a team of professionals trained to meet the specific needs of each pet, providing them with a safe and loving environment. Our commitment is to accompany them with dedication and care, providing peace of mind and confidence to their owners through quality care and specialized pet care services. We foster a responsible and loving community towards animals, promoting their well-being and happiness.",
      mission: {
        icon: Target,
        title: "Our Mission",
        text: "To provide a safe and welcoming space where pets receive care, love, and personalized attention, committing ourselves to ensure their physical and emotional well-being while their owners are away."
      },
      vision: {
        icon: Eye,
        title: "Our Vision",
        text: "To be recognized as the best option and leaders in providing pet care, education, and recreation services in Houston, TX. Standing out for our excellence in animal welfare, our personalized treatment, and commitment to each pet's happiness. We aspire to offer exceptional quality service, generating trust and peace of mind for every owner."
      },
      values: {
        title: "Our Values",
        items: [
          {
            icon: Heart,
            title: "Commitment",
            description: "We care for each pet with responsibility and dedication"
          },
          {
            icon: Users,
            title: "Trust",
            description: "We generate security and peace of mind for owners"
          },
          {
            icon: Award,
            title: "Love for Animals",
            description: "We promote respectful and affectionate treatment"
          },
          {
            icon: Shield,
            title: "Professionalism",
            description: "We have a team trained in animal welfare"
          },
          {
            icon: Clock,
            title: "Innovation",
            description: "We constantly improve our services"
          }
        ]
      }
    }
  };

  const currentContent = content[language] || content['en'];

  return (
    <section id="about" className="py-20 bg-[var(--light-peach-bg)]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-[var(--vibrant-coral)]">{currentContent.mainTitle}</span>
          </h2>
        </motion.div>
        
        <motion.div
          className="mb-16 p-8 bg-white/70 backdrop-blur-md rounded-3xl custom-shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">{currentContent.title}</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify">
            {currentContent.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-20 items-stretch">
          {[currentContent.mission, currentContent.vision].map((item, index) => {
            const IconComponent = item.icon;
            return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
              className="p-8 bg-white/70 backdrop-blur-md rounded-3xl custom-shadow flex flex-col h-full"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vibrant-coral)] rounded-2xl">
                  <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-justify flex-grow">{item.text}</p>
            </motion.div>
          );
        })}
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative mb-20"
          >
            <div className="rounded-3xl overflow-hidden custom-shadow aspect-w-16 aspect-h-9 md:aspect-h-7 lg:aspect-h-6">
              <img  
                className="w-full h-full object-cover object-center" 
                alt="Happy dogs enjoying outdoor playtime"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/a70366fd4a1822098c8f14b2a3698c85.jpg"
              />
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">{currentContent.values.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {currentContent.values.items.map((value, index) => {
              const IconComponent = value.icon;
              return (
              <motion.div
                key={value.title}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl custom-shadow service-card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vibrant-coral)] rounded-2xl mb-4">
                  <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600 text-justify">{value.description}</p>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;