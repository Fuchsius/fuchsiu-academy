import { FeatureCard } from "@/components/feature-card";
import { StudentRating } from "@/components/student-rating";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="container px-3 mx-auto py-20">
      {/* Rating */}
      <div className="flex justify-center mb-6">
        <StudentRating />
      </div>

      {/* Main Hero Content */}
      <div className="text-center max-w-5xl mx-auto mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-myprimary mb-6">
          Meet the first-ever life coach dedicated to creators
        </h1>
        <p className="text-myprimary text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          Built for creators, our mentorship program helps unlock your full
          potential through expert guidance, creative focus, and real-world
          results. 
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href={"#about-us"}>
            <button className="border cursor-pointer border-myprimary rounded-lg px-10 py-4 text-myprimary font-semibold w-48 flex items-center justify-center gap-2 hover:border-purple hover:font-bold transition-all duration-300">
              Explore
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-45"
              >
                <path
                  d="M8 3L14 8L8 13M14 8L2 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-6xl mx-auto">
        <FeatureCard title="Online" subtitle="Bootcamp" />
        <FeatureCard title="4 weeks" subtitle="Course Duration" />
        <FeatureCard title="6h/ Week" subtitle="Bootcamp" />
        <FeatureCard title="4.8 Star" subtitle="Rating" />
      </div>
    </section>
  );
};

export default HeroSection;
