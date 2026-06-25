import React from 'react';

const EditorsPick = () => {
  const categories = [
    { 
      name: 'MEN', 
      img: 'src/Pictures/filter.png', 
    },
    { 
      name: 'WOMEN', 
      img: 'src/Pictures/filter-1.png', 
    },
    { 
      name: 'ACCESSORIES', 
      img: 'src/Pictures/filter-2.png', 
    },
    { 
      name: 'KIDS', 
      img: 'src/Pictures/filter-3.png', 
    },
  ];

  return (
    <section className="bg-light-gray py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-dark mb-2 uppercase tracking-tight">EDITOR'S PICK</h2>
          <p className="text-sm text-gray-text">Problems trying to resolve the conflict between </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[500px]">
          {/* MEN */}
          <div className="md:flex-[2] relative group overflow-hidden cursor-pointer h-[500px] md:h-full">
            <img 
              src={categories[0].img} 
              alt={categories[0].name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6">
              <button className="bg-white text-dark px-12 py-3 font-bold text-base hover:bg-primary hover:text-white transition-all shadow-md uppercase">
                {categories[0].name}
              </button>
            </div>
          </div>

          {/* WOMEN */}
          <div className="md:flex-[1] relative group overflow-hidden cursor-pointer h-[500px] md:h-full">
            <img 
              src={categories[1].img} 
              alt={categories[1].name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6">
              <button className="bg-white text-dark px-12 py-3 font-bold text-base hover:bg-primary hover:text-white transition-all shadow-md uppercase">
                {categories[1].name}
              </button>
            </div>
          </div>

          {/* ACCESSORIES & KIDS */}
          <div className="md:flex-[1] flex flex-col gap-8">
            <div className="flex-1 relative group overflow-hidden cursor-pointer h-[242px] md:h-auto">
              <img 
                src={categories[2].img} 
                alt={categories[2].name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6">
                <button className="bg-white text-dark px-6 py-3 font-bold text-base hover:bg-primary hover:text-white transition-all shadow-md uppercase">
                  {categories[2].name}
                </button>
              </div>
            </div>
            <div className="flex-1 relative group overflow-hidden cursor-pointer h-[242px] md:h-auto">
              <img 
                src={categories[3].img} 
                alt={categories[3].name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6">
                <button className="bg-white text-dark px-12 py-3 font-bold text-base hover:bg-primary hover:text-white transition-all shadow-md uppercase">
                  {categories[3].name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
