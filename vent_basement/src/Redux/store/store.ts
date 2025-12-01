import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from '../slices/devicesStatusSlice';
import humidityReducer from '../slices/interactiveChartSlice';
const store = configureStore({
  reducer: {
    devices: devicesReducer,
    humidity: humidityReducer,
  },
});

export default store;

// Типизация состояния и dispatch (опционально)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;