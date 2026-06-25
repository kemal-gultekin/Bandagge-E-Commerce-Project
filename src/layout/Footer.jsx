import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center pb-10 border-b border-[#F3F3F3] mb-12">
          <h3 className="text-2xl font-bold text-dark mb-6 md:mb-0">Bandage</h3>
          <div className="flex items-center space-x-5 text-[#23A6F0]">
            <Facebook size={24} className="cursor-pointer" />
            <Instagram size={24} className="cursor-pointer" />
            <Twitter size={24} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 mb-16">
          <div className="flex-1 min-w-[150px]">
            <h4 className="text-base font-bold text-dark mb-6">Company Info</h4>
            <ul className="space-y-3 text-sm font-bold text-gray-text">
              <li className="cursor-pointer hover:text-primary">About Us</li>
              <li className="cursor-pointer hover:text-primary">Carrier</li>
              <li className="cursor-pointer hover:text-primary">We are hiring</li>
              <li className="cursor-pointer hover:text-primary">Blog</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h4 className="text-base font-bold text-dark mb-6">Legal</h4>
            <ul className="space-y-3 text-sm font-bold text-gray-text">
              <li className="cursor-pointer hover:text-primary">About Us</li>
              <li className="cursor-pointer hover:text-primary">Carrier</li>
              <li className="cursor-pointer hover:text-primary">We are hiring</li>
              <li className="cursor-pointer hover:text-primary">Blog</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h4 className="text-base font-bold text-dark mb-6">Features</h4>
            <ul className="space-y-3 text-sm font-bold text-gray-text">
              <li className="cursor-pointer hover:text-primary">Business Marketing</li>
              <li className="cursor-pointer hover:text-primary">User Analytic</li>
              <li className="cursor-pointer hover:text-primary">Live Chat</li>
              <li className="cursor-pointer hover:text-primary">Unlimited Support</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h4 className="text-base font-bold text-dark mb-6">Resources</h4>
            <ul className="space-y-3 text-sm font-bold text-gray-text">
              <li className="cursor-pointer hover:text-primary">IOS & Android</li>
              <li className="cursor-pointer hover:text-primary">Watch a Demo</li>
              <li className="cursor-pointer hover:text-primary">Customers</li>
              <li className="cursor-pointer hover:text-primary">API</li>
            </ul>
          </div>

          <div className="flex-[1.5] min-w-[250px]">
            <h4 className="text-base font-bold text-dark mb-6">Get In Touch</h4>
            <div className="flex mb-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-[#F9F9F9] border border-[#E6E6E6] rounded-l-md px-4 py-3 text-sm w-full focus:outline-none"
              />
              <button className="bg-primary text-white rounded-r-md px-4 py-3 text-sm font-normal hover:bg-[#1b8ecf] transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-text">Lore impum dolor Amit</p>
          </div>
        </div>

        <div className="bg-light-gray py-6 -mx-6 md:-mx-10 px-6 md:px-10">
          <p className="text-sm font-bold text-gray-text text-center md:text-left">
            Made With Love By Finland All Right Reserved 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
