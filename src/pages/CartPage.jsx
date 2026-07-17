import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronRight, Info, Truck } from 'lucide-react';
import { updateCartItem, removeFromCart, toggleCartItemCheck } from '../redux/actions/shoppingCartActions';

const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.shoppingCart.cart);
    
    const checkedItems = cart.filter(item => item.checked);
    const cartCount = cart.reduce((total, item) => total + item.count, 0);
    
    const totalPrice = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
    const shippingFee = totalPrice > 150 ? 0 : 29.99;
    const finalTotal = totalPrice + shippingFee;

    const handleCountChange = (productId, currentCount, delta) => {
        const newCount = currentCount + delta;
        if (newCount > 0) {
            dispatch(updateCartItem(productId, newCount));
        }
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleCartItemCheck(productId));
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <h1 className="text-2xl font-bold text-dark mb-8">Sepetim ({cartCount} Ürün)</h1>

                {/* Info Banner */}
                <div className="bg-[#F3F9FF] border border-[#D0E7FF] rounded-lg p-4 mb-8 flex items-center gap-3">
                    <div className="bg-primary/10 p-1 rounded-full">
                        <Info size={18} className="text-primary" />
                    </div>
                    <p className="text-sm text-dark font-medium">
                        Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-6">
                        {cart.length === 0 ? (
                            <div className="bg-white rounded-lg p-20 text-center shadow-sm border border-gray-100 italic text-gray-text">
                                Sepetiniz boş. <Link to="/shop" className="text-primary font-bold hover:underline">Hemen alışverişe başlayın!</Link>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.product.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                    {/* Seller Info Placeholder */}
                                    <div className="px-6 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="checkbox" 
                                                checked={item.checked}
                                                onChange={() => handleToggleCheck(item.product.id)}
                                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                            />
                                            <span className="text-sm font-bold text-dark">Satıcı: <span className="text-primary hover:underline cursor-pointer">Global Store</span></span>
                                        </div>
                                        <div className="hidden md:flex gap-4">
                                            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">3 Adet ve Üzeri 40 TL İndirim</span>
                                            <button className="text-xs font-bold text-gray-text flex items-center hover:text-primary transition-colors">
                                                Tüm Ürünler <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Shipping Indicator */}
                                    <div className="px-6 py-2 bg-[#F1FFF1] border-b border-[#E1FFE1] flex items-center gap-2 justify-center">
                                        <Truck size={14} className="text-[#27AD27]" />
                                        <span className="text-xs font-bold text-[#27AD27]">Kargo Bedava!</span>
                                    </div>

                                    {/* Product Detail Area */}
                                    <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <input 
                                                type="checkbox" 
                                                checked={item.checked}
                                                onChange={() => handleToggleCheck(item.product.id)}
                                                className="w-5 h-5 md:hidden rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                            />
                                            <div className="w-24 h-32 md:w-32 md:h-40 bg-white border border-gray-100 rounded-lg p-2 flex-shrink-0">
                                                <img 
                                                    src={item.product.images?.[0]?.url || 'https://via.placeholder.com/200x250'} 
                                                    alt={item.product.name} 
                                                    className="w-full h-full object-contain"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-medium text-dark mb-1 line-clamp-2">
                                                <span className="font-bold underline uppercase mr-1">{item.product.name.split(' ')[0]}</span>
                                                {item.product.name.split(' ').slice(1).join(' ')}
                                            </h3>
                                            <p className="text-xs text-gray-text mb-4 line-clamp-1">{item.product.description}</p>
                                            
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold bg-gray-50 inline-flex p-1 rounded">
                                                <Info size={10} />
                                                <span>39 dakika içinde sipariş verirsen en geç yarın kargoda!</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 mt-4 md:mt-0">
                                            {/* Quantity controls */}
                                            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                                                <button 
                                                    onClick={() => handleCountChange(item.product.id, item.count, -1)}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-text transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-4 py-2 text-sm font-bold border-x border-gray-200 min-w-[40px] text-center">
                                                    {item.count}
                                                </span>
                                                <button 
                                                    onClick={() => handleCountChange(item.product.id, item.count, 1)}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-text transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-lg font-bold text-primary whitespace-nowrap min-w-[120px] text-right">
                                                {(item.product.price * item.count).toFixed(2)} TL
                                            </div>

                                            {/* Remove */}
                                            <button 
                                                onClick={() => handleRemove(item.product.id)}
                                                className="text-gray-400 hover:text-alert transition-colors p-2"
                                                title="Ürünü sil"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary Sidebar - Preliminary view */}
                    <div className="w-full lg:w-96 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-dark mb-6">Sipariş Özeti</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm text-gray-text">
                                    <span>Ürünün Toplamı</span>
                                    <span className="font-bold text-dark">{totalPrice.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-text">
                                    <span>Kargo Toplam</span>
                                    <span className="font-bold text-dark">{shippingFee.toFixed(2)} TL</span>
                                </div>
                                {shippingFee === 0 && (
                                    <div className="text-[10px] text-[#27AD27] font-bold text-right -mt-2">
                                        150 TL Üzeri Kargo Bedava
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
                                <span className="text-base font-bold text-dark">Toplam</span>
                                <span className="text-2xl font-bold text-primary">{finalTotal.toFixed(2)} TL</span>
                            </div>

                            <button 
                                onClick={() => history.push('/checkout')}
                                disabled={checkedItems.length === 0}
                                className={`w-full py-4 text-center text-sm font-bold bg-primary text-white rounded hover:opacity-90 transition-all shadow-md ${checkedItems.length === 0 ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
                            >
                                SEPETİ ONAYLA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
