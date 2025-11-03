import { configureStore } from '@reduxjs/toolkit';
//import exampleReducer from './reducers/exampleReducer';

const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});

export default store;

// Типы типовизация состояния и dispatch (опционально)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;