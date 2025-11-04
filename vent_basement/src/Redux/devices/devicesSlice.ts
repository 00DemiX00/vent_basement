import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  },
  loading: false,
  error: null,
};

// AsyncThunk для получения данных с сервера
export const fetchDeviceStatuses = createAsyncThunk(
  'devices/fetchStatuses',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://my.api.endpoint/devices/statuses');
      // предположим, что ответ имеет структуру:
      // { esp32: 'online', sensor1: 'working', sensor2: 'error', fan1: 'on', fan2: 'off' }
      return response.data as DevicesState['data'];
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