import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PocketBase from "pocketbase";
import { Product, SummaryInfo } from "../interface/products";

const pb = new PocketBase("http://127.0.0.1:8090");

const FETCH_PRODUCTS = "products/fetchProducts";
const FETCH_CART_PRODUCTS = "products/fetchCartProducts";
const FETCH_ADD_TO_CART = "products/fetchAddToCart";
const FETCH_DELETE_FROM_CART = "products/fetchDeleteFromCart";

export const fetchProducts = createAsyncThunk<Product[], void>(
  FETCH_PRODUCTS,
  async () => {
    const response = await pb.collection("products").getList<Product>(1, 50);
    return response.items;
  }
);

export const fetchCartProducts = createAsyncThunk<Product[]>(
  FETCH_CART_PRODUCTS,
  async () => {
    return await pb.collection("cart").getFullList<Product>();
  }
);

export const fetchAddToCart = createAsyncThunk<void, Product>(
  FETCH_ADD_TO_CART,
  async (data) => {
    await pb.collection("cart").create(data);
  }
);

export const fetchDeleteFromCart = createAsyncThunk<void, string>(
  FETCH_DELETE_FROM_CART,
  async (id) => {
    await pb.collection("cart").delete(id);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [] as Product[],
    status: "idle" as "idle" | "loading" | "fulfilled" | "failed",
    cart: [] as Product[],
    counterCart: 0 as number,
    added: false as boolean,
    error: false as boolean,
    eliminatedFromCart: false as boolean,
    summaryCart: {} as SummaryInfo,
  },
  reducers: {
    resetState(state) {
      state.added = false;
      state.error = false;
      state.eliminatedFromCart = false;
    },
    setSummaryCart(state, action: PayloadAction<SummaryInfo>) {
      state.summaryCart = action.payload;
    },
    resetCounter(state) {
      state.counterCart = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })

      .addCase(fetchCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload;
        state.counterCart = state.cart.length;
      })
      .addCase(fetchCartProducts.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })

      .addCase(fetchAddToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddToCart.fulfilled, (state) => {
        state.status = "fulfilled";
        state.added = true;
        state.counterCart = state.counterCart + 1;
      })
      .addCase(fetchAddToCart.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })

      .addCase(fetchDeleteFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteFromCart.fulfilled, (state) => {
        state.status = "fulfilled";
        state.eliminatedFromCart = true;
        state.counterCart = state.cart.length;
      })
      .addCase(fetchDeleteFromCart.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const { resetState, setSummaryCart, resetCounter } =
  productSlice.actions;

export default productSlice.reducer;
