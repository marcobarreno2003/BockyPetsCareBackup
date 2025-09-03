import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Send } from 'lucide-react';

const ContactForm = ({ content }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Validation Error",
        description: content.validationError,
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: JSON.stringify(formData),
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: content.successMessage,
      });
      setFormData({ name: '', address: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: content.errorMessage,
        variant: "destructive",
      });
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="custom-shadow border-0 bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-10">
        <CardHeader className="p-0 mb-6 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {content.nameLabel} <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={content.nameLabel} 
                  required 
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  {content.addressLabel}
                </Label>
                <Input 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={content.addressLabel} 
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {content.emailLabel} <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={content.emailLabel} 
                  required 
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {content.phoneLabel} <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={content.phoneLabel} 
                  required 
                  className="bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                {content.messageLabel} <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={content.messageLabel} 
                required 
                className="bg-white min-h-[150px]"
              />
            </div>
            <div className="text-right">
              <Button 
                type="submit" 
                className="bg-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)]/90 text-white rounded-lg px-8 py-3 text-base font-semibold flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-5 w-5" strokeWidth={2}/>
                )}
                {content.submitButton}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;