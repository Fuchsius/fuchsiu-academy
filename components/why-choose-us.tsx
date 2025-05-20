"use client";

import Image from "next/image";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

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
      className="w-full bg-mysecondary py-16 md:py-24 relative overflow-hidden"
      id="why-us"
    >
      {/* Grid Background Pattern */}
      <div className="absolute w-full h-full inset-0 pointer-events-none z-10">
        <Image
          src="/assets/bggrid.png"
          alt="Grid Pattern"
          layout="fill"
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto px-3 relative flex flex-col items-center z-20">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16">
          Why Choose Us?
        </h2>{" "}
        {/* Features Grid - Using gridlines as shown in the image */}{" "}
        <div className="self-stretch rounded-3xl outline-1 outline-white/20 inline-flex justify-start items-end overflow-hidden mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto relative bg">
            {features.map((feature, index) => (
              //   <FeatureItem
              //     key={index}
              //     title={feature.title}
              //     description={feature.description}
              //   />
              <div
                key={index}
                className="self-stretch p-11 bg-gradient-to-b from-mywhitetext/10 to-mywhitetext/0 shadow-[inset_0px_4px_17.600000381469727px_0px_rgba(255,255,255,0.06)] border-mywhitetext/20 inline-flex flex-col justify-between items-center overflow-hidden"
              >
                <div className="flex flex-col justify-start items-center gap-5">
                  <div className="self-stretch text-center justify-start text-mywhitetext text-2xl font-bold">
                    {feature.title}
                  </div>
                  <div className="self-stretch text-center justify-start text-mywhitetext/80 text-base font-medium leading-snug">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
