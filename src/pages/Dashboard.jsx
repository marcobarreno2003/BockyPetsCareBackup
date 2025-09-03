import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { format, startOfDay, differenceInDays, isSameDay } from 'date-fns';
import useStore from '@/lib/store';
import { getServiceHours, generateTimeSlots } from '@/lib/utils';
import BookingForm from '@/components/dashboard/BookingForm';
import UpcomingBookings from '@/components/dashboard/UpcomingBookings';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { toast } = useToast();
  const user = useStore(state => state.user);
  const language = useStore(state => state.language);
  const toggleLanguage = useStore(state => state.toggleLanguage);

  const [bookings, setBookings] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState({ from: null, to: null });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedSlotsForDay, setBookedSlotsForDay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [petType, setPetType] = useState('');

  const content = {
    es: {
      title: "Tu Panel de Control",
      newBookingTitle: "Nueva Reserva",
      upcomingBookingsTitle: "Próximas Reservas",
      selectServiceLabel: "Seleccionar Servicio",
      selectDateLabel: "Seleccionar Fecha",
      selectTimeLabel: "Seleccionar Hora",
      nameLabel: "Nombre",
      emailLabel: "Correo Electrónico",
      petTypeLabel: "Tipo de Mascota (ej. Perro, Gato)",
      bookServiceButton: "Solicitar Reserva",
      bookingButton: "Solicitando...",
      noBookings: "Aún no tienes reservas.",
      services: [
        { id: 1, name: 'Paseo de Perros' },
        { id: 2, name: 'Cuidado de Mascotas' },
        { id: 3, name: 'Cuidado Nocturno' },
        { id: 4, name: 'Guardería' },
      ],
      bookingSuccess: "¡Solicitud de reserva enviada con éxito!",
      bookingError: "Error al enviar la solicitud. Inténtalo de nuevo.",
      errorLoadingData: "Error al cargar datos.",
      selectServiceAndDate: "Por favor, selecciona un servicio y una fecha.",
      selectTimeSlot: "Por favor, selecciona un horario.",
      fillAllFields: "Por favor, completa todos los campos.",
      rangeServiceDurationError: "El servicio de Cuidado Nocturno debe ser de al menos 1 día.",
      languageButton: "Switch to English",
      status: {
        pending: "Pendiente",
        confirmed: "Confirmada",
        cancelled: "Cancelada",
        completed: "Completada"
      }
    },
    en: {
      title: "Your Dashboard",
      newBookingTitle: "New Booking Request",
      upcomingBookingsTitle: "Upcoming Bookings",
      selectServiceLabel: "Select Service",
      selectDateLabel: "Select Date",
      selectTimeLabel: "Select Time",
      nameLabel: "Name",
      emailLabel: "Email",
      petTypeLabel: "Pet Type (e.g., Dog, Cat)",
      bookServiceButton: "Request Booking",
      bookingButton: "Requesting...",
      noBookings: "You have no upcoming bookings yet.",
      services: [
        { id: 1, name: 'Dog Walking' },
        { id: 2, name: 'Pet Sitting' },
        { id: 3, name: 'Overnight Care' },
        { id: 4, name: 'Daycare' },
      ],
      bookingSuccess: "Booking request sent successfully!",
      bookingError: "Error sending request. Please try again.",
      errorLoadingData: "Error loading data.",
      selectServiceAndDate: "Please select a service and date.",
      selectTimeSlot: "Please select a time slot.",
      fillAllFields: "Please fill in all fields.",
      rangeServiceDurationError: "Overnight Care service must be at least 1 day long.",
      languageButton: "Cambiar a Español",
      status: {
        pending: "Pending",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        completed: "Completed"
      }
    }
  };
  const currentContent = content[language];
  const serviceDetails = selectedService ? getServiceHours(selectedService, language) : null;
  const isRangeService = serviceDetails?.isRange || false;

  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  const fetchUserBookings = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('booking_date', { ascending: true });

    if (error) {
      console.error("Error fetching user bookings:", error);
      toast({ title: "Error", description: currentContent.errorLoadingData, variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  }, [user, toast, currentContent.errorLoadingData]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  useEffect(() => {
    const calculateSlotStates = async () => {
      if (!selectedService || (!selectedDate && !isRangeService)) {
        setAvailableTimeSlots([]);
        setBookedSlotsForDay([]);
        return;
      }
      
      const serviceConfig = getServiceHours(selectedService, language);
      if (!serviceConfig || isRangeService) {
          setAvailableTimeSlots([]);
          setBookedSlotsForDay([]);
          return;
      }

      const dateToUse = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
      if (!dateToUse) {
          setAvailableTimeSlots([]);
          setBookedSlotsForDay([]);
          return;
      }

      setIsLoading(true);

      const allPossibleSlots = generateTimeSlots(
          serviceConfig.start,
          serviceConfig.end,
          serviceConfig.interval
      );
      setAvailableTimeSlots(allPossibleSlots);
      
      const { data: existingBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('service', selectedService)
        .eq('booking_date', dateToUse)
        .eq('status', 'confirmed');

      if (bookingsError) {
        console.error('Error fetching booked slots:', bookingsError);
        setBookedSlotsForDay([]);
      } else {
        setBookedSlotsForDay(existingBookings.map(b => b.booking_time ? b.booking_time.substring(0,5) : null).filter(Boolean));
      }
      setIsLoading(false);
    };
    
    calculateSlotStates();

  }, [selectedService, selectedDate, language, isRangeService, supabase]);


  const handleDateChange = (date) => {
    setSelectedTimeSlot('');
    if (isRangeService) {
        if (!selectedDateRange.from || selectedDateRange.to) {
            setSelectedDateRange({ from: startOfDay(date), to: null });
            setSelectedDate(null);
        } else {
            const newRange = { from: selectedDateRange.from, to: startOfDay(date) };
            if (isSameDay(newRange.from, newRange.to) || differenceInDays(newRange.to, newRange.from) < 0) {
                setSelectedDateRange({ from: startOfDay(date), to: null });
            } else {
                setSelectedDateRange(newRange);
            }
        }
    } else {
      setSelectedDate(date ? startOfDay(date) : null);
      setSelectedDateRange({ from: null, to: null });
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast({ title: "Error", description: "Debes iniciar sesión para reservar.", variant: "destructive" });
      return;
    }
    if (!name.trim() || !email.trim() || !petType.trim()) {
      toast({ title: "Error", description: currentContent.fillAllFields, variant: "destructive" });
      return;
    }
    if (!selectedService || (!selectedDate && (!isRangeService || !selectedDateRange.from))) {
      toast({ title: "Error", description: currentContent.selectServiceAndDate, variant: "destructive" });
      return;
    }
    if (!isRangeService && !selectedTimeSlot) {
      toast({ title: "Error", description: currentContent.selectTimeSlot, variant: "destructive" });
      return;
    }
    if (isRangeService && (!selectedDateRange.from || !selectedDateRange.to)) {
        toast({ title: "Error", description: "Para Cuidado Nocturno, selecciona un rango de fechas.", variant: "destructive" });
        return;
    }
    if (isRangeService && differenceInDays(selectedDateRange.to, selectedDateRange.from) < 0) {
        toast({ title: "Error", description: "La fecha de fin no puede ser anterior a la fecha de inicio.", variant: "destructive" });
        return;
    }
     if (isRangeService && differenceInDays(selectedDateRange.to, selectedDateRange.from) < 1 && !isSameDay(selectedDateRange.from, selectedDateRange.to)) {
       toast({ title: "Error", description: currentContent.rangeServiceDurationError, variant: "destructive" });
       return;
    }


    setIsLoading(true);
    const bookingData = {
      name,
      email,
      pet_type: petType,
      service: selectedService,
      booking_date: format(isRangeService ? selectedDateRange.from : selectedDate, 'yyyy-MM-dd'),
      booking_time: isRangeService ? null : selectedTimeSlot,
      end_booking_date: isRangeService ? format(selectedDateRange.to, 'yyyy-MM-dd') : null,
      user_id: user.id,
      status: 'pending',
    };

    const { error } = await supabase.from('bookings').insert([bookingData]);

    if (error) {
      console.error("Error creating booking:", error);
      toast({ title: "Error", description: currentContent.bookingError, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: currentContent.bookingSuccess });
      await fetchUserBookings();
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedDateRange({ from: null, to: null });
      setSelectedTimeSlot('');
      setName('');
      setPetType('');
    }
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--light-peach-bg)] paw-pattern pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold text-gray-800">{currentContent.title}</h1>
          <Button onClick={toggleLanguage} variant="outline" className="border-[var(--vibrant-coral)] text-[var(--vibrant-coral)] hover:bg-[var(--vibrant-coral)] hover:text-white">
            {currentContent.languageButton}
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <BookingForm
            currentContent={currentContent}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            petType={petType}
            setPetType={setPetType}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedDate={selectedDate}
            selectedDateRange={selectedDateRange}
            handleDateChange={handleDateChange}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            availableTimeSlots={availableTimeSlots}
            bookedSlotsForDay={bookedSlotsForDay}
            handleBooking={handleBooking}
            isLoading={isLoading}
            language={language}
            isRangeService={isRangeService}
          />
          <UpcomingBookings
            currentContent={currentContent}
            bookings={bookings}
            isLoading={isLoading}
            language={language}
            getStatusText={(statusKey) => currentContent.status[statusKey] || statusKey}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;