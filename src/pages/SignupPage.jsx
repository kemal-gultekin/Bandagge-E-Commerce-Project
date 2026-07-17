import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ChevronRight, CheckCircle } from 'lucide-react';

const SignupPage = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Add validation and API call here
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Left Side - Info/Visual */}
            <div className="hidden md:flex w-1/2 bg-[#21735e] text-white p-20 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
                
                <div className="z-10">
                    <h1 className="text-5xl font-bold mb-8 tracking-tight">Join Our Community</h1>
                    <p className="text-xl text-white/80 max-w-md leading-relaxed">
                        Start your journey with us and discover the best products tailored just for you.
                    </p>
                </div>

                <div className="space-y-8 z-10">
                    <div className="flex items-start space-x-4">
                        <CheckCircle className="text-white shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-lg">Exclusive Access</h4>
                            <p className="text-white/60 text-sm italic">Be the first to know about new arrivals and sales.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <CheckCircle className="text-white shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-lg">Personalized Style</h4>
                            <p className="text-white/60 text-sm italic">Get recommendations based on your unique taste.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <CheckCircle className="text-white shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-lg">Secure Shopping</h4>
                            <p className="text-white/60 text-sm italic">Safe and encrypted transactions for every purchase.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-20 z-10">
                    <div className="flex items-center space-x-2 text-sm font-bold opacity-60">
                        <span>© 2024 YourBrand</span>
                        <span>•</span>
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-20 py-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-dark mb-4">Create Account</h2>
                        <p className="text-gray-text">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-dark mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe" 
                                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-dark mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com" 
                                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-dark mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-bold text-dark mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Select */}
                        <div>
                            <label className="block text-sm font-bold text-dark mb-2">Role</label>
                            <select 
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            >
                                <option value="customer">Customer</option>
                                <option value="store">Store Owner</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-[#21735e] transition-all flex items-center justify-center space-x-2 group"
                        >
                            <span>Create Account</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-xs text-gray-text text-center leading-relaxed">
                            By clicking "Create Account", you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
