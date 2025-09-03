import React from 'react';
import { motion } from 'framer-motion';
import useStore from '@/lib/store';
import { contactContent } from '@/lib/content/contactContent';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import BookingCard from '@/components/contact/BookingCard';
import QuickResponseCard from '@/components/contact/QuickResponseCard';
import ContactForm from '@/components/contact/ContactForm';

const ContactSection = () => {
  const language = useStore(state => state.language);
  const currentContent = contactContent[language];

  return (
    <section id="contact" className="py-20 bg-white">
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
          {currentContent.contactInfo.map((info, index) => (
            <ContactInfoCard key={info.title} info={info} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          <BookingCard content={currentContent.bookingSection} />
          <QuickResponseCard content={currentContent.quickResponse} />
        </motion.div>

        <ContactForm content={currentContent.contactForm} />

      </div>
    </section>
  );
};

export default ContactSection;