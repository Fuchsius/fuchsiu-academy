"use client";

import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard = ({ quote, name, title, image }: TestimonialProps) => {
  return (
    <div className="bg-mytextbg rounded-2xl p-8 flex flex-col h-full">
      <p className="text-myprimary text-base md:text-lg mb-5 flex-grow leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center mt-4">
        {/* <div className="w-12 h-12 relative mr-4">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div> */}
        <div>
          <h4 className="font-semibold text-lg text-myprimary">{name}</h4>
          <p className="text-xs text-myprimary">{title}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  // Add custom styling for Swiper
  const customStyles = `
    .testimonials-swiper .swiper-pagination {
      margin-top: 20px;
    }
    
    .testimonials-swiper .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: #ccc;
      opacity: 0.5;
    }
    
    .testimonials-swiper .swiper-pagination-bullet-active {
      opacity: 1;
      background-color: #333;
    }
    
    /* Hide default navigation buttons since we''re using custom ones */
    .testimonials-swiper .swiper-button-next:after, 
    .testimonials-swiper .swiper-button-prev:after {
      display: none;
    }
  `;

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
  ];

  return (
    <>
      <style jsx global>
        {customStyles}
      </style>
      <section
        className="w-full py-16 md:py-24 relative overflow-hidden"
        id="testimonials"
      >
        <div className="container mx-auto px-3">
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <p className="text-myprimary">
              What Learners Saying
              <br />
              About
              <span className="gradient-text"> Fuchsius</span>
            </p>
          </h2>

          {/* Testimonial Cards with Swiper */}
          <div className="max-w-6xl mx-auto my-12 md:my-16">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                // when window width is >= 640px (sm)
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // when window width is >= 1024px (lg)
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    image={testimonial.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="swiper-button-prev w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                className="swiper-button-next w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
