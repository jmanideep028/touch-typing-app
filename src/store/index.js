// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import typingReducer from './typingSlice';
import rootSaga from './typingSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);