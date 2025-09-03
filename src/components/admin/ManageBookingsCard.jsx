import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';


const ManageBookingsCard = ({
  currentContent,
  bookings,
  updateBookingStatus,
  getStatusText,
  language
}) => {
  const locale = language === 'es' ? es : enUS;
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>{currentContent.manageBookingsTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto"> {/* Adjusted max height */}
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {currentContent.noBookingsFound}
            </p>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#85b09b] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {booking.service}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(parse(booking.booking_date, 'yyyy-MM-dd', new Date()), 'P', { locale })}
                        {booking.booking_time && ` @ ${format(parse(booking.booking_time, 'HH:mm:ss', new Date()), 'p', { locale })}`}
                        {booking.end_booking_date && ` - ${format(parse(booking.end_booking_date, 'yyyy-MM-dd', new Date()), 'P', { locale })}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.name} ({booking.email})
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getStatusText(booking.status)}
                    </span>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed', booking.email)}
                      >
                        {currentContent.confirmButton}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled', booking.email)}
                      >
                        {currentContent.cancelButton}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageBookingsCard;