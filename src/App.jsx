// BockyPetsCare - Versión 1.0 Web
// Estructura básica: Home, About, Services, Contact

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800">
        <header className="p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">BockyPetsCare</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/about" className="hover:text-green-600">About</Link>
            <Link to="/services" className="hover:text-green-600">Services</Link>
            <Link to="/contact" className="hover:text-green-600">Contact</Link>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="text-center p-4 text-sm text-gray-500">© 2025 BockyPetsCare</footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Loving Pet Care at Your Doorstep</h2>
      <p className="text-lg">We treat your pets like family. Serving [your area].</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">About Us</h2>
      <p>
        BockyPetsCare was born out of love and respect for animals. Our mission is to provide loving,
        trustworthy care for your furry friends while you're away. Whether you're working, on vacation, or
        just need a hand — we're here for you.
      </p>
    </div>
  );
}

function Services() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Our Services</h2>
      <ul className="list-disc ml-6">
        <li>🐾 Pet sitting at your home</li>
        <li>🐶 Dog walking</li>
        <li>🍽️ Feeding & administering medication</li>
        <li>📸 Daily updates with photos/videos</li>
      </ul>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p>Email: info@bockypetscare.com</p>
      <p>Phone: (435) 962-1307</p>
      <p>Instagram: @bockypetscare</p>
    </div>
  );
}

export default App;