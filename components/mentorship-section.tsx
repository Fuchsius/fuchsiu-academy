"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import MentorshipJoinSection from "./mentorship-join-section";

const MentorshipSection = () => {
  return (
    <>
      <section className="w-full py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-3">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src="/assets/mentorship.png"
                alt="Mentorship Program"
                width={600}
                height={430}
                className="w-full h-auto object-cover rounded-2xl"
                priority
              />
            </div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-myprimary">
                  Elevate Your Career with Our
                </span>{" "}
                <span className="text-mysecondary">Mentorship Program</span>
              </h2>

              <div className="text-myprimary space-y-4">
                <h3 className="text-xl font-bold">
                  Invest in Your Future: Only LKR 30,000
                </h3>
                <p className="text-base leading-relaxed">
                  Unlock your potential with our comprehensive mentorship
                  program tailored for aspiring professionals seeking to advance
                  their careers. For a one-time investment of LKR 30,000, gain
                  exclusive access to personalized guidance, industry insights,
                  and a supportive community committed to your success.
                </p>

                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-3">What You'll Gain:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-mysecondary mr-2 text-xl">•</span>
                      <span>Personalized Mentorship</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-mysecondary mr-2 text-xl">•</span>
                      <span>Industry Insights</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-mysecondary mr-2 text-xl">•</span>
                      <span>Skill Development</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-mysecondary mr-2 text-xl">•</span>
                      <span>Networking Opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-mysecondary mr-2 text-xl">•</span>
                      <span>Career Advancement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join mentorship CTA section */}
      <MentorshipJoinSection />
    </>
  );
};

export default MentorshipSection;
