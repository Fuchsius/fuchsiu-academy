"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FormField from "@/components/form-field";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function SignUpPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is being edited
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: "",
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const success = await signup({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        if (success) {
          router.push("/auth/success"); // Redirect to success page
        } else {
          // Handle signup failure
          setErrors({
            ...errors,
            email: "This email may already be registered.",
          });
        }
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-myprimary">
                Fuchsius Academy
              </h1>
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-myprimary">
            Create your account
          </h2>
          <p className="text-gray-600 mb-8">
            Start your journey with Fuchsius Academy
          </p>

          <form onSubmit={handleSubmit}>
            <FormField
              id="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Enter your full name"
            />

            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="your.email@example.com"
            />

            <FormField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Create a secure password"
            />

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
            />

            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <Link href="#" className="text-mysecondary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-mysecondary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-bg text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" className="mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-mysecondary hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-mybg1">
        <div className="flex h-full items-center justify-center p-10">
          <div className="max-w-md">
            <Image
              src="/assets/student-laptop.jpg"
              alt="Student using laptop"
              width={600}
              height={800}
              className="rounded-lg shadow-xl"
              priority
            />
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-myprimary mb-3">
                Join our learning community
              </h3>
              <p className="text-gray-700">
                Access expert-led courses, connect with fellow students, and
                take your skills to the next level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
