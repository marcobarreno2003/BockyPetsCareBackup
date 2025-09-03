import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Jennifer Martinez",
      petName: "Bella",
      petType: "Golden Retriever",
      rating: 5,
      text: "Bocky Pets Care has been a lifesaver! Sarah takes such wonderful care of Bella, and I always receive updates with photos. Bella gets so excited when she sees Sarah coming!",
      service: "Dog Walking & Pet Sitting",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    },
    {
      name: "David Thompson",
      petName: "Whiskers & Mittens",
      petType: "Two Cats",
      rating: 5,
      text: "I was nervous about leaving my cats for a week, but Mike made sure they were comfortable and happy. The daily reports gave me such peace of mind. Highly recommend!",
      service: "Overnight Care",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    },
    {
      name: "Lisa Chen",
      petName: "Rocky",
      petType: "German Shepherd",
      rating: 5,
      text: "Emma is amazing with Rocky! He's a high-energy dog, and she knows exactly how to tire him out. The GPS tracking feature is fantastic - I can see all their adventures!",
      service: "Dog Walking",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    },
    {
      name: "Michael Rodriguez",
      petName: "Luna",
      petType: "Border Collie",
      rating: 5,
      text: "The daycare service is perfect for Luna's social needs. She comes home tired and happy every day. The team really understands each pet's personality.",
      service: "Daycare",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    },
    {
      name: "Sarah Williams",
      petName: "Coco",
      petType: "French Bulldog",
      rating: 5,
      text: "Professional, reliable, and genuinely caring. Coco has separation anxiety, but the team handles it so well. They've become like family to us!",
      service: "Pet Sitting",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    },
    {
      name: "James Park",
      petName: "Max & Ruby",
      petType: "Two Rabbits",
      rating: 5,
      text: "So grateful to find a service that cares for rabbits too! The team is knowledgeable about different pet needs and always goes above and beyond.",
      service: "Pet Sitting",
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/47424fa7-b8b7-4a33-8788-2892f63fac98/ff9cecce0b1fda8c57fc5aea12ec2cd4.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], index });
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[var(--light-peach-bg)] via-white to-[var(--vibrant-coral)]/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-[var(--vibrant-coral)]">What Pet Parents Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the families who trust us with their beloved pets every day.
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.index}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="max-w-md mx-auto mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full border-[var(--vibrant-coral)] text-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)] hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[var(--vibrant-coral)]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full border-[var(--vibrant-coral)] text-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <Card className="h-full custom-shadow border-0 bg-white/80 backdrop-blur-sm service-card-hover">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-[var(--soft-peach)] fill-[var(--soft-peach)]" strokeWidth={1.5} />
        ))}
      </div>
      
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.text}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        <img  
          className="w-12 h-12 rounded-full object-cover" 
          alt={`${testimonial.petName} - ${testimonial.petType}`}
         src={testimonial.image} />
        <div>
          <div className="font-semibold text-gray-800">{testimonial.name}</div>
          <div className="text-sm text-[var(--vibrant-coral)]">{testimonial.petName} • {testimonial.petType}</div>
          <div className="text-xs text-gray-500">{testimonial.service}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialsSection;