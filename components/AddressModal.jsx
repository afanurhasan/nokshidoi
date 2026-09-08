'use client';

import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAddress } from "@/lib/features/address/addressSlice";

const AddressModal = ({ setShowAddressModal }) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    });

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addAddress(address));
        toast.success('Address saved!');
        setShowAddressModal(false);
    };

    return (
        <form onSubmit={handleSubmit} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-4 text-slate-700 w-full max-w-md relative animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold text-slate-800">Add New <span className="text-green-600">Address</span></h2>
                <input name="name" onChange={handleAddressChange} value={address.name} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="Enter your name" required />
                <input name="email" onChange={handleAddressChange} value={address.email} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="email" placeholder="Email address" required />
                <input name="street" onChange={handleAddressChange} value={address.street} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="Street Address" required />
                <div className="flex gap-3">
                    <input name="city" onChange={handleAddressChange} value={address.city} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="City" required />
                    <input name="state" onChange={handleAddressChange} value={address.state} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="State" required />
                </div>
                <div className="flex gap-3">
                    <input name="zip" onChange={handleAddressChange} value={address.zip} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="Zip code" required />
                    <input name="country" onChange={handleAddressChange} value={address.country} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="text" placeholder="Country" required />
                </div>
                <input name="phone" onChange={handleAddressChange} value={address.phone} className="p-2.5 px-4 outline-none border border-slate-300 rounded-lg w-full text-sm" type="tel" placeholder="Phone Number" required />
                <button type="submit" className="bg-slate-800 text-white text-sm font-medium py-3 rounded-lg hover:bg-slate-900 active:scale-98 transition cursor-pointer mt-2">
                    SAVE ADDRESS
                </button>
                <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
                >
                    <XIcon size={20} />
                </button>
            </div>
        </form>
    );
};

export default AddressModal;