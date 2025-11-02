import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from './persistConfig.js'; 

// Wrap the user reducer with persistence
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
