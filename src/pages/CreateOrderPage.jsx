import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus, Check, Edit2, Trash2, MapPin, Phone, User, CreditCard, ShieldCheck, Lock, CreditCard as CardIcon } from 'lucide-react';
import { fetchAddressList, postAddress, updateAddress, deleteAddress, setAddress as setSelectedAddress, fetchCardList, postCard, updateCard, deleteCard, setCart } from '../redux/actions/shoppingCartActions';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateOrderPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cardList = [], addressList = [], address: selectedAddress, cart } = useSelector(state => state.shoppingCart);
    const user = useSelector(state => state.client.user);
    const [activeStep, setActiveStep] = useState('address'); // 'address' or 'payment'
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    
    // Card states
    const [selectedCard, setSelectedCard] = useState(null);
    const [showCardForm, setShowCardForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [selectedInstallment, setSelectedInstallment] = useState({ count: 1, rate: 0 }); // 1 for single payment
    const [dummyCvv, setDummyCvv] = useState('');
    const [dummyCvvError, setDummyCvvError] = useState('');
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { 
        register: registerCard, 
        handleSubmit: handleSubmitCard, 
        reset: resetCard, 
        setValue: setValueCard, 
        watch: watchCard,
        formState: { errors: errorsCard } 
    } = useForm();

    // Watch values for real-time visual credit card card simulation
    const cardNoValue = watchCard("card_no") || "";
    const nameOnCardValue = watchCard("name_on_card") || "";
    const expireMonthValue = watchCard("expire_month") || "";
    const expireYearValue = watchCard("expire_year") || "";

    useEffect(() => {
        dispatch(fetchAddressList());
        dispatch(fetchCardList());
    }, [dispatch]);

    useEffect(() => {
        if (editingAddress) {
            setValue('title', editingAddress.title);
            setValue('name', editingAddress.name);
            setValue('surname', editingAddress.surname);
            setValue('phone', editingAddress.phone);
            setValue('city', editingAddress.city);
            setValue('district', editingAddress.district);
            setValue('neighborhood', editingAddress.neighborhood);
        }
    }, [editingAddress, setValue]);

    useEffect(() => {
        if (editingCard) {
            setValueCard('card_no', editingCard.card_no);
            setValueCard('name_on_card', editingCard.name_on_card);
            setValueCard('expire_month', editingCard.expire_month);
            setValueCard('expire_year', editingCard.expire_year);
        }
    }, [editingCard, setValueCard]);

    useEffect(() => {
        // Automatically select the first card if cardList changes and none is selected
        if (cardList.length > 0 && !selectedCard) {
            setSelectedCard(cardList[0]);
        }
    }, [cardList, selectedCard]);

    const onSubmitAddress = (data) => {
        if (editingAddress) {
            dispatch(updateAddress({ ...data, id: editingAddress.id }))
                .then(() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                    reset();
                });
        } else {
            dispatch(postAddress(data))
                .then(() => {
                    setShowAddressForm(false);
                    reset();
                });
        }
    };

    const handleEdit = (addr) => {
        setEditingAddress(addr);
        setShowAddressForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            dispatch(deleteAddress(id));
        }
    };

    const handleSelectAddress = (addr) => {
        dispatch(setSelectedAddress(addr));
    };

    // Card handlers
    const onSubmitCard = (data) => {
        // Strip non-numbers from card_no
        const cleanCardNo = data.card_no.replace(/\D/g, '');
        const payload = {
            card_no: cleanCardNo,
            expire_month: parseInt(data.expire_month, 10),
            expire_year: parseInt(data.expire_year, 10),
            name_on_card: data.name_on_card
        };

        if (editingCard) {
            dispatch(updateCard({ ...payload, id: editingCard.id }))
                .then(() => {
                    setShowCardForm(false);
                    setEditingCard(null);
                    resetCard();
                });
        } else {
            dispatch(postCard(payload))
                .then(() => {
                    setShowCardForm(false);
                    resetCard();
                });
        }
    };

    const handleSelectCard = (card) => {
        setSelectedCard(card);
        dispatch(setPayment(card));
    };

    const handleEditCard = (card) => {
        setEditingCard(card);
        setShowCardForm(true);
    };

    const handleDeleteCard = (id) => {
        if (window.confirm('Bu kartı silmek istediğinize emin misiniz?')) {
            dispatch(deleteCard(id));
            if (selectedCard?.id === id) {
                setSelectedCard(null);
            }
        }
    };

    const getCardType = (cardNumber) => {
        if (!cardNumber) return 'generic';
        const cleanNum = cardNumber.replace(/\D/g, '');
        if (cleanNum.startsWith('4')) return 'visa';
        if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanNum)) return 'mastercard';
        if (/^(34|37)/.test(cleanNum)) return 'amex';
        if (/^9792/.test(cleanNum)) return 'troy';
        return 'generic';
    };

    const checkedItems = cart.filter(item => item.checked);
    const totalPrice = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
    const shippingFee = totalPrice > 150 ? 0 : 29.99;
    const finalTotal = totalPrice + shippingFee;

    const getInstallmentOptions = (card) => {
        if (!card) return [{ count: 1, label: 'Tek Çekim', rate: 0 }];
        const type = getCardType(card.card_no);
        switch (type) {
            case 'visa':
                return [
                    { count: 1, label: 'Tek Çekim', rate: 0 },
                    { count: 3, label: '3 Taksit (Vade Farksız)', rate: 0 },
                    { count: 6, label: '6 Taksit', rate: 0.05 },
                    { count: 9, label: '9 Taksit', rate: 0.09 },
                    { count: 12, label: '12 Taksit', rate: 0.12 }
                ];
            case 'mastercard':
                return [
                    { count: 1, label: 'Tek Çekim', rate: 0 },
                    { count: 3, label: '3 Taksit', rate: 0.04 },
                    { count: 6, label: '6 Taksit', rate: 0.07 },
                    { count: 9, label: '9 Taksit', rate: 0.08 },
                    { count: 12, label: '12 Taksit', rate: 0.14 }
                ];
            case 'amex':
                return [
                    { count: 1, label: 'Tek Çekim', rate: 0 },
                    { count: 3, label: '3 Taksit', rate: 0.06 },
                    { count: 6, label: '6 Taksit', rate: 0.10 },
                    { count: 9, label: '9 Taksit', rate: 0.15 }
                ];
            case 'troy':
                return [
                    { count: 1, label: 'Tek Çekim', rate: 0 },
                    { count: 3, label: '3 Taksit', rate: 0.03 },
                    { count: 6, label: '6 Taksit', rate: 0.06 }
                ];
            default:
                return [
                    { count: 1, label: 'Tek Çekim', rate: 0 },
                    { count: 3, label: '3 Taksit', rate: 0.05 },
                    { count: 6, label: '6 Taksit', rate: 0.09 }
                ];
        }
    };

    const formatCardNoForMock = (val) => {
        if (!val) return '•••• •••• •••• ••••';
        const clean = val.replace(/\D/g, '');
        let result = '';
        for (let i = 0; i < clean.length; i++) {
            if (i > 0 && i % 4 === 0) {
                result += ' ';
            }
            result += clean[i];
        }
        return result || '•••• •••• •••• ••••';
    };

    const formatCardHidden = (num) => {
        if (!num) return '';
        const clean = num.replace(/\D/g, '');
        if (clean.length < 12) return num;
        return `•••• •••• •••• ${clean.slice(-4)}`;
    };

    const installmentOptions = selectedCard ? getInstallmentOptions(selectedCard) : [{ count: 1, label: 'Tek Çekim', rate: 0 }];
    const activeInstallment = installmentOptions.find(opt => opt.count === selectedInstallment.count) || installmentOptions[0];
    const installmentFee = finalTotal * activeInstallment.rate;
    const finalTotalWithInstallment = finalTotal + installmentFee;

    const handleCompleteOrder = () => {
        if (!selectedAddress?.id) {
            toast.error('Lütfen bir teslimat adresi seçiniz.');
            setActiveStep('address');
            return;
        }
        if (!selectedCard?.id) {
            toast.error('Lütfen bir ödeme yöntemi (kart) seçiniz.');
            return;
        }
        if (!dummyCvv || dummyCvv.trim().length !== 3) {
            setDummyCvvError('Lütfen 3 haneli geçerli CVV kodunu giriniz.');
            return;
        }

        setDummyCvvError('');
        setIsSubmittingOrder(true);

        const token = user?.token || localStorage.getItem('token');
        const orderPayload = {
            address_id: selectedAddress.id,
            card_no: Number(String(selectedCard.card_no).replace(/\D/g, '')),
            card_name: selectedCard.name_on_card,
            card_expire_month: Number(selectedCard.expire_month),
            card_expire_year: Number(selectedCard.expire_year),
            card_ccv: Number(dummyCvv),
            price: Number(finalTotalWithInstallment.toFixed(2)),
            products: checkedItems.map(item => ({
                product_id: item.product.id,
                count: item.count,
                detail: item.product.description || item.product.name || ""
            }))
        };

        axios.post('https://workintech-fe-ecommerce.onrender.com/order', orderPayload, {
            headers: {
                Authorization: token
            }
        })
        .then(() => {
            setIsSubmittingOrder(false);
            toast.success('Siparişiniz başarıyla alındı! Alışverişiniz için teşekkür ederiz.');
            dispatch(setCart([]));
            history.push('/previous-orders');
        })
        .catch(err => {
            console.error('Error submitting order to backend:', err);
            setIsSubmittingOrder(false);
            toast.error('Sipariş gönderilirken bir hata oluştu: ' + (err.response?.data?.message || err.message));
        });
    };

    const cities = ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Diyarbakir"];

    return (
        <div className="bg-[#FAFAFA] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                
                {/* Stepper Header */}
                <div className="flex justify-center mb-10">
                    <div className="flex items-center w-full max-w-2xl">
                        <div 
                            onClick={() => setActiveStep('address')}
                            className={`flex flex-col items-center flex-1 cursor-pointer`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold transition-all ${activeStep === 'address' ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white text-gray-text border-2 border-gray-200'}`}>
                                1
                            </div>
                            <span className={`text-sm font-bold ${activeStep === 'address' ? 'text-primary' : 'text-gray-text'}`}>Adres Bilgileri</span>
                        </div>
                        
                        <div className="h-0.5 bg-gray-200 flex-1 -mt-6"></div>
                        
                        <div 
                            onClick={() => selectedAddress?.id ? setActiveStep('payment') : null}
                            className={`flex flex-col items-center flex-1 ${selectedAddress?.id ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold transition-all ${activeStep === 'payment' ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white text-gray-text border-2 border-gray-200'}`}>
                                2
                            </div>
                            <span className={`text-sm font-bold ${activeStep === 'payment' ? 'text-primary' : 'text-gray-text'}`}>Ödeme Seçenekleri</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeStep === 'address' ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-dark">Teslimat Adresi</h2>
                                    <button 
                                        onClick={() => { setShowAddressForm(true); setEditingAddress(null); reset(); }}
                                        className="text-primary font-bold flex items-center gap-2 hover:underline"
                                    >
                                        <Plus size={20} />
                                        Yeni Adres Ekle
                                    </button>
                                </div>

                                {/* Address Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addressList.map((addr) => (
                                        <div 
                                            key={addr.id}
                                            onClick={() => handleSelectAddress(addr)}
                                            className={`p-6 rounded-lg border-2 transition-all cursor-pointer relative bg-white ${selectedAddress?.id === addr.id ? 'border-primary shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={18} className="text-primary" />
                                                    <h3 className="font-bold text-dark uppercase">{addr.title}</h3>
                                                </div>
                                                {selectedAddress?.id === addr.id && (
                                                    <div className="bg-primary text-white p-1 rounded-full">
                                                        <Check size={12} />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2 text-sm text-gray-text">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} />
                                                    <span className="font-bold">{addr.name} {addr.surname}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} />
                                                    <span>{addr.phone}</span>
                                                </div>
                                                <p className="mt-2 line-clamp-2">
                                                    {addr.neighborhood}
                                                </p>
                                                <p className="text-xs font-bold text-dark">
                                                    {addr.district} / {addr.city.toUpperCase()}
                                                </p>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end gap-4">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(addr); }}
                                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold"
                                                >
                                                    <Edit2 size={14} /> Düzenle
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}
                                                    className="text-gray-400 hover:text-alert transition-colors flex items-center gap-1 text-xs font-bold"
                                                >
                                                    <Trash2 size={14} /> Sil
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {addressList.length === 0 && !showAddressForm && (
                                        <div className="col-span-full py-20 text-center bg-white rounded-lg border-2 border-dashed border-gray-200">
                                            <p className="text-gray-text mb-4">Henüz kayıtlı bir adresiniz bulunmamaktadır.</p>
                                            <button 
                                                onClick={() => setShowAddressForm(true)}
                                                className="bg-primary text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-opacity"
                                            >
                                                İlk Adresini Oluştur
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Address Form Overlay/Modal-like */}
                                {showAddressForm && (
                                    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                                        <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                <h3 className="text-xl font-bold text-dark">
                                                    {editingAddress ? 'Adres Güncelle' : 'Yeni Adres Ekle'}
                                                </h3>
                                                <button 
                                                    onClick={() => setShowAddressForm(false)}
                                                    className="text-gray-text hover:text-dark p-2"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            
                                            <form onSubmit={handleSubmit(onSubmitAddress)} className="p-8 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-bold text-dark mb-2">Adres Başlığı</label>
                                                        <input 
                                                            {...register("title", { required: "Adres başlığı zorunludur" })}
                                                            placeholder="Örn: Ev, İş"
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errors.title && <p className="text-alert text-xs mt-1 font-bold">{errors.title.message}</p>}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-bold text-dark mb-2">Ad</label>
                                                        <input 
                                                            {...register("name", { required: "Ad zorunludur" })}
                                                            placeholder="Adınız"
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errors.name && <p className="text-alert text-xs mt-1 font-bold">{errors.name.message}</p>}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-bold text-dark mb-2">Soyad</label>
                                                        <input 
                                                            {...register("surname", { required: "Soyad zorunludur" })}
                                                            placeholder="Soyadınız"
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errors.surname && <p className="text-alert text-xs mt-1 font-bold">{errors.surname.message}</p>}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-bold text-dark mb-2">Telefon</label>
                                                        <input 
                                                            {...register("phone", { 
                                                                required: "Telefon zorunludur",
                                                                pattern: {
                                                                    value: /^[0-9+ ]+$/,
                                                                    message: "Lütfen geçerli bir telefon numarası giriniz"
                                                                }
                                                            })}
                                                            placeholder="05xxxxxxxxx"
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errors.phone && <p className="text-alert text-xs mt-1 font-bold">{errors.phone.message}</p>}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-bold text-dark mb-2">İl</label>
                                                        <select 
                                                            {...register("city", { required: "Lütfen bir il seçiniz" })}
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                                                        >
                                                            <option value="">İl Seçiniz</option>
                                                            {cities.map(city => <option key={city} value={city.toLowerCase()}>{city}</option>)}
                                                        </select>
                                                        {errors.city && <p className="text-alert text-xs mt-1 font-bold">{errors.city.message}</p>}
                                                    </div>
                                                    
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-bold text-dark mb-2">İlçe</label>
                                                        <input 
                                                            {...register("district", { required: "İlçe zorunludur" })}
                                                            placeholder="İlçe giriniz"
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errors.district && <p className="text-alert text-xs mt-1 font-bold">{errors.district.message}</p>}
                                                    </div>
                                                    
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-bold text-dark mb-2">Adres Detayı (Mahalle, Sokak, No...)</label>
                                                        <textarea 
                                                            {...register("neighborhood", { required: "Adres detayı zorunludur" })}
                                                            placeholder="Mahalle, cadde, sokak ve bina bilgilerini giriniz"
                                                            rows={3}
                                                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                                        ></textarea>
                                                        {errors.neighborhood && <p className="text-alert text-xs mt-1 font-bold">{errors.neighborhood.message}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-4 pt-4">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setShowAddressForm(false)}
                                                        className="flex-1 py-4 text-sm font-bold text-gray-text border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                                    >
                                                        İptal
                                                    </button>
                                                    <button 
                                                        type="submit"
                                                        className="flex-1 py-4 text-sm font-bold bg-primary text-white rounded-md hover:opacity-90 transition-opacity shadow-lg"
                                                    >
                                                        {editingAddress ? 'Güncelle' : 'Kaydet'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-dark">Kayıtlı Kartlarım</h2>
                                    <button 
                                        type="button"
                                        onClick={() => { setShowCardForm(true); setEditingCard(null); resetCard(); }}
                                        className="text-primary font-bold flex items-center gap-2 hover:underline"
                                    >
                                        <Plus size={20} />
                                        Yeni Kart Ekle
                                    </button>
                                </div>

                                {/* Card Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cardList.map((card) => {
                                        const type = getCardType(card.card_no);
                                        const isSelected = selectedCard?.id === card.id;
                                        return (
                                            <div 
                                                key={card.id}
                                                onClick={() => handleSelectCard(card)}
                                                className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden bg-white ${
                                                    isSelected ? 'border-primary shadow-md ring-1 ring-primary' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard size={18} className="text-primary" />
                                                        <h3 className="font-bold text-dark text-xs tracking-wider uppercase font-mono bg-gray-100 px-2 py-0.5 rounded">
                                                            {type.toUpperCase()}
                                                        </h3>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="bg-primary text-white p-1 rounded-full">
                                                            <Check size={12} />
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <div className="text-sm font-semibold tracking-wide text-gray-text font-mono">
                                                        {formatCardHidden(card.card_no)}
                                                    </div>
                                                    <div className="flex justify-between items-end text-xs text-gray-400">
                                                        <div>
                                                            <div className="text-[9px] uppercase text-gray-400">Kart Sahibi</div>
                                                            <div className="font-bold text-dark truncate max-w-[150px]">{card.name_on_card}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[9px] uppercase text-gray-400">SGT</div>
                                                            <div className="font-bold text-dark">
                                                                {String(card.expire_month).padStart(2, '0')}/{String(card.expire_year).slice(-2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end gap-3">
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleEditCard(card); }}
                                                        className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold"
                                                    >
                                                        <Edit2 size={13} /> Düzenle
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}
                                                        className="text-gray-400 hover:text-alert transition-colors flex items-center gap-1 text-xs font-bold"
                                                    >
                                                        <Trash2 size={13} /> Sil
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {cardList.length === 0 && !showCardForm && (
                                        <div className="col-span-full py-16 text-center bg-white rounded-lg border-2 border-dashed border-gray-200">
                                            <p className="text-gray-text mb-4">Henüz kayıtlı bir kartınız bulunmamaktadır.</p>
                                            <button 
                                                onClick={() => setShowCardForm(true)}
                                                className="bg-primary text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-opacity"
                                            >
                                                İlk Kartını Ekle
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Card Customizer Installment options - Fetched by active card data! */}
                                {selectedCard && (
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
                                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                                            <ShieldCheck size={20} className="text-primary" />
                                            <h3 className="font-bold text-dark text-base">Taksit ve Ödeme Seçenekleri</h3>
                                        </div>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm text-gray-text">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 bg-gray-50/50">
                                                        <th className="py-2 px-3">Taksit Sayısı</th>
                                                        <th className="py-2 px-3">Aylık Ödeme</th>
                                                        <th className="py-2 px-3 text-right">Toplam Tutar</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {installmentOptions.map((opt) => {
                                                        const rateTotal = finalTotal * (1 + opt.rate);
                                                        const monthly = rateTotal / opt.count;
                                                        const isInstallmentSelected = selectedInstallment.count === opt.count;
                                                        return (
                                                            <tr 
                                                                key={opt.count}
                                                                onClick={() => setSelectedInstallment(opt)}
                                                                className={`cursor-pointer transition-colors ${
                                                                    isInstallmentSelected ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                <td className="py-3 px-3 flex items-center gap-3">
                                                                    <input 
                                                                        type="radio"
                                                                        name="installment"
                                                                        checked={isInstallmentSelected}
                                                                        onChange={() => setSelectedInstallment(opt)}
                                                                        className="text-primary focus:ring-primary h-4 w-4"
                                                                    />
                                                                    <span>{opt.count === 1 ? 'Tek Çekim' : `${opt.count} Taksit (${opt.label || ''})`}</span>
                                                                </td>
                                                                <td className="py-3 px-3">
                                                                    {monthly.toFixed(2)} TL
                                                                </td>
                                                                <td className="py-3 px-3 text-right">
                                                                    {rateTotal.toFixed(2)} TL
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Security (CVV) Validation */}
                                        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                                <Lock size={16} className="text-gray-400" />
                                                <span className="text-xs text-gray-text">Kartınızın 3 haneli güvenlik kodunu (CVV) giriniz:</span>
                                            </div>
                                            <div className="w-full sm:w-32">
                                                <input 
                                                    type="text"
                                                    maxLength={3}
                                                    placeholder="CVV"
                                                    value={dummyCvv}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '');
                                                        setDummyCvv(val);
                                                        if (val.length === 3) setDummyCvvError('');
                                                    }}
                                                    className={`w-full px-3 py-2 text-center rounded border outline-none font-mono text-sm tracking-widest ${
                                                        dummyCvvError ? 'border-alert focus:border-alert' : 'border-gray-200 focus:border-primary'
                                                    }`}
                                                />
                                                {dummyCvvError && (
                                                    <p className="text-[10px] text-alert font-bold mt-1 text-center">{dummyCvvError}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Credit Card Creation & Editing Modal */}
                                {showCardForm && (
                                    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                                        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                <h3 className="text-lg font-bold text-dark">
                                                    {editingCard ? 'Kartı Güncelle' : 'Yeni Kart Ekle'}
                                                </h3>
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowCardForm(false)}
                                                    className="text-gray-text hover:text-dark p-2"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            
                                            <form onSubmit={handleSubmitCard(onSubmitCard)} className="p-8 space-y-6">
                                                
                                                {/* PREMIUM VISUAL CARD LIVE PREVIEW */}
                                                <div className="relative w-full max-w-sm h-48 rounded-2xl mx-auto mb-6 p-6 text-white shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
                                                    style={{
                                                        background: getCardType(cardNoValue) === 'visa' ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' :
                                                                    getCardType(cardNoValue) === 'mastercard' ? 'linear-gradient(135deg, #1f2937 0%, #431407 100%)' :
                                                                    getCardType(cardNoValue) === 'amex' ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' :
                                                                    getCardType(cardNoValue) === 'troy' ? 'linear-gradient(135deg, #7c2d12 0%, #b45309 100%)' :
                                                                    'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                                                    }}>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="w-10 h-7 bg-amber-200/80 rounded-md flex flex-col justify-between p-1">
                                                            <div className="h-full border-r border-b border-amber-800/10"></div>
                                                        </div>
                                                        <span className="text-xl font-black italic tracking-wider uppercase">
                                                            {getCardType(cardNoValue).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="text-xl tracking-widest font-mono mb-6 text-center">
                                                        {cardNoValue ? formatCardNoForMock(cardNoValue) : '•••• •••• •••• ••••'}
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <div className="text-[8px] uppercase tracking-wider text-white/60 mb-0.5">Kart Sahibi</div>
                                                            <div className="text-xs font-semibold tracking-wide truncate max-w-[180px]">
                                                                {nameOnCardValue || 'KART ÜZERİNDEKİ İSİM'}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[8px] uppercase tracking-wider text-white/60 mb-0.5">SGT</div>
                                                            <div className="text-xs font-semibold tracking-widest font-mono">
                                                                {expireMonthValue ? String(expireMonthValue).padStart(2, '0') : 'AA'}/{expireYearValue ? String(expireYearValue).slice(-2) : 'YY'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">Kart Numarası</label>
                                                        <input 
                                                            type="text"
                                                            maxLength={19}
                                                            placeholder="0000 0000 0000 0000"
                                                            {...registerCard("card_no", { 
                                                                required: "Kart numarası zorunludur",
                                                                pattern: {
                                                                    value: /^[\d\s-]{13,19}$/,
                                                                    message: "Lütfen geçerli bir kart numarası giriniz (16 hane)"
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                                                            onChange={(e) => {
                                                                // Simple formatting while input is changed
                                                                const formatted = formatCardNoForMock(e.target.value);
                                                                setValueCard("card_no", formatted);
                                                            }}
                                                        />
                                                        {errorsCard?.card_no && <p className="text-alert text-xs mt-1 font-bold">{errorsCard.card_no.message}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">Kart Üzerindeki İsim</label>
                                                        <input 
                                                            type="text"
                                                            placeholder="Örn: Ali Baş"
                                                            {...registerCard("name_on_card", { required: "İsim alanı zorunludur" })}
                                                            className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                        />
                                                        {errorsCard?.name_on_card && <p className="text-alert text-xs mt-1 font-bold">{errorsCard.name_on_card.message}</p>}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">Son Kullanma Ayı</label>
                                                            <select 
                                                                {...registerCard("expire_month", { required: "Ay seçiniz" })}
                                                                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                                                            >
                                                                <option value="">Seçiniz</option>
                                                                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                                                    <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                                                                ))}
                                                            </select>
                                                            {errorsCard?.expire_month && <p className="text-alert text-xs mt-1 font-bold">{errorsCard.expire_month.message}</p>}
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">Son Kullanma Yılı</label>
                                                            <select 
                                                                {...registerCard("expire_year", { required: "Yıl seçiniz" })}
                                                                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                                                            >
                                                                <option value="">Seçiniz</option>
                                                                {Array.from({ length: 11 }, (_, i) => 2024 + i).map(y => (
                                                                    <option key={y} value={y}>{y}</option>
                                                                ))}
                                                            </select>
                                                            {errorsCard?.expire_year && <p className="text-alert text-xs mt-1 font-bold">{errorsCard.expire_year.message}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-4 pt-4">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setShowCardForm(false)}
                                                        className="flex-1 py-3 text-sm font-bold text-gray-text border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                                    >
                                                        İptal
                                                    </button>
                                                    <button 
                                                        type="submit"
                                                        className="flex-1 py-3 text-sm font-bold bg-primary text-white rounded-md hover:opacity-90 transition-opacity shadow-lg"
                                                    >
                                                        {editingCard ? 'Güncelle' : 'Kaydet'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Summary Sidebar */}
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
                                {activeStep === 'payment' && selectedInstallment && selectedInstallment.count > 1 && (
                                    <div className="flex justify-between text-sm text-gray-text pt-2 border-t border-dashed border-gray-100">
                                        <span>Taksit Farkı</span>
                                        <span className="font-bold text-dark">{installmentFee.toFixed(2)} TL</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
                                <span className="text-base font-bold text-dark">Toplam</span>
                                <span className="text-2xl font-bold text-primary">
                                    {activeStep === 'payment' ? finalTotalWithInstallment.toFixed(2) : finalTotal.toFixed(2)} TL
                                </span>
                            </div>

                            {activeStep === 'payment' && selectedInstallment && selectedInstallment.count > 1 && (
                                <div className="bg-primary/5 p-3 rounded-lg text-xs font-semibold text-primary mb-6 text-center">
                                    Ödeme Planı: {selectedInstallment.count} x {(finalTotalWithInstallment / selectedInstallment.count).toFixed(2)} TL
                                </div>
                            )}

                            {activeStep === 'address' ? (
                                <button 
                                    onClick={() => setActiveStep('payment')}
                                    disabled={!selectedAddress?.id}
                                    className={`w-full py-4 text-center text-sm font-bold bg-primary text-white rounded hover:opacity-90 transition-all shadow-md uppercase ${!selectedAddress?.id ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
                                >
                                    Ödemeye Geç
                                </button>
                            ) : (
                                <button 
                                    onClick={handleCompleteOrder}
                                    disabled={isSubmittingOrder || !selectedCard?.id}
                                    className={`w-full py-4 text-center text-sm font-bold bg-primary text-white rounded hover:opacity-90 transition-all shadow-md uppercase ${
                                        isSubmittingOrder || !selectedCard?.id ? 'opacity-50 cursor-not-allowed shadow-none' : ''
                                    }`}
                                >
                                    {isSubmittingOrder ? 'Siparişiniz Alınıyor...' : 'Siparişi Tamamla'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderPage;
