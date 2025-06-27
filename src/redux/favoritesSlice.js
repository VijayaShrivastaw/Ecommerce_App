import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: {}, // store favorites as an object with product id keys for quick access
  },
  reducers: {
    addFavorite: (state, action) => {
      const product = action.payload;
      state.items[product.id] = product;
    },
    removeFavorite: (state, action) => {
      const productId = action.payload;
      delete state.items[productId];
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
