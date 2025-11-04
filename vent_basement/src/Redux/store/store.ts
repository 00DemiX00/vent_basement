import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from '../devices/devicesSlice';

const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
});

export default store;

// Типизация состояния и dispatch (опционально)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;