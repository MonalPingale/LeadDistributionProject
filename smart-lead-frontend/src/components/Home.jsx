import React from 'react'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-[#0b0914] text-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;