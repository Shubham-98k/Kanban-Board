import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js";
import storage from "redux-persist/es/storage"; // Defaults to browser's localStorage
import { persistReducer, persistStore } from "redux-persist";

// STEP 1: Combine all slices (if you have postSlice, cartSlice, etc., put them here)
const rootReducer = combineReducers({
  user: userReducer,
});

// STEP 2: Configuration for the backup generator
const persistConfig = {
  key: "root", // The key name used in browser localStorage
  storage,     // Tell it to use localStorage
  version: 1,
};

// STEP 3: Wrap our root reducer with the persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STEP 4: Build the Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents annoying console warnings from redux-persist
    }),
});

export const persistor = persistStore(store);