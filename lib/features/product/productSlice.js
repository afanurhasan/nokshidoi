import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.list = (action.payload || []).map((p) => ({
        ...p,
        stock: p.stock != null ? p.stock : 25,
      }));
    },
    clearProduct: (state) => {
      state.list = [];
    },
    decrementStock: (state, action) => {
      const { items } = action.payload || {};
      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        const id = item.productId || item.id || item.documentId;
        const qty = Number(item.quantity) || 1;
        const product = state.list.find((p) => p.id === id || p.documentId === id);
        if (product) {
          const currentStock = product.stock != null ? product.stock : 25;
          product.stock = Math.max(0, currentStock - qty);
        }
      });
    },
    restoreStock: (state, action) => {
      const { items } = action.payload || {};
      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        const id = item.productId || item.id || item.documentId;
        const qty = Number(item.quantity) || 1;
        const product = state.list.find((p) => p.id === id || p.documentId === id);
        if (product) {
          const currentStock = product.stock != null ? product.stock : 25;
          product.stock = currentStock + qty;
        }
      });
    },
    updateStock: (state, action) => {
      const { productId, stock } = action.payload || {};
      const product = state.list.find((p) => p.id === productId || p.documentId === productId);
      if (product) {
        product.stock = Math.max(0, Number(stock) || 0);
      }
    },
  },
});

export const { setProduct, clearProduct, decrementStock, restoreStock, updateStock } = productSlice.actions;

export default productSlice.reducer;