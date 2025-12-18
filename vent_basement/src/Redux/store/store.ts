import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import devicesReducer from '../slices/devicesStatusSlice';
import humidityReducer from '../slices/interactiveChartSlice';
import temperatureReducer from '../slices/temperatureSlice';
const store = configureStore({
  reducer: {
    devices: devicesReducer,
    humidity: humidityReducer,
    temperature: temperatureReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;