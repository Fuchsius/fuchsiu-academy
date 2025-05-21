"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FormField from "@/components/form-field";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
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
      email: "",
      password: "",
      general: "",
    };

    let isValid = true;

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
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          router.push("/auth/success"); // Redirect to success page
        } else {
          setErrors({
            ...errors,
            general: "Invalid email or password. Please try again.",
          });
        }
      } catch (_) {
        setErrors({
          ...errors,
          general: "An error occurred. Please try again later.",
        });
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
            Welcome back
          </h2>
          <p className="text-gray-600 mb-8">
            Log in to your Fuchsius Academy account
          </p>

          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {errors.general}
              </div>
            )}

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
              placeholder="Enter your password"
              // extraLabel={
              //   <Link
              //     href="#"
              //     className="text-sm text-mysecondary hover:underline"
              //   >
              //     Forgot password?
              //   </Link>
              // }
            />

            <FormField
              id="rememberMe"
              name="rememberMe"
              label="Remember me"
              type="checkbox"
              value={formData.rememberMe}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-bg text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-all duration-200 flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" className="mr-2" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>

            <div className="my-6 flex items-center justify-between">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* <button
              type="button"
              className="w-full flex justify-center items-center border border-gray-300 bg-white text-myprimary py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button> */}

            <p className="text-center mt-6 text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-mysecondary hover:underline"
              >
                Sign up
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
                Welcome back to Fuchsius Academy
              </h3>
              <p className="text-gray-700">
                Continue your learning journey and access your courses, progress
                tracking, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
