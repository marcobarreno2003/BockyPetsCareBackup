import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/Calendar';
import TimeSlotPicker from '@/components/TimeSlotPicker'; 

const ManageAvailabilityCard = ({
  currentContent,
  selectedService,
  setSelectedService,
  selectedDate,
  selectedDateRange,
  selectedTimeSlot, 
  setSelectedTimeSlot, 
  availableTimeSlots, 
  adminMarkedUnavailableSlots,
  handleDateChange,
  availabilityData,
  isRangeService,
  updateDayAvailability,
  updateSlotAvailability, 
  isLoading,
  language,
  viewMode 
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>{currentContent.manageAvailabilityTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.selectServiceLabel}
            </label>
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
                >
                  {service.name}
                </Button>
              ))}
            </div>
          </div>

          {selectedService && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.selectDateLabel}
                </label>
                <Calendar
                  selectedDate={selectedDate}
                  selectedDateRange={selectedDateRange}
                  onDateChange={handleDateChange}
                  availabilityData={availabilityData}
                  selectedService={selectedService}
                  allowRangeSelection={isRangeService}
                  viewMode={viewMode}
                />
              </div>

              {!isRangeService && (selectedDate || selectedDateRange.from) && (
                <div>
                   <TimeSlotPicker
                    availableSlots={availableTimeSlots}
                    selectedSlot={selectedTimeSlot}
                    onSlotSelect={setSelectedTimeSlot}
                    adminMarkedUnavailableSlots={adminMarkedUnavailableSlots}
                    language={language}
                    isLoading={isLoading || !selectedService || (!selectedDate && !selectedDateRange.from)}
                  />
                  {selectedTimeSlot && (
                    <div className="flex gap-2 mt-2">
                       <Button
                        size="sm"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => updateSlotAvailability(selectedTimeSlot, true)}
                        disabled={isLoading}
                      >
                        {currentContent.markSlotAvailableButton}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => updateSlotAvailability(selectedTimeSlot, false)}
                        disabled={isLoading}
                      >
                        {currentContent.markSlotUnavailableButton}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-[#85b09b] hover:bg-[#85b09b]/90 text-white"
              onClick={() => updateDayAvailability(true)}
              disabled={isLoading || !selectedService || (!selectedDate && (!isRangeService || !selectedDateRange.from || !selectedDateRange.to))}
            >
              {currentContent.markAvailableButton}
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              onClick={() => updateDayAvailability(false)}
              disabled={isLoading || !selectedService || (!selectedDate && (!isRangeService || !selectedDateRange.from || !selectedDateRange.to))}
            >
              {currentContent.markUnavailableButton}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageAvailabilityCard;