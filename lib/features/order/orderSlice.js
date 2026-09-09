import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload || [];
    },
    addOrder: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.list.find(o => 
        (o.orderId && o.orderId === orderId) ||
        (o.documentId && o.documentId === orderId) ||
        (o.id && String(o.id) === String(orderId))
      );
      if (order) {
        order.orderStatus = status;
        order.status = status;
      }
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
