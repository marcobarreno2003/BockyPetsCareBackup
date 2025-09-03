import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/Calendar';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BookingForm = ({ 
  currentContent, 
  name,
  setName,
  email,
  setEmail,
  petType,
  setPetType,
  selectedService, 
  setSelectedService, 
  selectedDate, 
  selectedDateRange, 
  handleDateChange, 
  selectedTimeSlot, 
  setSelectedTimeSlot, 
  availableTimeSlots, 
  bookedSlotsForDay,
  handleBooking, 
  isLoading, 
  language, 
  isRangeService 
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>{currentContent.newBookingTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {currentContent.nameLabel}
            </Label>
            <Input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder={currentContent.nameLabel} 
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {currentContent.emailLabel}
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder={currentContent.emailLabel} 
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
              {currentContent.petTypeLabel}
            </Label>
            <Input 
              id="petType" 
              type="text" 
              value={petType} 
              onChange={(e) => setPetType(e.target.value)} 
              placeholder={currentContent.petTypeLabel}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.selectServiceLabel}
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {currentContent.services.map((service) => (
                <Button
                  key={service.id}
                  variant={selectedService === service.name ? "default" : "outline"}
                  className={`w-full ${
                    selectedService === service.name 
                      ? "bg-[#85b09b] hover:bg-[#85b09b]/90 text-white" 
                      : "hover:border-[#85b09b] hover:text-[#85b09b]"
                  }`}
                  onClick={() => {
                    setSelectedService(service.name);
                    handleDateChange(null); 
                    setSelectedTimeSlot('');
                  }}
                  disabled={isLoading}
                >
                  {service.name}
                </Button>
              ))}
            </div>
          </div>

          {selectedService && (
            <>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.selectDateLabel}
                </Label>
                <Calendar
                  selectedDate={selectedDate}
                  selectedDateRange={selectedDateRange}
                  onDateChange={handleDateChange}
                  allowRangeSelection={isRangeService}
                />
              </div>
              
              {!isRangeService && (selectedDate || (selectedDateRange.from && !selectedDateRange.to)) && (
                <TimeSlotPicker
                  availableSlots={availableTimeSlots}
                  selectedSlot={selectedTimeSlot}
                  onSlotSelect={setSelectedTimeSlot}
                  bookedSlotsForDay={bookedSlotsForDay}
                  language={language}
                  isLoading={isLoading || !selectedService || (!selectedDate && !selectedDateRange.from)}
                />
              )}
            </>
          )}

          <Button
            className="w-full bg-[#85b09b] hover:bg-[#85b09b]/90 text-white"
            onClick={handleBooking}
            disabled={
              isLoading || 
              !name || 
              !email || 
              !petType ||
              !selectedService || 
              (!selectedDate && (!isRangeService || !selectedDateRange.from)) ||
              (isRangeService && !selectedDateRange.to) ||
              (!isRangeService && !selectedTimeSlot)
            }
          >
            {isLoading ? currentContent.bookingButton : currentContent.bookServiceButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;