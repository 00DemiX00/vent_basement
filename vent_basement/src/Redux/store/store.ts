import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from '../slices/devicesStatusSlice';
import chartDataReducer from '../slices/interactiveChartSlice'
import chartReducer from '../slices/interactiveChartSlice'

const store = configureStore({
  reducer: {
    devices: devicesReducer,
    chartData: chartDataReducer, chartReducer,
  },
});

export default store;

// Типизация состояния и dispatch (опционально)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;