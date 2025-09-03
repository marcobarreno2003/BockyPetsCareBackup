import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, addMinutes, parse, differenceInMinutes } from 'date-fns';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const generateTimeSlots = (startTimeStr, endTimeStr, intervalMinutes, bookedSlots = []) => {
  const slots = [];
  const start = parse(startTimeStr, 'HH:mm', new Date());
  const end = parse(endTimeStr, 'HH:mm', new Date());

  let current = start;
  while (current < end) {
    const slotValue = format(current, 'HH:mm');
    slots.push({
      label: format(current, 'p'), 
      value: slotValue,
      isAvailable: !bookedSlots.includes(slotValue),
    });
    current = addMinutes(current, intervalMinutes);
  }
  return slots;
};

export const getServiceHours = (serviceName, lang = 'es') => {
  const servicesConfig = {
    es: {
      'Paseo de Perros': { start: '07:00', end: '20:00', interval: 15 },
      'Cuidado de Mascotas': { start: '07:00', end: '20:00', interval: 15 },
      'Cuidado Nocturno': { start: '07:00', end: '19:00', interval: 15, isRange: true }, // User specified 7am-7pm
      'Guardería': { start: '07:00', end: '19:00', interval: 15 },
    },
    en: {
      'Dog Walking': { start: '07:00', end: '20:00', interval: 15 },
      'Pet Sitting': { start: '07:00', end: '20:00', interval: 15 },
      'Overnight Care': { start: '07:00', end: '19:00', interval: 15, isRange: true }, // User specified 7am-7pm
      'Daycare': { start: '07:00', end: '19:00', interval: 15 },
    }
  };
  return servicesConfig[lang][serviceName] || null;
};