import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/Redux/store/store";

interface TemperatureData {
  date: string;
  floorTemp: number;
  basementTemp: number;
}

interface TemperatureState {
  data: TemperatureData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TemperatureState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchTemperatureData = createAsyncThunk(
  "temperature/fetchData",
  async () => {
    const response = await fetch("/db.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched temperature data:', data.temperature);
    return data.temperature || [];
  }
);

const temperatureSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemperatureData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemperatureData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log('Temperature data stored:', action.payload);
      })
      .addCase(fetchTemperatureData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch temperature data";
      });
  },
});

export const selectTemperatureData = (state: RootState) => state.temperature.data;
export const selectTemperatureStatus = (state: RootState) => state.temperature.status;

export default temperatureSlice.reducer;