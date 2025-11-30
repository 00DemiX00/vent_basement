import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface HumidityDatum {
  value: number;
  timestamp: string; // или другое поле, которое есть в данных
}

interface ChartState {
  humidityData: HumidityDatum[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}

interface DateRange {
  from: string;
  to: string;
}

const initialState: ChartState = {
  humidityData: [],
  status: 'idle',
  error: null,
};

// Thunk для загрузки данных графика, передать период в виде объекта: { from: '2024-06-01', to: '2024-06-30' }
export const fetchHumidityData = createAsyncThunk<HumidityDatum[], DateRange>(
  'chart/fetchHumidityData',
  async ({ from, to }) => {
    const response = await axios.get('http://localhost:3001/humidityData', {
      params: {
        startDate: from,
        endDate: to,
      },
    });
    return response.data;
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHumidityData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHumidityData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.humidityData = action.payload;
      })
      .addCase(fetchHumidityData.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default chartSlice.reducer;