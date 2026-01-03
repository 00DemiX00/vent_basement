import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { FanMode } from './fanModeSlice';

// Типы статусов устройств
type FanStatus = 'on' | 'off';
type SensorStatus = 'working' | 'error' | 'offline';
type ESP32Status = 'online' | 'offline';

interface DevicesState {
  data: {
    esp32: ESP32Status;
    sensor1: SensorStatus;
    sensor2: SensorStatus;
    fan1: FanStatus;
    fan2: FanStatus;
    fan1_mode: FanMode;
    fan2_mode: FanMode;
  };
  loading: boolean;
  error: string | null;
}

// Изначальные значения
const initialState: DevicesState = {
  data: {
    esp32: 'offline',
    sensor1: 'offline',
    sensor2: 'offline',
    fan1: 'off',
    fan2: 'off',
    fan1_mode: 'AUTO',
    fan2_mode: 'AUTO',
  },
  loading: false,
  error: null,
};

// AsyncThunk для получения данных с сервера
export const fetchDeviceStatuses = createAsyncThunk(
  'devices/fetchStatuses',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/devices');
      return {
        ...response.data,
        // Если в ответе сервера нет fanMode, используем значение по умолчанию
        fanMode: response.data.fanMode || 'AUTO',
      } as DevicesState['data'];
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    // можно добавить локальные редьюсеры при необходимости
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeviceStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeviceStatuses.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'Неизвестная ошибка';
        }
      });
  },
});

export default devicesSlice.reducer;