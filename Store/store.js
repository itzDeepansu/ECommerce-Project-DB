import { configureStore ,combineReducers } from "@reduxjs/toolkit";
import itemReducer from '@/features/item/itemSlice'
import cartReducer from '@/features/cart/cartSlice'

const rootReducer = combineReducers({
    cart: cartReducer,
    item: itemReducer,
  });
 

export const store = configureStore({
    reducer:rootReducer
 })