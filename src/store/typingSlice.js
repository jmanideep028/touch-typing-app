// src/store/typingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targetText: '',
  userInput: '',
  status: 'idle', // 'idle' | 'loading' | 'active' | 'completed' | 'error'
  timeLeft: 300, // 5 minutes constraint
  totalKeystrokes: 0,
  mistakes: 0,
  correctKeystrokes: 0,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    fetchLessonRequest: (state) => {
      state.status = 'loading';
    },
    fetchLessonSuccess: (state, action) => {
      state.targetText = action.payload;
      state.status = 'idle';
    },
    fetchLessonFailure: (state) => {
      state.status = 'error';
    },
    startTimer: (state) => {
      if (state.status === 'idle') {
        state.status = 'active';
      }
    },
    tick: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
      if (state.timeLeft === 0) {
        state.status = 'completed';
      }
    },
    registerKeystroke: (state, action) => {
      if (state.status !== 'active') return;
      
      const char = action.payload;
      const expectedChar = state.targetText[state.userInput.length];
      
      state.totalKeystrokes += 1;
      state.userInput += char;
      
      if (char === expectedChar) {
        state.correctKeystrokes += 1;
      } else {
        state.mistakes += 1;
      }

      if (state.userInput.length === state.targetText.length) {
          state.status = 'completed'; // End early if text is finished
      }
    },
    resetTest: (state) => {
      return { ...initialState, targetText: state.targetText };
    }
  }
});

export const { 
  fetchLessonRequest, fetchLessonSuccess, fetchLessonFailure, 
  startTimer, tick, registerKeystroke, resetTest 
} = typingSlice.actions;

export default typingSlice.reducer;