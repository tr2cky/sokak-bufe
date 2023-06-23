'use client'
import { useState } from "react";
import Image from 'next/image'
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "p00jilyy",
  dataset: "production",
  apiVersion: "2023-06-23",
  useCdn: false,
});
const IndexPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
{/*                 <Image src='/logo.svg' 
                height={100}
                width={100}
                className="h-8 w-auto" alt="Restaurant Logo" /> */}
              <h1 className="font-bold p-1 bg-gradient-to-r from-yellow-400 to-rose-400">Sokak Büfe</h1>
              </div>
              {/* Navigation links */}
              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Menu
                </a>
              </div>
            </div>
            {/* Hamburger menu for smaller devices */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Hamburger menu content */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                Menüler
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                Yiyecekler
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                İçecekler
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main>

        {/* Menu section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Menü</h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Enfes Ekmek aralarımızdan bazıları
              </p>
            </div>
            {/* Menu items */}
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example menu item */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/kokorec.jpg" alt="Kokoreç" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Kokoreç</p>
                    <p className="mt-2 text-base text-gray-500">
                      Kuzu kokoreç, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/kofte.jpg" alt="Köfte" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Kokoreç</p>
                    <p className="mt-2 text-base text-gray-500">
                      Köfte, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/sucuk.jpg" alt="Sucuk" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Sucuk</p>
                    <p className="mt-2 text-base text-gray-500">
                      Sucuk, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">

                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Sucuk</p>
                    <p className="mt-2 text-base text-gray-500">
                      Sucuk, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;
