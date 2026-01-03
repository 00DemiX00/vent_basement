import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для режимов работы вентиляторов
export type FanMode = 'AUTO' | 'MANUAL';

// Состояние слайса режима вентиляторов
interface FanModeState {
  fan1Mode: FanMode; // Режим первого вентилятора
  fan2Mode: FanMode; // Режим второго вентилятора
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: FanModeState = {
  fan1Mode: 'AUTO', // По умолчанию автоматический режим
  fan2Mode: 'AUTO', // По умолчанию автоматический режим
  loading: false,
  error: null,
};

// Асинхронное действие для обновления режима на сервере
export const updateFanMode = createAsyncThunk(
  'fanMode/update',
  async ({ fanNumber, mode }: { fanNumber: number; mode: FanMode }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/update-fan-mode', {
        fan: fanNumber,
        mode,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Ошибка обновления режима');
    }
  }
);

// Создание слайса для управления режимами вентиляторов
const fanModeSlice = createSlice({
  name: 'fanMode',
  initialState,
  reducers: {
    // Синхронные редьюсеры для установки режима
    setFan1Mode(state, action: PayloadAction<FanMode>) {
      state.fan1Mode = action.payload;
    },
    setFan2Mode(state, action: PayloadAction<FanMode>) {
      state.fan2Mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFanMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFanMode.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.fan === 1) {
          state.fan1Mode = action.payload.mode;
        } else if (action.payload.fan === 2) {
          state.fan2Mode = action.payload.mode;
        }
      })
      .addCase(updateFanMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт действий и редьюсера
export const { setFan1Mode, setFan2Mode } = fanModeSlice.actions;
export default fanModeSlice.reducer;