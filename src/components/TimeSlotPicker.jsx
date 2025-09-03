import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';

const TimeSlotPicker = ({
  availableSlots,
  selectedSlot,
  onSlotSelect,
  language,
  isLoading,
  bookedSlotsForDay = [], 
}) => {
  const content = {
    es: {
      noSlots: "No hay horarios disponibles para esta fecha/servicio.",
      selectTime: "Seleccionar Hora",
      booked: "Reservado",
    },
    en: {
      noSlots: "No time slots available for this date/service.",
      selectTime: "Select Time",
      booked: "Booked",
    }
  };
  const currentContent = content[language];
  const currentLocale = language === 'es' ? es : enUS;

  if (isLoading) {
    return <div className="text-center text-gray-500 py-4">{language === 'es' ? 'Cargando horarios...' : 'Loading time slots...'}</div>;
  }

  if (!availableSlots || availableSlots.length === 0) {
    return <div className="text-center text-gray-500 py-4">{currentContent.noSlots}</div>;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">{currentContent.selectTime}:</p>
      <ScrollArea className="h-[200px] w-full rounded-md border p-2 bg-gray-50">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {availableSlots.map((slot) => {
            const slotValue = slot.value; 
            const isBooked = bookedSlotsForDay.includes(slotValue);
            
            const isDisabled = isBooked;
            
            const slotDate = new Date();
            const [hours, minutes] = slotValue.split(':');
            slotDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            let variant = 'outline'; 
            let buttonText = format(slotDate, 'p', { locale: currentLocale });
            let additionalClassNames = "border-gray-300 text-gray-700 hover:border-[#85b09b] hover:text-[#85b09b] focus:ring-2 focus:ring-[#85b09b]";
            let statusLabel = '';

            if (isBooked) {
              variant = 'destructive';
              additionalClassNames = "bg-red-200 text-red-700 cursor-not-allowed hover:bg-red-200 line-through relative opacity-80";
              statusLabel = currentContent.booked;
            } else if (selectedSlot === slotValue) { 
              variant = 'default';
              additionalClassNames = "bg-[#85b09b] hover:bg-[#85b09b]/90 text-white focus:ring-2 focus:ring-[#6a8d79]";
            }
            
            return (
              <Button
                key={slotValue}
                variant={variant}
                className={cn(
                  "w-full text-xs sm:text-sm transition-all duration-150 ease-in-out",
                  additionalClassNames
                )}
                onClick={() => !isDisabled && onSlotSelect(slotValue)}
                disabled={isDisabled || isLoading}
                aria-label={
                  isDisabled 
                    ? `${buttonText} - ${statusLabel}`
                    : `${buttonText} - ${currentContent.selectTime}`
                }
              >
                {buttonText}
                {statusLabel && <span className="absolute bottom-0.5 right-0.5 text-[0.6rem] px-1 bg-red-500 text-white rounded-sm">{statusLabel}</span>}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TimeSlotPicker;