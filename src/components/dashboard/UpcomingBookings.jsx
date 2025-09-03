import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';

const UpcomingBookings = ({ currentContent, bookings, getStatusText, language }) => {
  const currentLocale = language === 'es' ? es : enUS;
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>{currentContent.upcomingBookingsTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {currentContent.noBookings}
            </p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#85b09b] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {booking.service}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(parse(booking.booking_date, 'yyyy-MM-dd', new Date()), 'P', { locale: currentLocale })}
                      {booking.booking_time && ` @ ${format(parse(booking.booking_time, 'HH:mm:ss', new Date()), 'p', { locale: currentLocale } )}`}
                      {booking.end_booking_date && ` - ${format(parse(booking.end_booking_date, 'yyyy-MM-dd', new Date()), 'P', { locale: currentLocale })}`}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;