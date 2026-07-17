import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Swiper stillerini içe aktarıyoruz
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: 'NEW COLLECTION',
      subtitle: 'SUMMER 2020',
      desc: 'We know how large objects will act, but things on a small scale.',
      img: '/shop-hero-1-product-slide-1.jpg',
      btnText: 'SHOP NOW',
    },
    {
      id: 2,
      title: 'VIBRANT STYLE',
      subtitle: 'AUTUMN 2020',
      desc: 'Discover the trends of the new season and make your difference.',
      img: '/shop-hero-1-product-slide-1.jpg',
      btnText: 'EXPLORE',
    }
  ];

  return (
    <section className="w-full px-0 md:px-10 py-0 md:py-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        className="h-[600px] md:h-[716px] md:rounded-2xl overflow-hidden shadow-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Arka Plan Görseli */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[2000ms] hover:scale-105"
                style={{ 
                  backgroundImage: `url("${slide.img}")`,
                  backgroundPosition: 'top center'
                }}
              />
              {/* Karartma Overlay (Yazıların okunması için) */}
              <div className="absolute inset-0 bg-black/20 z-1" />
              
              {/* İçerik */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full text-white">
                <div className="max-w-lg">
                  <h5 className="text-base font-bold mb-8 tracking-wide animate-fade-in">{slide.subtitle}</h5>
                  <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{slide.title}</h1>
                  <h4 className="text-xl font-normal mb-8 max-w-sm">{slide.desc}</h4>
                  <Link 
                    to="/shop" 
                    className="inline-block bg-[#2DC071] text-white px-10 py-4 rounded-md text-2xl font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
