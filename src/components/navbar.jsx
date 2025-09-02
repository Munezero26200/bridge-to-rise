import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-blue-100 lg:rounded-b-3xl">
      <div className="h-18  flex items-center justify-between px-6 py-2 md:px-12  lg:px-20 lg:py-2 ">
        <div className="flex items-center space-x-3">
          <img
            src="/src/assets/image/logo.png"
            alt="Bridge2Rise logo"
            className="h-12 md:h-14 lg:h-16 rounded-2xl"
          />
          <h1 className="text-lg md:text-2xl font-bold font-serif">
            BRIDGE2RISE
          </h1>
        </div>

        <ul className="hidden md:flex items-center space-x-8 lg:space-x-16 font-semibold font-serif">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#mentor" className="hover:underline">
              Mentor
            </a>
          </li>
          <li>
            <a href="#mentee" className="hover:underline">
              Mentee
            </a>
          </li>
        </ul>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12"></path>
              <path d="M6 18L18 6"></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18"></path>
              <path d="M3 12h18"></path>
              <path d="M3 18h18"></path>
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-100 border-t">
          <ul className="flex flex-col items-center space-y-4 py-4 font-semibold font-serif">
            <li>
              <a href="#home" className="block w-full text-center">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block w-full text-center">
                About
              </a>
            </li>
            <li>
              <a href="#mentor" className="block w-full text-center">
                Mentor
              </a>
            </li>
            <li>
              <a href="#mentee" className="block w-full text-center">
                Mentee
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
