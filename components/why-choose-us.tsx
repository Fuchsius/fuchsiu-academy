"use client";

import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 h-full">
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-white/90 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert Instructors",
      description:
        "Our team consists of industry professionals with years of experience in full-stack development. You'll learn directly from developers who work with the MERN stack daily.",
    },
    {
      title: "Structured Curriculum",
      description:
        "Our courses are carefully designed to take you from beginner to advanced, with hands-on projects and real-world examples to reinforce your learning.",
    },
    {
      title: "100% Practical Approach",
      description:
        "We believe in learning by doing. From day one, you'll build projects, solve problems, and gain the confidence to work on real-world applications.",
    },
    {
      title: "Online & Flexible",
      description:
        "Learn at your own pace with our flexible online sessions. Whether you're a student or a working professional, we fit into your schedule.",
    },
  ];
  return (
    <section
      className="w-full bg-[#7E22CE] py-16 md:py-24 relative overflow-hidden"
      id="why-us"
    >
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12">
          {[...Array(13)].map((_, i) => (
            <div key={`vl-${i}`} className="h-full border-r border-white"></div>
          ))}
        </div>
        <div className="absolute inset-0 w-full h-full grid grid-rows-12">
          {[...Array(13)].map((_, i) => (
            <div key={`hl-${i}`} className="w-full border-b border-white"></div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16">
          Why Choose Us?
        </h2>{" "}
        {/* Features Grid - Using gridlines as shown in the image */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto relative">
          {/* Gridlines overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none hidden lg:block">
            <div className="w-full h-full grid grid-cols-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="h-full border-r border-white last:border-r-0"
                ></div>
              ))}
            </div>
            <div className="absolute inset-0 w-full h-full grid grid-rows-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="w-full border-b border-white last:border-b-0"
                ></div>
              ))}
            </div>
          </div>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}{" "}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
