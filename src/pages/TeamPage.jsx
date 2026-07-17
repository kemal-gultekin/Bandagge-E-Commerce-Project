import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

// Team Page
// All information in this page is manually added.
const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'UI Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'David Wilson',
      role: 'Marketing',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'Sarah Miller',
      role: 'HR Specialist',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 7,
      name: 'James Moore',
      role: 'Data Scientist',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 8,
      name: 'Daniel Taylor',
      role: 'Security Engineer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 9,
      name: 'Sophia Anderson',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=400&auto=format&fit=crop',
    }
  ];

  return (
    <div className="w-full">
      {/* Top Section */}
      <section className="py-20 text-center px-6 md:px-10 max-w-7xl mx-auto">
        <h5 className="text-sm font-bold text-gray-text mb-4 uppercase">WHAT WE DO</h5>
        <h1 className="text-4xl md:text-6xl font-bold text-dark mb-4">Innovation starts with our team</h1>
        <div className="flex items-center justify-center space-x-2 text-sm font-bold">
          <span className="text-dark">Home</span>
          <span className="text-gray-text font-normal italic">|</span>
          <span className="text-gray-text">Team</span>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="flex flex-wrap max-w-7xl mx-auto px-2 md:px-4">
        <div className="w-full md:w-1/2 p-1">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
            alt="Team Meeting" 
            className="w-full h-[530px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap">
          {[
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522071823912-70b196886e92?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop'
          ].map((img, idx) => (
            <div key={idx} className="w-1/2 p-1">
              <img 
                src={img} 
                alt={`Office ${idx}`} 
                className="w-full h-[260px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-dark text-center mb-20 uppercase tracking-tight">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center group">
              <div className="w-full mb-6 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h5 className="text-lg font-bold text-dark mb-2">{member.name}</h5>
              <p className="text-sm font-bold text-gray-text mb-4 uppercase">{member.role}</p>
              <div className="flex space-x-4 text-primary">
                <Facebook size={20} className="cursor-pointer hover:text-dark transition-colors" />
                <Instagram size={20} className="cursor-pointer hover:text-dark transition-colors" />
                <Twitter size={20} className="cursor-pointer hover:text-dark transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-20 text-center px-6 md:px-10">
        <h2 className="text-4xl font-bold text-dark mb-8 uppercase tracking-tight">Start your 14 days free trial</h2>
        <p className="text-sm text-gray-text mb-8 max-w-md mx-auto">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
        </p>
        <button className="bg-primary text-white px-10 py-4 rounded-md font-bold hover:bg-[#21735e] transition-all mb-10 uppercase">
          Try it free now
        </button>
        <div className="flex justify-center space-x-6">
          <Twitter className="text-[#55ACEE] cursor-pointer" />
          <Facebook className="text-[#395185] cursor-pointer" />
          <Instagram className="text-dark cursor-pointer" />
          <Linkedin className="text-[#0A66C2] cursor-pointer" />
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
