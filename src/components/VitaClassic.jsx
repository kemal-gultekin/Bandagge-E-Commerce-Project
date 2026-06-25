import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper stillerini içe aktarıyoruz
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VitaClassic = () => {
  const slides = [
    {
      id: 1,
      subtitle: 'SUMMER 2020',
      title: 'Vita Classic Product',
      desc: 'We know how large objects will act, but things on a small scale.',
      price: '$16.48',
      img: 'src/Pictures/shop-hero-2-png-picture-1.png'
    },
    {
      id: 2,
      subtitle: 'AUTUMN 2020',
      title: 'Special Edition Jacket',
      desc: 'Reflect your style with this limited edition special collection.',
      price: '$89.90',
      img: 'src/Pictures/shop-hero-2-png-picture-1.png'
    }
  ];

  return (
    <section className="bg-white px-0 md:px-10 py-0 md:py-4">
      <div className="bg-[#23856D] text-white overflow-hidden relative md:rounded-2xl">
        {/* Vita Classic için de bir slider (kaydırıcı) ekledik */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          className="h-auto"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 py-20 text-center md:text-left">
                  <h5 className="text-xl font-normal mb-8 uppercase tracking-wide">{slide.subtitle}</h5>
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{slide.title}</h2>
                  <p className="text-sm font-normal mb-8 max-w-sm mx-auto md:mx-0">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 justify-center md:justify-start">
                    <span className="text-2xl font-bold">{slide.price}</span>
                    <button className="bg-[#2DC071] text-white px-10 py-4 rounded-md text-sm font-bold hover:bg-[#25a05e] transition-all uppercase">
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end pt-10 md:pt-20">
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="w-full max-w-md h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VitaClassic;
