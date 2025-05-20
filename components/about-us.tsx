"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  const benefits = [
    "Hands-on learning with real projects",
    "Live classes and lifetime access to recordings",
    "Job preparation support including mock interviews and resume building",
    "Internship opportunities to gain real experience",
  ];

  return (
    <section
      className="w-full py-16 md:py-24 relative overflow-hidden"
      id="about-us"
    >
      <div className="container mx-auto px-3">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 lg:gap-16">
          {/* Section Header */}
          <h2 className="lg:hidden text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center w-full">
            <span className="text-myprimary">About</span>{" "}
            <span className="text-mysecondary">Us?</span>
          </h2>

          {/* Left Column - Image with Stat */}
          <div className="w-full lg:w-5/12 relative mb-8 lg:mb-0">
            <div className="rounded-3xl overflow-hidden relative">
              <Image
                src="/assets/student-laptop.jpg"
                alt="Student learning"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />

              {/* Stats Box */}
              {/* <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-md">
                <div className="text-sm font-medium text-gray-600">
                  Average class completion rate
                </div>
                <div className="text-4xl font-bold text-mysecondary">93%</div>
              </div> */}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="w-full lg:w-7/12">
            {/* Desktop Header */}
            <h2 className="hidden lg:block text-4xl lg:text-5xl font-bold mb-8">
              <span className="text-myprimary">About</span>{" "}
              <span className="text-mysecondary">Us?</span>
            </h2>

            {/* Main Content */}
            <div className="space-y-6 text-myprimary">
              {" "}
              <p className="text-base md:text-lg">
                At Fuchsius, we are passionate about empowering the next
                generation of developers. Specializing in the MERN stack —
                MongoDB, Express.js, React, and Node.js — our mission is to make
                full-stack web development education accessible, practical, and
                career-focused.
              </p>
              <p className="text-base md:text-lg">
                We&apos;re not just another online course provider. Our
                instructors are real-world developers who bring industry
                experience into every lesson. From fundamentals to advanced
                projects, we guide our students step-by-step to ensure
                they&apos;re not just learning — they&apos;re building, solving,
                and growing.
              </p>
              {/* Benefits List */}
              <ul className="space-y-3 pt-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-mysecondary mr-2 text-xl">•</span>
                    <span className="text-base md:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>{" "}
              {/* Closing */}
              <p className="text-base md:text-lg pt-2">
                Join hundreds of learners who have started their tech careers
                with us. Whether you&apos;re a beginner, a university student,
                or someone switching careers — we&apos;re here to help you code
                your future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
