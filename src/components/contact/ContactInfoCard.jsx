import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import WhatsAppIcon from '@/components/contact/WhatsAppIcon';
import useStore from '@/lib/store';

const ContactInfoCard = ({ info, index }) => {
  const IconComponent = info.iconComponent;
  const language = useStore(state => state.language);

  const isContactCard = info.title.toLowerCase().includes('llámanos') || info.title.toLowerCase().includes('call') || info.title.toLowerCase().includes('contáctanos') || info.title.toLowerCase().includes('contact us');

  return (
    <motion.div
      key={info.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="text-center service-card-hover border-0 custom-shadow bg-white/80 backdrop-blur-sm h-full flex flex-col justify-between">
        <CardHeader>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vibrant-coral)] rounded-2xl mb-4 mx-auto">
            <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">{info.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
          {info.action && isContactCard ? (
            <div className="flex flex-col space-y-2 w-full px-4">
              <a 
                href={info.action}
                className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/80 font-medium transition-colors duration-300 text-lg mb-2"
              >
                {info.content}
              </a>
              {info.whatsappAction && (
                <Button 
                  onClick={() => window.open(info.whatsappAction, '_blank')} 
                  variant="outline" 
                  className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-sm"
                >
                  <WhatsAppIcon className="mr-2 h-4 w-4 text-[#25D366]" strokeWidth={0} />
                  {language === 'es' ? 'WhatsApp' : 'WhatsApp'}
                </Button>
              )}
              {info.smsAction && (
                <Button 
                  onClick={() => window.location.href = info.smsAction}
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 text-sm"
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-500" strokeWidth={2} />
                  {language === 'es' ? 'Mensaje de Texto' : 'Text Message'}
                </Button>
              )}
            </div>
          ) : info.action ? (
            <a 
              href={info.action}
              className="text-[var(--vibrant-coral)] hover:text-[var(--vibrant-coral)]/80 font-medium transition-colors duration-300 text-lg"
            >
              {info.content}
            </a>
          ) : (
            <p className="text-gray-600 font-medium text-lg">{info.content}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInfoCard;