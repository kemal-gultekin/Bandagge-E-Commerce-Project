import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  MoveRight, 
  TrendingUp, 
  ShoppingBag,
  Info
} from 'lucide-react';
import { toast } from 'react-toastify';

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  const user = useSelector(state => state.client.user);
  const history = useHistory();

  // Load orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      const token = user?.token || localStorage.getItem('token');
      if (!token) {
        setError('Lütfen önce giriş yapınız.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/order', {
          headers: {
            Authorization: token
          }
        });
        
        // The API returns orders
        // Sort orders by id or date descending so the newest are at the top
        const sortedOrders = Array.isArray(response.data) 
          ? response.data.sort((a, b) => b.id - a.id) 
          : [];
          
        setOrders(sortedOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Sipariş geçmişi yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz.');
        toast.error('Siparişleriniz yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'Belirtilmemiş';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const getOrderStatus = (orderId) => {
    // Deterministic status based on order ID for mock progression
    const statusCodes = ['Hazırlanıyor', 'Kargoya Verildi', 'Sipariş Alındı', 'Teslim Edildi'];
    return statusCodes[orderId % statusCodes.length];
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Hazırlanıyor':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Kargoya Verildi':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Sipariş Alındı':
      default:
        return 'bg-secondary text-primary border-primary/20';
    }
  };

  const formatCardHidden = (num) => {
    if (!num) return 'Kayıtlı Kart';
    const clean = String(num).replace(/\D/g, '');
    if (clean.length < 12) return String(num);
    return `•••• •••• •••• ${clean.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#FAFAFA]" id="loading_spinner_container">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4" id="loading_spinner"></div>
        <p className="text-gray-text font-semibold">Sipariş geçmişiniz yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12" id="orders_page_container">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6" id="orders_breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90" />
          <span className="text-gray-text font-semibold">Siparişlerim</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" id="page_header_section">
          <div>
            <h1 className="text-3xl font-black text-dark tracking-tight mb-2">SİPARİŞ GEÇMİŞİM</h1>
            <p className="text-gray-text text-sm">Önceki alışverişlerinizin detaylarını ve kargo durumunu bu ekrandan takip edebilirsiniz.</p>
          </div>
          <Link 
            to="/shop" 
            className="self-start md:self-auto bg-primary text-white px-6 py-2.5 rounded font-bold hover:opacity-90 transition-all shadow-md text-sm flex items-center gap-2 uppercase"
            id="back_to_shopping_btn"
          >
            Alışverişe Devam Et <MoveRight size={16} />
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3" id="orders_error_card">
            <Info className="flex-shrink-0 text-red-500 mt-0.5" size={18} />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center max-w-lg mx-auto mt-10" id="orders_empty_card">
            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">Henüz Siparişiniz Yok</h3>
            <p className="text-gray-text text-sm mb-8 leading-relaxed">Güvenli alışveriş sitemizden henüz bir siparişte bulunmadınız. Trend ürünleri hemen keşfetmeye başlayın!</p>
            <Link 
              to="/shop" 
              className="bg-primary text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity inline-block w-full text-sm uppercase"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        )}

        {/* Orders Data Table & Accordion Details */}
        {orders.length > 0 && (
          <div className="space-y-6" id="orders_list">
            
            {/* Desktop Table View Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-400 uppercase bg-gray-50 border border-gray-100 rounded-lg shadow-sm">
              <div className="col-span-2">Sipariş No</div>
              <div className="col-span-3">Sipariş Tarihi</div>
              <div className="col-span-2">Kargo Durumu</div>
              <div className="col-span-2">Ödeme</div>
              <div className="col-span-2 text-right">Toplam Tutar</div>
              <div className="col-span-1"></div>
            </div>

            {/* Orders Map */}
            {orders.map((order) => {
              const orderStatus = getOrderStatus(order.id);
              const statusColorClass = getOrderStatusColor(orderStatus);
              const isExpanded = !!expandedOrders[order.id];

              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                  id={`order_card_${order.id}`}
                >
                  
                  {/* Master View: Clickable Stripe */}
                  <div 
                    onClick={() => toggleOrderExpand(order.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                  >
                    {/* Order ID */}
                    <div className="lg:col-span-2 flex items-center justify-between lg:block">
                      <span className="lg:hidden text-xs font-bold text-gray-400 uppercase">Sipariş No:</span>
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-primary" />
                        <span className="font-mono font-bold text-dark text-sm">#SP{order.id}</span>
                      </div>
                    </div>

                    {/* Order Date */}
                    <div className="lg:col-span-3 flex items-center justify-between lg:block">
                      <span className="lg:hidden text-xs font-bold text-gray-400 uppercase">Tarih:</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{formatDate(order.order_date || order.created_at)}</span>
                      </div>
                    </div>

                    {/* Order Status */}
                    <div className="lg:col-span-2 flex items-center justify-between lg:block">
                      <span className="lg:hidden text-xs font-bold text-gray-400 uppercase">Kargo Durumu:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColorClass}`}>
                        {orderStatus}
                      </span>
                    </div>

                    {/* Card Used / Address ID */}
                    <div className="lg:col-span-2 flex items-center justify-between lg:block">
                      <span className="lg:hidden text-xs font-bold text-gray-400 uppercase">Ödeme:</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CreditCard size={14} className="text-gray-400" />
                        <span className="font-mono">{formatCardHidden(order.card_no)}</span>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="lg:col-span-2 flex items-center justify-between lg:block lg:text-right">
                      <span className="lg:hidden text-xs font-bold text-gray-400 uppercase">Toplam Tutar:</span>
                      <span className="font-extrabold text-primary text-base">{(order.price || 0).toFixed(2)} TL</span>
                    </div>

                    {/* Collapse Trigger Button */}
                    <div className="lg:col-span-1 flex justify-end">
                      <button 
                        type="button"
                        className="bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-dark p-2 rounded-full transition-all border border-gray-100"
                        title={isExpanded ? "Detayları Gizle" : "Detayları Göster"}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Order Detail Panel */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/30 p-6 animate-in slide-in-from-top-3 duration-300">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Shipping Info Card */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                          <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-dark text-sm mb-1">Teslimat Adresi</h4>
                            <p className="text-xs text-gray-text leading-relaxed">
                              Siparişiniz <strong className="text-dark font-medium">Adres ID: {order.address_id}</strong> teslimat adresine yönlendirilmiştir.
                            </p>
                          </div>
                        </div>

                        {/* Payment Security Card */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                          <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-dark text-sm mb-1">Güvenli Ödeme Doğrulaması</h4>
                            <p className="text-xs text-gray-text leading-relaxed">
                              Sürüm 3D Secure güvencesiyle <strong className="text-dark font-medium">{order.card_name || 'Kayıtlı Kart'}</strong> kartından başarıyla tahsil edilmiştir.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product Detail List */}
                      <div>
                        <h4 className="font-bold text-dark text-sm mb-3 px-1 flex items-center gap-2">
                          <ShoppingBag size={15} className="text-primary" />
                          <span>Sipariş İçeriği ({order.products?.length || 0} Kalem Ürün)</span>
                        </h4>
                        
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                          {order.products && order.products.map((item, index) => {
                            // API structure for products inside order item:
                            // Usually returns product details directly or nested inside item
                            return (
                              <div key={item.id || index} className="p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                                <div className="flex items-center gap-4">
                                  {/* Mock / fallback image since previous order objects contain IDs */}
                                  <div className="w-14 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                                    {item.images?.[0]?.url ? (
                                      <img 
                                        src={item.images[0].url} 
                                        alt={item.name || item.detail} 
                                        className="w-full h-full object-contain"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <Package size={24} className="text-gray-300" />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-dark text-xs sm:text-sm uppercase max-w-[280px] sm:max-w-[400px] truncate">
                                      {item.name || item.detail || `Ürün ID: ${item.product_id}`}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                                      <span>ID: {item.product_id}</span>
                                      {item.detail && (
                                        <>
                                          <span>•</span>
                                          <span className="text-gray-text font-medium">{item.detail}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-6 self-end sm:self-auto ml-auto">
                                  <div className="text-right">
                                    <div className="text-[10px] text-gray-400 uppercase">Adet</div>
                                    <div className="font-bold text-dark text-sm">{item.count}</div>
                                  </div>
                                  <div className="text-right min-w-[70px]">
                                    <div className="text-[10px] text-gray-400 uppercase">Birim Fiyat</div>
                                    <div className="font-extrabold text-primary text-sm">
                                      {item.price ? `${item.price.toFixed(2)} TL` : 'Yükleniyor...'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {(!order.products || order.products.length === 0) && (
                            <div className="p-6 text-center text-xs text-gray-400">
                              Bu siparişin ürün detayları bulunmamaktadır.
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default PreviousOrdersPage;
