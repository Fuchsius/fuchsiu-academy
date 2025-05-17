"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard = ({ quote, name, title, image }: TestimonialProps) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full">
      <p className="text-myprimary text-base md:text-lg mb-8 flex-grow leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 relative mr-4">
          {" "}
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div>
          <h4 className="font-bold text-myprimary">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      quote:
        "BrightMind has truly transformed my career. The 500+ hours of content are well-structured, and the expert instructors made complex topics easy to understand. Highly recommend it to anyone looking to upskill!",
      name: "Praveen Kavindu",
      title: "Web Designer",
      image: "/assets/testimonials/praveen.jpg",
    },
    {
      quote:
        "BrightMind has truly transformed my career. The 500+ hours of content are well-structured, and the expert instructors made complex topics easy to understand. Highly recommend it to anyone looking to upskill!",
      name: "Praveen Kavindu",
      title: "Web Designer",
      image: "/assets/testimonials/praveen.jpg",
    },
    {
      quote:
        "BrightMind has truly transformed my career. The 500+ hours of content are well-structured, and the expert instructors made complex topics easy to understand. Highly recommend it to anyone looking to upskill!",
      name: "Praveen Kavindu",
      title: "Web Designer",
      image: "/assets/testimonials/praveen.jpg",
    },
    // Additional testimonials for pagination demo
    {
      quote:
        "The mentorship I received at Fuchsius Academy was incredible. The instructors are always available to help solve problems and provide guidance. I'm now confident in building full-stack applications independently.",
      name: "Praveen Kavindu",
      title: "Web Designer",
      image: "/assets/testimonials/praveen.jpg",
    },
    {
      quote:
        "I tried several online courses before finding Fuchsius Academy. The difference is clear - the hands-on approach and real-world projects helped me land my first developer job within 3 months of completing the course.",
      name: "Praveen Kavindu",
      title: "Web Designer",
      image: "/assets/testimonials/praveen.jpg",
    },
  ];

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section
      className="w-full py-16 md:py-24 relative overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-3">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
          <p className="text-myprimary">
            What Learners Saying
            <br />
            About
            <span className="gradient-text"> Fuchsius</span>
          </p>
        </h2>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
