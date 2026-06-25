import React from 'react';

const NeuralUniverse = () => {
  // Manual image path - user can replace this with local path
  const sectionImage = "src/Pictures/asian-woman-man-with-winter-clothes 1.png";

  return (
    <section className="py-20 px-6 md:px-10 flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-12">
      <div className="w-full md:w-1/2 order-2 md:order-1">
        <img 
          src={sectionImage} 
          alt="Neural Universe" 
          className="w-full h-auto rounded-lg shadow-xl"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left">
        <h5 className="text-base font-bold text-[#BDBDBD] mb-8">SUMMER 2020</h5>
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-8 leading-tight">
          Part of the Neural Universe
        </h2>
        <h4 className="text-xl font-normal text-gray-text mb-8">
          We know how large objects will act, but things on a small scale.
        </h4>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
          <button className="bg-[#2DC071] text-white px-10 py-4 rounded-md text-sm font-bold hover:bg-[#25a05e] transition-all w-full sm:w-auto">
            BUY NOW
          </button>
          <button className="border-2 border-[#2DC071] text-[#2DC071] px-10 py-4 rounded-md text-sm font-bold hover:bg-[#2DC071] hover:text-white transition-all w-full sm:w-auto">
            READ MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default NeuralUniverse;
