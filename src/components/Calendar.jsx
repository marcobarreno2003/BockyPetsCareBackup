import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, isAfter, addMonths, subMonths, getDay, startOfDay } from 'date-fns';
import useStore from '@/lib/store'; 

const Calendar = ({
  selectedDate,
  selectedDateRange,
  onDateChange,
  allowRangeSelection = false,
}) => {
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(selectedDate ? startOfDay(selectedDate) : startOfDay(new Date()));

  const today = startOfDay(new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentDisplayMonth(startOfDay(selectedDate));
    } else if (selectedDateRange?.from) {
      setCurrentDisplayMonth(startOfDay(selectedDateRange.from));
    } else {
      setCurrentDisplayMonth(startOfDay(new Date()));
    }
  }, [selectedDate, selectedDateRange]);


  const handlePrevMonth = () => {
    setCurrentDisplayMonth(subMonths(currentDisplayMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentDisplayMonth(addMonths(currentDisplayMonth, 1));
  };

  const handleDateClick = (day) => {
    const dayToCompare = startOfDay(day);
    if (isBefore(dayToCompare, today) && !isSameDay(dayToCompare, today)) return;
    
    onDateChange(dayToCompare);
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentDisplayMonth);
    const monthEnd = endOfMonth(currentDisplayMonth);
    const daysInCalendar = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const prefixDaysCount = getDay(monthStart);
    const prefixDays = Array.from({ length: prefixDaysCount }, (_, i) => (
      <div key={`empty-start-${i}`} className="p-2 text-center"></div>
    ));

    const dayButtons = daysInCalendar.map((day) => {
      const dayAtStart = startOfDay(day);
      const isSelectedSingle = selectedDate && isSameDay(dayAtStart, startOfDay(selectedDate));
      
      const isRangeStart = allowRangeSelection && selectedDateRange?.from && isSameDay(dayAtStart, startOfDay(selectedDateRange.from));
      const isRangeEnd = allowRangeSelection && selectedDateRange?.to && isSameDay(dayAtStart, startOfDay(selectedDateRange.to));
      const isInRange = allowRangeSelection && selectedDateRange?.from && selectedDateRange?.to && 
                        isAfter(dayAtStart, startOfDay(selectedDateRange.from)) && isBefore(dayAtStart, startOfDay(selectedDateRange.to));
      
      const isPast = isBefore(dayAtStart, today) && !isSameDay(dayAtStart, today);
      
      let selectedClass = "";
      if (allowRangeSelection) {
        if (isRangeStart || isRangeEnd) selectedClass = "bg-[#85b09b] text-white hover:bg-[#85b09b]/90";
        else if (isInRange) selectedClass = "bg-[#a6c7b6] text-white hover:bg-[#a6c7b6]/90";
      } else {
        if (isSelectedSingle) selectedClass = "bg-[#85b09b] text-white hover:bg-[#85b09b]/90";
      }
      
      const isDisabled = isPast;

      return (
        <button
          key={dayAtStart.toString()}
          onClick={() => handleDateClick(dayAtStart)}
          disabled={isDisabled}
          className={cn(
            "p-2 text-center rounded-md transition-colors duration-200 w-10 h-10 flex items-center justify-center",
            isPast ? "text-gray-400 cursor-not-allowed" : (selectedClass ? "" : "hover:bg-[#d7e3d8]"),
            selectedClass || "hover:bg-gray-100",
            isDisabled && !isPast && !selectedClass ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          {format(dayAtStart, 'd')}
        </button>
      );
    });
    
    const totalCells = prefixDaysCount + daysInCalendar.length;
    const suffixDaysCount = (7 - (totalCells % 7)) % 7;
    const suffixDays = Array.from({ length: suffixDaysCount }, (_, i) => (
      <div key={`empty-end-${i}`} className="p-2 text-center"></div>
    ));

    return [...prefixDays, ...dayButtons, ...suffixDays];
  };

  const lang = useStore(state => state.language) || 'en';
  const monthNames = {
    es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  const dayNamesShort = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  const currentMonthName = monthNames[lang][currentDisplayMonth.getMonth()];
  const currentYear = currentDisplayMonth.getFullYear();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="text-[#85b09b] disabled:opacity-50" disabled={isBefore(startOfMonth(currentDisplayMonth), startOfMonth(today)) && !isSameDay(startOfMonth(currentDisplayMonth), startOfMonth(today))}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-lg font-semibold text-gray-800">
          {currentMonthName} {currentYear}
        </div>
        <Button variant="ghost" size="icon" onClick={handleNextMonth} className="text-[#85b09b]">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
        {dayNamesShort[lang].map(day => (
          <div key={day} className="font-medium">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
       {allowRangeSelection && (
         <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
           <div className="flex items-center">
             <span className="w-3 h-3 bg-[#a6c7b6] rounded-full mr-1 border border-[#85b09b]"></span>
             <span>{lang === 'es' ? 'Rango Sel.' : 'Range Sel.'}</span>
           </div>
         </div>
        )}
    </div>
  );
};

export default Calendar;