import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/clientActions';
import Gravatar from 'react-gravatar';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.client.user);
  const categories = useSelector(state => state.product.categories);
  const cart = useSelector(state => state.shoppingCart.cart);
  
  const isLoggedIn = user && user.name;

  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  const womenCategories = categories.filter(c => c.gender === 'k');
  const menCategories = categories.filter(c => c.gender === 'e');

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
  };

  // Check if we are on the Home page
  const isHomePage = location.pathname === '/';
  // Check if we are on the Shop page
  const isShopPage = location.pathname === '/shop';

  // Top bar color: Green (#23856D) on Shop page, Dark (#252B42) on other pages
  const topBarBg = isShopPage ? 'bg-[#23856D]' : 'bg-[#252B42]';

  return (
    <header className="w-full">
      {/* Top Bar - Hidden on Mobile */}
      <div className={`hidden lg:flex ${topBarBg} text-white py-3 px-6 justify-between items-center transition-colors duration-300`}>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm font-bold">
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-bold">
            <Mail size={16} />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>
        
        <div className="text-sm font-bold">
          Follow Us and get a chance to win 80% off!
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-bold">Follow Us :</span>
          <div className="flex items-center space-x-3">
            <Instagram size={16} className="cursor-pointer" />
            <Youtube size={16} className="cursor-pointer" />
            <Facebook size={16} className="cursor-pointer" />
            <Twitter size={16} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white py-4 px-6 md:px-10 flex justify-between items-center relative shadow-sm">
        <Link to="/" className="text-2xl font-bold text-dark tracking-tight">
          Bandage
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-bold text-gray-text">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li className="relative group flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors py-4">
            <Link to="/shop">Shop</Link>
            <ChevronDown size={14} />
            
            {/* Desktop Dropdown */}
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 min-w-[400px] p-6">
              <div className="grid grid-cols-2 gap-10">
                {/* Kadın Column */}
                <div>
                  <Link 
                    to="/shop/kadin" 
                    className="text-dark font-bold text-base mb-4 block hover:text-primary"
                  >
                    Kadın
                  </Link>
                  <ul className="space-y-3">
                    {womenCategories.map(cat => (
                      <li key={cat.id}>
                        <Link 
                          to={`/shop/kadin/${cat.title.toLowerCase()}/${cat.id}`}
                          className="text-gray-text font-normal hover:text-primary transition-colors"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Erkek Column */}
                <div>
                  <Link 
                    to="/shop/erkek" 
                    className="text-dark font-bold text-base mb-4 block hover:text-primary"
                  >
                    Erkek
                  </Link>
                  <ul className="space-y-3">
                    {menCategories.map(cat => (
                      <li key={cat.id}>
                        <Link 
                          to={`/shop/erkek/${cat.title.toLowerCase()}/${cat.id}`}
                          className="text-gray-text font-normal hover:text-primary transition-colors"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
          <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6 text-primary font-bold text-sm">
          {isLoggedIn ? (
            <div 
              className="relative hidden md:block"
              onMouseEnter={() => setIsUserOpen(true)}
              onMouseLeave={() => setIsUserOpen(false)}
            >
              <div className="flex items-center space-x-2 cursor-pointer py-2 px-1 hover:text-primary transition-colors">
                <Gravatar email={user.email} size={28} className="rounded-full shadow-sm border border-gray-100" />
                <span className="text-dark hover:text-primary transition-colors font-bold truncate max-w-[120px]">{user.name}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>

              {/* User Dropdown Menu */}
              {isUserOpen && (
                <div className="absolute right-0 top-full pt-2 z-50 min-w-[200px] animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white shadow-2xl rounded-lg border border-gray-100 overflow-hidden py-1">
                    <div className="px-4 py-2 border-b border-gray-50 text-xs text-gray-400 truncate font-normal">
                      Giriş yapıldı: <strong className="text-dark font-medium block">{user.email}</strong>
                    </div>
                    
                    <Link 
                      to="/previous-orders"
                      onClick={() => setIsUserOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-dark hover:bg-gray-50 hover:text-primary transition-colors font-semibold"
                    >
                      <Package size={16} />
                      <span>Siparişlerim</span>
                    </Link>

                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsUserOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left font-semibold"
                    >
                      <LogOut size={16} />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center space-x-2 cursor-pointer hover:text-dark transition-colors">
              <User size={18} />
              <span>Login / Register</span>
            </Link>
          )}
          
          <div className="flex items-center space-x-6">
            <Search size={20} className="cursor-pointer" />
            
            {/* Cart Dropdown Container */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <ShoppingCart size={20} />
                <span className="text-xs font-bold">{cartItemCount}</span>
              </div>
              
              {/* Dropdown Menu */}
              {isCartOpen && (
                <div className="absolute top-full right-0 pt-3 z-50 min-w-[320px] max-w-[360px] animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white shadow-2xl rounded-lg border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h5 className="font-bold text-dark">Sepetim ({cartItemCount} Ürün)</h5>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {cart.length === 0 ? (
                        <div className="p-10 text-center text-gray-text flex flex-col items-center">
                          <ShoppingCart size={40} className="mb-4 opacity-20" />
                          <p>Sepetiniz şu an boş.</p>
                        </div>
                      ) : (
                        <div className="p-4 space-y-4">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 group">
                              <div className="w-20 h-24 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100x120'} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-contain p-1"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h6 className="font-bold text-dark text-sm truncate uppercase mb-1">
                                  {item.product.name}
                                </h6>
                                <p className="text-xs text-gray-400 mb-1">Adet: {item.count}</p>
                                <p className="text-primary font-bold text-sm">
                                  {item.product.price.toFixed(2)} TL
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {cart.length > 0 && (
                      <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                        <Link 
                          to="/cart" 
                          className="flex-1 py-3 text-center text-sm font-bold border border-gray-200 bg-white rounded hover:bg-gray-100 transition-colors"
                        >
                          Sepete Git
                        </Link>
                        <Link 
                          to="/checkout" 
                          className="flex-1 py-3 text-center text-sm font-bold bg-primary text-white rounded hover:opacity-90 transition-opacity"
                        >
                          Siparişi Tamamla
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-1 cursor-pointer">
              <Heart size={20} />
              <span className="text-xs font-bold">1</span>
            </div>
            
            <button 
              className="md:hidden text-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-50 py-16 flex flex-col items-center space-y-10 md:hidden shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col items-center space-y-8 text-2xl text-gray-text font-normal">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/pages" onClick={() => setIsMenuOpen(false)}>Pages</Link>
            </div>
            
            <div className="flex flex-col items-center space-y-10 w-full pt-4">
              {isLoggedIn ? (
                <div className="flex flex-col items-center space-y-6 flex-shrink-0">
                  <div className="flex flex-col items-center space-y-2">
                    <Gravatar email={user.email} size={64} className="rounded-full shadow-lg" />
                    <span className="text-dark text-3xl font-bold">{user.name}</span>
                  </div>
                  
                  <Link 
                    to="/previous-orders" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center space-x-2 text-primary text-xl font-bold"
                  >
                    <Package size={22} className="text-primary" />
                    <span>Siparişlerim</span>
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500 text-2xl"
                  >
                    <LogOut size={28} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-primary text-3xl font-normal tracking-tight">
                  <User size={30} strokeWidth={1.5} />
                  <span>Login / Register</span>
                </Link>
              )}
              
              <div className="flex flex-col items-center space-y-10 text-primary">
                <Search size={32} strokeWidth={1.5} className="cursor-pointer" />
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 cursor-pointer">
                  <ShoppingCart size={32} strokeWidth={1.5} />
                  <span className="text-sm font-bold">{cartItemCount}</span>
                </Link>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Heart size={32} strokeWidth={1.5} />
                  <span className="text-sm font-bold">1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
