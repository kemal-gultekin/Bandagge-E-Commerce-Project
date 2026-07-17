import React from 'react';
import { Clock, MessageCircle, ChevronRight } from 'lucide-react';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      tag: 'NEW',
      title: 'Loudest à la Madison #1 (L\'integral)',
      desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: '10',
      img: '/unsplash_tVEqStC2uz8.png' // Pembe Vosvos
    },
    {
      id: 2,
      tag: 'NEW',
      title: 'Loudest à la Madison #1 (L\'integral)',
      desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: '10',
      img: '/unsplash_hHdHCfAifHU.png' // Şemsiyeler
    },
    {
      id: 3,
      tag: 'NEW',
      title: 'Loudest à la Madison #1 (L\'integral)',
      desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: '10',
      img: '/unsplash_dEGu-oCuB1Y.png' // Renkli Evler
    }
  ];

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h6 className="text-sm font-bold text-primary mb-2">Practice Advice</h6>
          <h2 className="text-4xl font-bold text-dark mb-2">Featured Posts</h2>
          <p className="text-sm text-gray-text max-w-md mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          {posts.map((post) => (
            <div key={post.id} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-md border border-gray-100 overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#E74C3C] text-white px-3 py-1 rounded-sm text-sm font-bold shadow-lg">
                    {post.tag}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex space-x-4 text-xs text-gray-text mb-3">
                    <span className="text-primary">Google</span>
                    <span>Trending</span>
                    <span>New</span>
                  </div>
                  <h4 className="text-xl font-normal text-dark mb-3 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-text mb-6">
                    {post.desc}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-text mb-6">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-primary" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} className="text-secondary" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-sm font-bold text-gray-text hover:text-primary transition-colors">
                    <span>Learn More</span>
                    <ChevronRight size={16} className="text-primary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
