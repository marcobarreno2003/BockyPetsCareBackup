import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const smsLink = "sms:+14359621307&body=Hi!%20I%20just%20found%20your%20website%20and%20would%20love%20to%20know%20more%20about%20your%20pet%20care%20services.%20🐾";

export const contactContent = {
    es: {
      title: "Contáctanos",
      subtitle: "¿Tienes preguntas o necesitas ayuda? ¡Estamos aquí para servirte!",
      contactInfo: [
        {
          iconComponent: Phone,
          title: "Llámanos o Contáctanos",
          content: "4359621307",
          action: "tel:4359621307",
          whatsappAction: "https://wa.link/ckphca",
          smsAction: smsLink,
        },
        {
          iconComponent: Mail,
          title: "Envíanos un Email",
          content: "bockypetscare@gmail.com",
          action: "mailto:bockypetscare@gmail.com",
        },
        {
          iconComponent: MapPin,
          title: "Área de Servicio",
          content: "Houston, TX",
          action: null,
        }
      ],
      bookingSection: {
        title: "Reserva Nuestros Servicios",
        subtitle: "Para programar un servicio, por favor inicia sesión o crea una cuenta. ¡Es rápido y fácil!",
        loginButton: "Iniciar Sesión",
        registerButton: "Crear Cuenta",
        loggedInSubtitle: "Ya has iniciado sesión. ¡Dirígete a tu panel para reservar!",
        goToDashboardButton: "Ir al Panel"
      },
      quickResponse: {
        title: "Respuesta Rápida",
        text: "Normalmente respondemos a todas las consultas y solicitudes de reserva dentro de 2-4 horas durante el horario comercial. Para necesidades urgentes de cuidado de mascotas, por favor llámanos.",
        whatsappButtonText: "Chatea en WhatsApp",
        smsButtonText: "Envía un SMS",
        availability: "Disponible los 7 días de la semana para tu tranquilidad."
      },
      contactForm: {
        title: "Envíanos un Mensaje",
        nameLabel: "Nombre",
        addressLabel: "Dirección (Opcional)",
        emailLabel: "Email",
        phoneLabel: "Teléfono",
        messageLabel: "Mensaje",
        submitButton: "Enviar Mensaje",
        successMessage: "¡Mensaje enviado! Gracias por contactarnos. Te hemos enviado un correo de seguimiento.",
        errorMessage: "Error al enviar el mensaje. Inténtalo de nuevo.",
        validationError: "Por favor, completa todos los campos obligatorios."
      }
    },
    en: {
      title: "Get In Touch",
      subtitle: "Have questions or need assistance? We're here to help!",
      contactInfo: [
        {
          iconComponent: Phone,
          title: "Call or Contact Us",
          content: "4359621307",
          action: "tel:4359621307",
          whatsappAction: "https://wa.link/ckphca",
          smsAction: smsLink,
        },
        {
          iconComponent: Mail,
          title: "Email Us",
          content: "bockypetscare@gmail.com",
          action: "mailto:bockypetscare@gmail.com",
        },
        {
          iconComponent: MapPin,
          title: "Service Area",
          content: "Houston, TX",
          action: null,
        }
      ],
      bookingSection: {
        title: "Book Our Services",
        subtitle: "To schedule a service, please log in or create an account. It's quick and easy!",
        loginButton: "Login",
        registerButton: "Create Account",
        loggedInSubtitle: "You are already logged in. Head to your dashboard to book!",
        goToDashboardButton: "Go to Dashboard"
      },
      quickResponse: {
        title: "Quick Response",
        text: "We typically respond to all inquiries and booking requests within 2-4 hours during business hours. For urgent pet care needs, please call us.",
        whatsappButtonText: "Chat on WhatsApp",
        smsButtonText: "Send an SMS",
        availability: "Available 7 days a week for your peace of mind."
      },
      contactForm: {
        title: "Send Us a Message",
        nameLabel: "Name",
        addressLabel: "Address (Optional)",
        emailLabel: "Email",
        phoneLabel: "Phone",
        messageLabel: "Message",
        submitButton: "Send Message",
        successMessage: "Message sent! Thanks for reaching out. We've sent you a follow-up email.",
        errorMessage: "Error sending message. Please try again.",
        validationError: "Please fill in all required fields."
      }
    }
};