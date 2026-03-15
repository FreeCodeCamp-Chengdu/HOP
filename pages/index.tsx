import React from 'react';
import 'tailwindcss/tailwind.css';

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center'>
      <div className='text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to HOP</h1>
        <p className='text-lg text-gray-600 mb-6'>Your journey into the hackathon platform starts here</p>
        <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition'>Get Started</button>
      </div>
    </div>
  );
};

export default HomePage;