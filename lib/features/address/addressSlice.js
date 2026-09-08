import { createSlice } from '@reduxjs/toolkit';

const defaultAddress = {
    name: 'Mehedi Hasan',
    email: 'mehedi@example.com',
    phone: '+880 1712-345678',
    street: 'House 14, Road 4, Sector 7',
    city: 'Dhaka',
    state: 'Dhaka',
    zip: '1230',
    country: 'Bangladesh',
};

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        list: [defaultAddress],
    },
    reducers: {
        addAddress: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateAddress: (state, action) => {
            const { index, address } = action.payload;
            if (state.list[index]) {
                state.list[index] = address;
            }
        },
    },
});

export const { addAddress, updateAddress } = addressSlice.actions;
export default addressSlice.reducer;