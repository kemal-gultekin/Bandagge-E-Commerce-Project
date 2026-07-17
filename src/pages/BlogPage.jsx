import React from 'react';
import { ChevronRight, Calendar, User, MessageCircle } from 'lucide-react';

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Loudest à la Madison #1 (L'integral)",
      description: "Ames edit with focus on the details of everything we've done in the past week.",
      date: "22 April 2021",
      comments: "10 comments",
      img: "https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=600"
    },
    {
      id: 2,
      title: "The Best Way to Style Your Home",
      description: "Discover new trends and classical approaches to home decoration for this season.",
      date: "24 April 2021",
      comments: "15 comments",
      img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=600"
    },
    {
      id: 3,
      title: "Top Coffee Shops in New York",
      description: "Exploring the hidden gems of NYC for all the caffeine lovers out there.",
      date: "25 April 2021",
      comments: "8 comments",
      img: "https://images.unsplash.com/photo-1544145945-bef053587052?q=80&w=600"
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="bg-light-gray py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm font-bold">
          <span className="text-dark">Home</span>
          <ChevronRight size={14} className="text-gray-text" />
          <span className="text-gray-text">Blog</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-16">
          <h6 className="text-primary font-bold mb-2">Practice Advice</h6>
          <h2 className="text-4xl font-bold text-dark mb-4">Featured Posts</h2>
          <p className="text-gray-text max-w-lg mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-lg border border-gray-100 rounded-lg overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">NEW</span>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-xs text-gray-text mb-4">
                  <span className="text-primary">Google</span>
                  <span>Trending</span>
                  <span>New</span>
                </div>
                <h4 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors cursor-pointer">{blog.title}</h4>
                <p className="text-gray-text text-sm mb-6 leading-relaxed">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6 font-bold text-xs">
                  <div className="flex items-center space-x-1 text-gray-text">
                    <Calendar size={14} className="text-primary" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-text">
                    <MessageCircle size={14} className="text-secondary" />
                    <span>{blog.comments}</span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 text-gray-text font-bold hover:text-primary transition-colors italic">
                  <span>Learn More</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
