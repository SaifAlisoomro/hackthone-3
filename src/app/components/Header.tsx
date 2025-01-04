


"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='z-30 sticky top-0 bg-white shadow-sm shadow-black'>
      <header className="text-gray-600 body-font font-sans font-bold">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-4xl text-[#044e83] font-bold">Blog Site</span>
          </a>
          {/* Hamburger Menu for Small Screens */}
          <button
            className="inline-flex md:hidden ml-auto text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex md:ml-auto flex flex-wrap items-center text-base justify-center w-full md:w-auto`}
          >
            <Link href="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href="/blog" className="mr-5 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/contact" className="mr-5 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
