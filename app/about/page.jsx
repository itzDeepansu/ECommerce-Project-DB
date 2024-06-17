import React from 'react';
import Navbar from '@/components/Navbar';

const AboutPage = () => {

  return (
    <>
    <Navbar />
    <div className="bg-white p-8 rounded-lg shadow-md">

      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our eCommerce website! We strive to provide you with the best shopping experience possible.
      </p>
      <p className="mb-4">
        Our website is built using Next.js, React, and Tailwind CSS for a smooth and responsive user interface.
      </p>
      <p className="mb-4">
        We take your security seriously, which is why we use Clerk for authentication to ensure your account is safe and secure.
      </p>
      <p className="mb-4">
        For payments, we utilize Stripe's secure payment gateway, allowing you to shop with confidence.
      </p>
      <p className="mb-4">
        Our product catalog is powered by dummy JSON data, offering a wide range of items for you to explore and purchase.
      </p>
    </div>
    </>
  );
};

export default AboutPage;
