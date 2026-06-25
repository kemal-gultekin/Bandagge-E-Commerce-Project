import React from 'react';
import { Facebook, Instagram, Twitter, PlayCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10 text-center md:text-left">
          <h5 className="text-sm font-bold text-dark mb-8 uppercase tracking-wider hidden md:block">ABOUT COMPANY</h5>
          <h1 className="text-4xl md:text-6xl font-bold text-dark mb-8 uppercase tracking-tight">ABOUT US</h1>
          <p className="text-xl text-gray-text mb-8 max-w-sm mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="bg-primary text-white px-10 py-4 rounded-md font-bold hover:bg-[#21735e] transition-all uppercase">
            Get Quote Now
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FFE9EA] rounded-full -z-10 animate-pulse"></div>
          <div className="absolute top-1/2 -right-10 w-10 h-10 bg-[#977DF4] rounded-full -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=800&auto=format&fit=crop" 
            alt="Business Woman" 
            className="w-full max-w-md object-cover rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/3">
          <p className="text-sm text-red-500 mb-4">Problems trying</p>
          <h2 className="text-2xl font-bold text-dark mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        <div className="w-full md:w-2/3">
          <p className="text-sm text-gray-text leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div>
            <h2 className="text-5xl font-bold text-dark mb-2">15K</h2>
            <h5 className="text-sm font-bold text-gray-text uppercase">Happy Customers</h5>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-dark mb-2">150K</h2>
            <h5 className="text-sm font-bold text-gray-text uppercase">Monthly Visitors</h5>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-dark mb-2">15</h2>
            <h5 className="text-sm font-bold text-gray-text uppercase">Countries Worldwide</h5>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-dark mb-2">100+</h2>
            <h5 className="text-sm font-bold text-gray-text uppercase">Top Partners</h5>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" 
            alt="Working together" 
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
              <PlayCircle size={48} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Small) */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-dark mb-4 uppercase tracking-tight">Meet Our Team</h2>
          <p className="text-sm text-gray-text max-w-md mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics 
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: 'John Doe', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
            { name: 'Jane Smith', role: 'Frontend Developer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
            { name: 'Michael Brown', role: 'UI Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
          ].map((member, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img 
                src={`${member.img}?q=80&w=400&auto=format&fit=crop`} 
                alt={member.name} 
                className="w-full h-80 object-cover rounded-md mb-6"
                referrerPolicy="no-referrer"
              />
              <h5 className="text-lg font-bold text-dark mb-2">{member.name}</h5>
              <p className="text-sm font-bold text-gray-text mb-4 uppercase">{member.role}</p>
              <div className="flex space-x-4 text-primary">
                <Facebook size={20} className="cursor-pointer" />
                <Instagram size={20} className="cursor-pointer" />
                <Twitter size={20} className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big Companies Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-dark mb-8 uppercase tracking-tight">Big Companies Are Here</h2>
          <p className="text-sm text-gray-text mb-16 max-w-lg mx-auto leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics 
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60">
            <img src="/Pictures/logos/Vector.png" alt="Hooli" className="text-5xl font-serif text-gray-400" />
            <img src="/Pictures/logos/Vector-1.png" alt="Lyft" className="text-5xl font-serif text-gray-400" />
            <img src="/Pictures/logos/Vector-2.png" alt="Pied Piper" className="text-5xl font-serif text-gray-400" />
            <img src="/Pictures/logos/Vector-3.png" alt="Stripe" className="text-5xl font-serif text-gray-400" />
            <img src="/Pictures/logos/Vector-4.png" alt="AWS" className="text-5xl font-serif text-gray-400" />
            <img src="/Pictures/logos/Vector-5.png" alt="Reddit" className="text-5xl font-serif text-gray-400" />
          </div>
        </div>
      </section>

      {/* Bottom Hero Section */}
      <section className="flex flex-col md:flex-row bg-[#2A7CC7] text-white">
        <div className="w-full md:w-2/3 py-24 px-6 md:px-24 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h5 className="text-sm font-bold mb-6 uppercase tracking-wider">WORK WITH US</h5>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">Now Let’s Grow Yours</h2>
          <p className="text-sm mb-8 max-w-md leading-relaxed">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th century
          </p>
          <button className="border border-white px-10 py-4 rounded-md font-bold hover:bg-white hover:text-[#2A7CC7] transition-all uppercase">
            Button
          </button>
        </div>
        <div className="hidden md:block w-1/3">
          <img 
            src="/Pictures/ShopOptions/unsplash_vjMgqUkS8q8.png" 
            alt="Office vibe" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
