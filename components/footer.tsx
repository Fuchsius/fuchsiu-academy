import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white py-16 border-t border-gray-200">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-myprimary mb-6">
              QUICK LINKS
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="#why-us"
                className="px-4 py-2 rounded-full border border-secondary text-myprimary hover:bg-secondary/50 transition-colors text-sm"
              >
                Why Us
              </Link>
              <Link
                href="#about-us"
                className="px-4 py-2 rounded-full border border-secondary text-myprimary hover:bg-secondary/50 transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="#testimonials"
                className="px-4 py-2 rounded-full border border-secondary text-myprimary hover:bg-secondary/50 transition-colors text-sm"
              >
                Testimonials
              </Link>
              <Link
                href="#contact-us"
                className="px-4 py-2 rounded-full border border-secondary text-myprimary hover:bg-secondary/50 transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
            <Link
              href="https://fuchsius.com"
              target="_blank"
              className="flex items-center mt-8"
            >
              <Image
                src="/assets/fuchsius-logo.png"
                alt="Fuchsius Logo"
                width={200}
                height={50}
                className="inline-block mr-2"
              />
            </Link>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-myprimary mb-6">
              CONTACT US
            </h3>
            <div className="space-y-3 text-myprimary">
              <p>+94 112 795 603</p>
              <p>+94 77 7 825 062</p>
              <a
                href="mailto:support@fuchsisus.com"
                className="block hover:text-mysecondary transition-colors"
              >
                support@fuchsisus.com
              </a>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-myprimary mb-2">
                LOCATION
              </h3>
              <p className="text-myprimary">
                Sir Baron Jayathilake Mawatha,
                <br />
                Colombo, Lanka
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-myprimary mb-6">
              SOCIAL MEDIA
            </h3>
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 576 512"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="text-myprimary text-sm text-center">
              © {currentYear}{" "}
              <span className=" text-secondary font-medium">
                Fuchsius Academy
              </span>
              . All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
