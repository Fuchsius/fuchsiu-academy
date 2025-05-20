"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-3">
        {/* CTA Box */}
        <div className="max-w-6xl mx-auto rounded-3xl bg-purple-600 relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute w-full h-full inset-0 pointer-events-none">
            <Image
              src="/assets/bggrid.png"
              alt="Grid Pattern"
              layout="fill"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="py-12 md:py-16 px-6 md:px-12 flex flex-col items-center justify-center z-10 relative">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8">
              Take the First Step –
              <br />
              Start Learning Today!
            </h2>

            {/* CTA Button */}
            <Link
              href="#contact-us"
              className="inline-block bg-gray-900 hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 text-center"
              aria-label="Contact us to start learning"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
