"use client";

import React from "react";
import Link from "next/link";

const MentorshipJoinSection = () => {
  return (
    <section
      id="join-mentorship"
      className="w-full py-12 bg-[#FACC1540] relative overflow-hidden"
    >
      <div className="container mx-auto px-3 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Join With Our Mentorship
        </h2>

        <Link
          href="/auth/sign-up"
          className="inline-block gradient-bg text-white font-medium py-4 px-10 rounded-lg transition-all duration-300 hover:opacity-90"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default MentorshipJoinSection;
