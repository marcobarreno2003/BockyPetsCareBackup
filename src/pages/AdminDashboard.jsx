import React from 'react';
import { motion } from 'framer-motion';
import { useAdminDashboardLogic } from '@/hooks/useAdminDashboardLogic';
import useStore from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';

const BookingItem = ({ booking, content, onUpdate, getStatusText, locale }) => (
  <div className="p-4 rounded-lg border border-gray-200 hover:border-[var(--vibrant-coral)] transition-colors bg-white/50">
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">
            {booking.service}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {booking.name} ({booking.email})
          </p>
          <p className="text-sm text-gray-500">
            {booking.pet_type}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
          {getStatusText(booking.status) || 'pending'}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Desde:</span>{' '}
          {format(new Date(booking.booking_date), "PPP 'a las' p", { locale })}
        </p>
        {booking.end_booking_date && (
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Hasta:</span>{' '}
            {format(new Date(booking.end_booking_date), "PPP 'a las' p", { locale })}
          </p>
        )}
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 font-semibold"
          onClick={() => onUpdate(booking.id, 'confirmed', booking.email)}
        >
          {content.confirmButton}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold"
          onClick={() => onUpdate(booking.id, 'cancelled', booking.email)}
        >
          {content.cancelButton}
        </Button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const {
    bookings,
    isLoading,
    currentContent,
    updateBookingStatus,
    getStatusText,
  } = useAdminDashboardLogic();

  const language = useStore(state => state.language);
  const locale = language === 'es' ? es : enUS;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--light-peach-bg)] paw-pattern pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{currentContent.title}</h1>

          <Card className="bg-white/70 backdrop-blur-sm custom-shadow border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">{currentContent.manageBookingsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--vibrant-coral)]" />
                  </div>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">
                    {currentContent.noBookingsFound}
                  </p>
                ) : (
                  bookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={booking}
                      content={currentContent}
                      onUpdate={updateBookingStatus}
                      getStatusText={getStatusText}
                      locale={locale}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;