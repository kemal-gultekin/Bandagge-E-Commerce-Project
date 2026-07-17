import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginUser } from '../redux/actions/clientActions';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Get the redirect path from state, or default to home
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const loginPayload = {
        email: data.email,
        password: data.password
      };
      await dispatch(loginUser(loginPayload, data.rememberMe));
      history.push(from);
    } catch (error) {
      // Error handled by thunk via toast
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark tracking-tight">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-text">
            Or{' '}
            <button onClick={() => history.push('/signup')} className="font-medium text-primary hover:text-[#21735e] transition-colors">
              create a new account
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div className="relative mb-4">
              <label htmlFor="email" className="block text-sm font-bold text-gray-text mb-1 italic">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-3 border ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} placeholder-gray-500 text-dark focus:outline-none focus:z-10 sm:text-sm transition-all`}
                  placeholder="customer@commerce.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-bold">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-bold text-gray-text mb-1 italic">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-3 border ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} placeholder-gray-500 text-dark focus:outline-none focus:z-10 sm:text-sm transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-bold">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-text cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-[#21735e] transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-[#21735e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <Lock className="h-5 w-5 text-white opacity-50 group-hover:opacity-100" />
                )}
              </span>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-text font-bold italic uppercase tracking-wider">Test Accounts</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-gray-text font-mono bg-gray-50 p-4 rounded-md border border-dashed border-gray-300">
            <p>Email: customer@commerce.com | PW: 123456</p>
            <p>Email: store@commerce.com | PW: 123456</p>
            <p>Email: admin@commerce.com | PW: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
