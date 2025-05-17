import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUs from "@/components/why-choose-us";
import AboutUs from "@/components/about-us";
import TestimonialsSection from "@/components/testimonials-section";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* About Us Section */}
      <AboutUs />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
