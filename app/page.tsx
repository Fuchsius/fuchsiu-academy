import React from "react";
import { Header } from "./components/header";
import { StudentRating } from "./components/student-rating";
import { FeatureCard } from "./components/feature-card";

const page = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="container px-3 border mx-auto py-20">
        {/* Rating */}
        <div className="flex justify-center mb-8">
          <StudentRating />
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-myprimary mb-8">
            Meet the first-ever life coach dedicated to creators
          </h1>
          <p className="text-myprimary mb-8">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="bg-white border border-gray-200 rounded-lg px-10 py-4 text-gray-800 flex items-center gap-2 hover:border-purple transition-all">
              Explore
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <FeatureCard title="Online" subtitle="Bootcamp" />
          <FeatureCard title="4 weeks" subtitle="Course Duration" />
          <FeatureCard title="6h/ Week" subtitle="Bootcamp" />
          <FeatureCard title="4.8 Star" subtitle="Rating" />
        </div>
      </section>
    </div>
  );
};

export default page;
