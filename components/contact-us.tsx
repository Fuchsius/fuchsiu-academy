"use client";

import React, { useState } from "react";
import Image from "next/image";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally send the data to your backend
      console.log("Form submitted with:", formData);

      // Show success message
      setSubmitStatus({
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    } catch (_) {
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full py-16 md:py-24 relative overflow-hidden"
      id="contact-us"
    >
      <div className="container mx-auto px-3">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16">
          <span className="text-myprimary">Contact</span>{" "}
          <span className="gradient-text">Us</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Contact Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm text-myprimary mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-mytextbg rounded-md focus:outline-none focus:ring-2 focus:ring-mysecondary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm text-myprimary mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-mytextbg rounded-md focus:outline-none focus:ring-2 focus:ring-mysecondary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm text-myprimary mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 bg-mytextbg rounded-md focus:outline-none focus:ring-2 focus:ring-mysecondary"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm text-myprimary mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-mytextbg rounded-md focus:outline-none focus:ring-2 focus:ring-mysecondary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-md text-white font-medium transition-all ${
                  isSubmitting
                    ? "bg-purple-400"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {submitStatus && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Contact Image */}
          <div className="w-full hidden md:block">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/assets/contact-us.png"
                alt="Contact Support"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
