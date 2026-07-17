import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

/**
 * ContactPage Component
 * Contains "Get answers to all your questions" and contact information based on the design.
 */
const ContactPage = () => {
  return (
    <div className="w-full font-sans">
      
      {/* SECTION 1: Get answers to all your questions */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6">
          Get answers to all your questions.
        </h1>
        <p className="text-[#737373] text-lg mb-8 max-w-xl mx-auto">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>
        <button className="bg-[#23A6F0] text-white px-10 py-4 rounded-md font-bold hover:bg-blue-600 transition-all mb-8">
          CONTACT OUR COMPANY
        </button>
        <div className="flex justify-center space-x-8 text-[#737373]">
          <Twitter className="cursor-pointer hover:text-[#23A6F0]" />
          <Facebook className="cursor-pointer hover:text-[#23A6F0]" />
          <Instagram className="cursor-pointer hover:text-[#23A6F0]" />
          <Linkedin className="cursor-pointer hover:text-[#23A6F0]" />
        </div>
      </section>

      {/* SECTION 2: Questions & Answers (Background Image Section) */}
      <section 
        className="relative py-32 px-6 flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-[#252B42] mb-6">Questions & Answers</h2>
          <p className="text-[#737373] text-lg mb-8">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
          <a href="#contact" className="text-[#23A6F0] font-bold text-lg hover:underline">
            CONTACT US
          </a>
        </div>
      </section>

      {/* SECTION 3: Detailed Contact Info (Dark Background) */}
      <section className="bg-[#1E2139] text-white py-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10 mb-16 lg:mb-0">
            <h2 className="text-4xl font-bold mb-6">CONTACT US</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
            <button className="bg-[#23A6F0] text-white px-10 py-4 rounded-md font-bold hover:bg-blue-600 transition-all mb-12">
              CONTACT US
            </button>

            {/* Offices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <h5 className="font-bold text-xl mb-4">Paris</h5>
                <p className="text-gray-300 mb-2">1901 Thorn ridge Cir.</p>
                <p className="text-gray-300 mb-2">75000 Paris</p>
                <p className="text-gray-300 mb-2">Phone : +451 215 215</p>
                <p className="text-gray-300">Fax : +451 215 215</p>
              </div>
              <div>
                <h5 className="font-bold text-xl mb-4">New York</h5>
                <p className="text-gray-300 mb-2">2715 Ash Dr. San Jose,</p>
                <p className="text-gray-300 mb-2">75000 Paris</p>
                <p className="text-gray-300 mb-2">Phone : +451 215 215</p>
                <p className="text-gray-300">Fax : +451 215 215</p>
              </div>
              <div>
                <h5 className="font-bold text-xl mb-4">Berlin</h5>
                <p className="text-gray-300 mb-4">4140 Parker Rd.</p>
                <p className="text-gray-300 mb-2">75000 Paris</p>
                <p className="text-gray-300 mb-2">Phone : +451 215 215</p>
                <p className="text-gray-300">Fax : +451 215 215</p>
              </div>
              <div>
                <h5 className="font-bold text-xl mb-4">London</h5>
                <p className="text-gray-300 mb-4">3517 W. Gray St. Utica,</p>
                <p className="text-gray-300 mb-2">75000 Paris</p>
                <p className="text-gray-300 mb-2">Phone : +451 215 215</p>
                <p className="text-gray-300">Fax : +451 215 215</p>
              </div>
            </div>
          </div>

          {/* Right Part: Image */}
          <div className="w-full lg:w-1/2 relative lg:-mr-40 flex justify-center lg:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" 
              alt="Social Shopping" 
              className="w-full max-w-lg lg:max-w-xl object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Now Let's grow Yours (Blue Background) */}
      <section className="flex flex-col lg:flex-row w-full h-auto min-h-[500px]">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 bg-[#23A6F0] text-white p-12 lg:p-24 flex flex-col justify-center">
          <h5 className="text-sm font-bold uppercase tracking-widest mb-6">WORK WITH US</h5>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Now Let's grow Yours</h2>
          <p className="text-white/80 text-lg mb-10 max-w-md">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
          </p>
          <button className="w-max border border-white text-white px-10 py-4 rounded-md font-bold hover:bg-white hover:text-[#23A6F0] transition-all">
            Button
          </button>
        </div>
        
        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 relative overflow-hidden h-[400px] lg:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=1200&auto=format&fit=crop" 
            alt="Woman with clothes" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

    </div>
  );
};

export default ContactPage;

