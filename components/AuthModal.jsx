'use client';

import React, { useState } from 'react';
import { XIcon, Lock, Mail, User } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@/lib/graphql/mutations';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/features/auth/authSlice';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
    const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER_MUTATION);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await loginMutation({
                    variables: {
                        input: {
                            identifier: email,
                            password: password,
                        },
                    },
                });
                if (response?.data?.login) {
                    const { jwt, user } = response.data.login;
                    dispatch(setCredentials({ user, token: jwt }));
                    toast.success(`Welcome back, ${user.username || 'Shopper'}!`);
                    onClose();
                }
            } else {
                const response = await registerMutation({
                    variables: {
                        input: {
                            username: username || email.split('@')[0],
                            email: email,
                            password: password,
                        },
                    },
                });
                if (response?.data?.register) {
                    const { jwt, user } = response.data.register;
                    dispatch(setCredentials({ user, token: jwt }));
                    toast.success(`Account created successfully! Welcome, ${user.username}!`);
                    onClose();
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            toast.error(error.message || 'Authentication failed. Please check your credentials.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
                >
                    <XIcon size={20} />
                </button>

                <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                    {isLogin ? 'Welcome to GoCart' : 'Create an Account'}
                </h2>
                <p className="text-sm text-slate-500 text-center mb-6">
                    {isLogin ? 'Sign in to access your orders and checkout faster' : 'Join GoCart to save orders and track shipments'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5 focus-within:border-slate-800">
                                <User size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full text-sm outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5 focus-within:border-slate-800">
                            <Mail size={18} className="text-slate-400" />
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-sm outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                        <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5 focus-within:border-slate-800">
                            <Lock size={18} className="text-slate-400" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-sm outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loginLoading || registerLoading}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-lg transition active:scale-98 cursor-pointer mt-2 disabled:opacity-50"
                    >
                        {loginLoading || registerLoading
                            ? 'Processing...'
                            : isLogin
                            ? 'Sign In'
                            : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500">
                    {isLogin ? (
                        <p>
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-green-600 font-semibold hover:underline cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-green-600 font-semibold hover:underline cursor-pointer"
                            >
                                Log In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
