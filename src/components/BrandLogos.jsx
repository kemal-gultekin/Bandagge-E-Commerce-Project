import React from 'react';

const BrandLogos = () => {
  const logos = [
    '/Pictures/logos/Vector-1.png',
    '/Pictures/logos/Vector-2.png',
    '/Pictures/logos/Vector-3.png',
    '/Pictures/logos/Vector-4.png',
    '/Pictures/logos/Vector-5.png',
    '/Pictures/logos/Vector.png',
  ];

  return (
    <section className="bg-light-gray py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-12 opacity-50 grayscale">
        {logos.map((logo, index) => (
          <img 
            key={index} 
            src={logo} 
            alt="Brand Logo" 
            className="h-8 md:h-12 w-auto"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </section>
  );
};

export default BrandLogos;
