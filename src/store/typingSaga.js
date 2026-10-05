// src/store/typingSaga.js
import { put, takeLatest, delay, select, call } from 'redux-saga/effects';
import { 
  fetchLessonRequest, fetchLessonSuccess, fetchLessonFailure, 
  startTimer, tick, resetTest 
} from './typingSlice';

// Simulated API Call for external resource access
const fetchNgramsFromAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
     const homeRowWords = ['asdf', 'jkl;', 'sad', 'fall', 'ask', 'dad', 'lad', 'salad', 'flask', 'alas', 'lass', 'fad'];
      let lesson = [];
      for(let i = 0; i < 50; i++) {
        lesson.push(homeRowWords[Math.floor(Math.random() * homeRowWords.length)]);
      }
      resolve(lesson.join(' '));
    }, 1000); // Simulate 1 second network latency
  });
};

function* fetchLessonWorker() {
  try {
    const data = yield call(fetchNgramsFromAPI);
    yield put(fetchLessonSuccess(data));
  } catch (error) {
    yield put(fetchLessonFailure());
  }
}

function* timerWorker() {
  while (true) {
    yield delay(1000); // Non-blocking wait for 1 second
    const status = yield select((state) => state.typing.status);
    
    if (status === 'active') {
      yield put(tick());
    } else if (status === 'completed') {
      break; // Terminate the generator
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchLessonRequest.type, fetchLessonWorker);
  yield takeLatest(startTimer.type, timerWorker);
}