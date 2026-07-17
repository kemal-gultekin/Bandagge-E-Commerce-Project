import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, Star, Heart, ShoppingCart, Eye, ChevronLeft, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchProduct } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/shoppingCartActions';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
    const { productId, id } = useParams();
    const activeProductId = productId || id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [activeImg, setActiveImg] = useState(0);
    
    const { product, fetchState, categories, productList } = useSelector(state => state.product);
    const bestsellerProducts = productList.slice(0, 8);
    const isLoading = fetchState === 'FETCHING';
    const isFailed = fetchState === 'FAILED';

    useEffect(() => {
        if (activeProductId) {
            dispatch(fetchProduct(activeProductId));
            window.scrollTo(0, 0);
        }
    }, [dispatch, activeProductId]);

    // Reset active image when product changes
    useEffect(() => {
        setActiveImg(0);
    }, [product]);

    const handleBack = () => {
        history.goBack();
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <h2 className="text-xl font-bold text-dark italic animate-pulse">Loading Product Details...</h2>
            </div>
        );
    }

    if (isFailed || !product.name) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
                <h2 className="text-3xl font-bold text-dark mb-4">Oops! Product Not Found</h2>
                <p className="text-gray-text mb-8">The product you are looking for might have been moved or deleted.</p>
                <button 
                    onClick={handleBack}
                    className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-[#21735e] transition-all flex items-center space-x-2"
                >
                    <ArrowLeft size={20} />
                    <span>Go Back</span>
                </button>
            </div>
        );
    }

    const images = product.images?.length > 0 
        ? product.images.map(img => img.url) 
        : ["https://via.placeholder.com/600x800?text=No+Image+Available"];

    const category = categories.find(c => c.id === product.category_id);

    const Breadcrumb = () => (
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <button 
                onClick={handleBack}
                className="flex items-center space-x-2 text-sm font-bold text-primary hover:text-dark transition-colors mb-4 md:mb-0"
            >
                <ArrowLeft size={16} />
                <span>Go Back</span>
            </button>
            <div className="flex items-center space-x-2 text-sm font-bold">
                <Link to="/" className="text-dark hover:text-primary">Home</Link>
                <ChevronRight size={16} className="text-gray-400" />
                <Link to="/shop" className="text-gray-400 hover:text-primary">Shop</Link>
                {category && (
                    <>
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-400">{category.title}</span>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <Breadcrumb />

                {/* Product Detail Section */}
                <div className="flex flex-col md:flex-row gap-10 mb-12">
                    {/* Image Gallery */}
                    <div className="w-full md:w-1/2">
                        <div className="relative mb-4 group h-[450px] md:h-[600px] overflow-hidden rounded-md bg-white border border-gray-100 p-4">
                            <img
                                src={images[activeImg]}
                                alt={product.name}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                            />
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={() => setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark/20 hover:bg-dark/40 p-2 rounded-full text-white backdrop-blur-sm"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button 
                                        onClick={() => setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark/20 hover:bg-dark/40 p-2 rounded-full text-white backdrop-blur-sm"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                {images.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => setActiveImg(idx)}
                                        className={`w-24 h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all bg-white p-2 ${activeImg === idx ? 'border-primary' : 'border-transparent opacity-60'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="w-full md:w-1/2 py-2">
                        <h4 className="text-2xl font-bold text-dark mb-4">{product.name}</h4>
                        <div className="flex items-center space-x-2 mb-6 text-yellow-400">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={18} 
                                        fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                                        className={i < Math.floor(product.rating || 0) ? "" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-gray-text ml-2">({product.rating || 0} / 5)</span>
                            <span className="text-sm font-bold text-gray-400 ml-4">{product.sell_count || 0} Sold</span>
                        </div>
                        <h3 className="text-3xl font-bold text-dark mb-4">${product.price?.toFixed(2)}</h3>
                        <p className="text-sm font-bold mb-6">
                            Availability : <span className={product.stock > 0 ? "text-primary" : "text-alert"}>
                                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                            </span>
                        </p>
                        
                        <p className="text-base text-gray-text border-b border-gray-200 pb-8 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center space-x-2 mb-10">
                            <div className="w-8 h-8 rounded-full bg-primary cursor-pointer hover:ring-2 ring-offset-2 ring-primary"></div>
                            <div className="w-8 h-8 rounded-full bg-success cursor-pointer hover:ring-2 ring-offset-2 ring-success"></div>
                            <div className="w-8 h-8 rounded-full bg-alert cursor-pointer hover:ring-2 ring-offset-2 ring-alert"></div>
                            <div className="w-8 h-8 rounded-full bg-dark cursor-pointer hover:ring-2 ring-offset-2 ring-dark"></div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                disabled={product.stock === 0}
                                onClick={handleAddToCart}
                                className={`bg-primary text-white px-8 py-4 rounded-md font-bold hover:opacity-90 transition-all uppercase text-sm flex items-center space-x-2 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-100 transition-all text-dark">
                                <Heart size={20} />
                            </button>
                            <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-100 transition-all text-dark">
                                <Eye size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white py-10 px-6 md:px-10 rounded-md shadow-sm mb-20">
                    <div className="flex justify-center border-b border-gray-200 mb-10 overflow-x-auto">
                        <button className="px-6 py-4 text-sm font-bold text-gray-text hover:text-dark transition-all border-b-2 border-transparent">Description</button>
                        <button className="px-6 py-4 text-sm font-bold text-dark border-b-2 border-primary">Additional Information</button>
                        <button className="px-6 py-4 text-sm font-bold text-gray-text hover:text-dark transition-all border-b-2 border-transparent">Reviews (0)</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="overflow-hidden rounded-md h-[400px]">
                            <img 
                                src={images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-dark mb-6">{product.name}</h4>
                            <p className="text-sm text-gray-text leading-relaxed mb-6">
                                {product.description}
                            </p>
                            <p className="text-sm text-gray-text leading-relaxed mb-6 border-l-4 border-primary pl-4">
                                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official-consequent door ENIM RELIT Mollie.
                            </p>
                            <p className="text-sm text-gray-text leading-relaxed">
                                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official-consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-dark mb-6">the quick fox jumps over</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-dark mt-10 mb-6">the quick fox jumps over</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm font-bold text-gray-text">
                                    <ChevronRight size={16} className="text-gray-400" />
                                    <span>the quick fox jumps over the lazy dog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BESTSELLER PRODUCTS */}
                <div className="py-10">
                    <h3 className="text-2xl font-bold text-dark mb-10 uppercase tracking-tight border-b border-gray-200 pb-4">BESTSELLER PRODUCTS</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestsellerProducts.length > 0 ? (
                            bestsellerProducts.map((p) => (
                                <div key={p.id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                                    <ProductCard product={p} />
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-text italic">Loading more products...</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Clients Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-10 opacity-50">
                    <span className="text-4xl font-serif text-gray-400">Hooli</span>
                    <span className="text-4xl font-serif text-gray-400">Lyft</span>
                    <span className="text-4xl font-serif text-gray-400">Pied Piper</span>
                    <span className="text-4xl font-serif text-gray-400">Stripe</span>
                    <span className="text-4xl font-serif text-gray-400">AWS</span>
                    <span className="text-4xl font-serif text-gray-400">Reddit</span>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
