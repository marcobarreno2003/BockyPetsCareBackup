import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import useStore from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

const adminDashboardContent = {
  es: {
    title: "Panel de Administración",
    manageBookingsTitle: "Gestionar Reservas",
    noBookingsFound: "No se encontraron reservas pendientes.",
    confirmButton: "Confirmar",
    cancelButton: "Cancelar",
    errorFetchingBookings: "Error al obtener las reservas",
    updateFailedToastTitle: "Falló la Actualización",
    bookingUpdatedToastTitle: "Reserva Actualizada",
    bookingUpdatedToastDesc: (status) => `Estado de la reserva cambiado a ${status}.`,
    emailSentToastTitle: "Correo Electrónico Simulado",
    emailSentToastDesc: (email, status) => `Se ha enviado un correo a ${email} notificando que su reserva ha sido ${status}.`,
    statusPending: "pendiente",
    statusConfirmed: "confirmada",
    statusCancelled: "cancelada",
  },
  en: {
    title: "Admin Dashboard",
    manageBookingsTitle: "Manage Bookings",
    noBookingsFound: "No pending bookings found.",
    confirmButton: "Confirm",
    cancelButton: "Cancel",
    errorFetchingBookings: "Error fetching bookings",
    updateFailedToastTitle: "Update Failed",
    bookingUpdatedToastTitle: "Booking Updated",
    bookingUpdatedToastDesc: (status) => `Booking status changed to ${status}.`,
    emailSentToastTitle: "Simulated Email Sent",
    emailSentToastDesc: (email, status) => `An email has been sent to ${email} notifying that their booking has been ${status}.`,
    statusPending: "pending",
    statusConfirmed: "confirmed",
    statusCancelled: "cancelled",
  }
};

export const useAdminDashboardLogic = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const language = useStore(state => state.language);
  const currentContent = adminDashboardContent[language];

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'pending') 
        .order('booking_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: currentContent.errorFetchingBookings,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, currentContent.errorFetchingBookings]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getStatusText = (status) => {
    if (status === 'confirmed') return currentContent.statusConfirmed;
    if (status === 'cancelled') return currentContent.statusCancelled;
    return currentContent.statusPending;
  };

  const updateBookingStatus = async (bookingId, newStatus, userEmail) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast({
        title: currentContent.bookingUpdatedToastTitle,
        description: currentContent.bookingUpdatedToastDesc(getStatusText(newStatus)),
        className: "bg-[#85b09b] text-white",
      });

      toast({
        title: currentContent.emailSentToastTitle,
        description: currentContent.emailSentToastDesc(userEmail, getStatusText(newStatus)),
        className: "bg-blue-500 text-white",
      });

      setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
    } catch (error) {
      toast({
        title: currentContent.updateFailedToastTitle,
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    bookings,
    isLoading,
    currentContent,
    updateBookingStatus,
    getStatusText,
  };
};