import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/contact/WhatsAppIcon';

const QuickResponseCard = ({ content }) => {
  const smsLink = "sms:+14359621307&body=Hi!%20I%20just%20found%20your%20website%20and%20would%20love%20to%20know%20more%20about%20your%20pet%20care%20services.%20🐾";

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="rounded-3xl overflow-hidden custom-shadow mb-8">
        <img
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/25979de2912468f1305a7880f6531833.jpg"
          className="w-full h-auto lg:h-[350px] object-cover" 
          alt="Happy pets with their caretakers in a welcoming environment"
        />
      </div>
      <Card className="custom-shadow border-0 bg-[var(--light-peach-bg)]/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="h-7 w-7 text-[var(--vibrant-coral)]" strokeWidth={2} />
            <h3 className="text-xl font-bold text-gray-800">{content.title}</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed text-sm">
            {content.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={() => window.open('https://wa.link/ckphca', '_blank')}
              className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full py-3 text-base font-semibold"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5 text-white" strokeWidth={0} />
              {content.whatsappButtonText}
            </Button>
            <Button 
              onClick={() => window.location.href = smsLink}
              variant="outline"
              className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-full py-3 text-base font-semibold"
            >
              <MessageSquare className="mr-2 h-5 w-5 text-blue-500" strokeWidth={2} />
              {content.smsButtonText}
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Phone className="h-4 w-4 text-[var(--vibrant-coral)]" strokeWidth={2} />
            <span className="text-gray-600 text-sm">{content.availability}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickResponseCard;