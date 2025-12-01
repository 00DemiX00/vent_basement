import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RawHumidityData {
  timestamp: string;
  humidity_basement: number;
  humidity_floor: number;
  fan1_status: string;
  fan2_status: string;
}

interface FormattedHumidityData {
  date: string;
  desktop: number;
  mobile: number;
  fan1: string;
  fan2: string;
}

interface HumidityState {
  data: FormattedHumidityData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Встроенная API-функция
const fetchHumidityFromAPI = async ({ from, to }: { from: string; to: string }): Promise<FormattedHumidityData[]> => {
  const response = await axios.get<RawHumidityData[]>('http://localhost:3001/humidity', {
    params: { from, to },
  });
  return response.data.map(item => ({
    date: item.timestamp,
    desktop: item.humidity_basement,
    mobile: item.humidity_floor,
    fan1: item.fan1_status,
    fan2: item.fan2_status
  }));
};

interface FetchHumidityPayload {
  from: string;
  to: string;
}

export const fetchHumidityData = createAsyncThunk<
  FormattedHumidityData[],  // тип возвращаемых данных
  FetchHumidityPayload
>(
  'humidity/fetchData',
  async ({ from, to }) => {
    const data = await fetchHumidityFromAPI({ from, to });
    return data;
  }
);

const initialState: HumidityState = {
  data: [],
  status: 'idle',
  error: null,
};

const humiditySlice = createSlice({
  name: 'humidity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHumidityData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHumidityData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHumidityData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка при загрузке данных';
      });
  },
});

export default humiditySlice.reducer;