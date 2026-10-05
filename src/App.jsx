// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonRequest, startTimer, registerKeystroke } from './store/typingSlice';
import TypingBox from './components/TypingBox';
import VisualKeyboard from './components/VisualKeyboard';
import StatsPanel from './components/StatsPanel';
// Assuming a placeholder image exists in the assets folder
import postureImg from './assets/hand-posture.png'; 

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.typing.status);

 useEffect(() => {
    // Dispatch async fetch on initial load
    dispatch(fetchLessonRequest());
  }, [dispatch]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey || e.key === 'Shift') return;
      
      if (status === 'idle') {
        dispatch(startTimer());
      }
      
      if (e.key === ' ') e.preventDefault(); // Prevent scrolling

      // Restrict input to exactly the 8 home row keys + space
      const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '];
      if (validKeys.includes(e.key.toLowerCase())) {
        dispatch(registerKeystroke(e.key.toLowerCase()));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, status]);

  return (
    <div className="app-container">
      <h1>Touch Typing Mastery: Home Row</h1>
      <div className="ergonomics-section">
        <img src={postureImg} alt="Proper ergonomic hand placement on the home row" className="ergonomic-img" onError={(e) => e.target.style.display='none'}/>
        <p className="instructions">Ensure wrists are hovering and index fingers rest on the textured <b>F</b> and <b>J</b> keys. Type to begin the 5-minute drill.</p>
      </div>
      
      {status === 'loading' ? (
        <p>Fetching lesson data asynchronously...</p>
      ) : (
        <>
          <StatsPanel />
          <TypingBox />
          <VisualKeyboard />
        </>
      )}
    </div>
  );
};

export default App;