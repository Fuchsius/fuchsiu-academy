import React from "react";
import { Header } from "@/components/header";
import { StudentRating } from "@/components/student-rating";
import { FeatureCard } from "@/components/feature-card";
import HeroSection from "./HeroSection";
import WhyChooseUs from "@/components/why-choose-us";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
