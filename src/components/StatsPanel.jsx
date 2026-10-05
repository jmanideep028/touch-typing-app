// src/components/StatsPanel.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetTest } from '../store/typingSlice';

const StatsPanel = () => {
  const dispatch = useDispatch();
  const { timeLeft, totalKeystrokes, mistakes, correctKeystrokes } = useSelector((state) => state.typing);

  const timeElapsedInMinutes = (300 - timeLeft) / 60;
  
  let netWPM = 0;
  let accuracy = 100;

  if (timeElapsedInMinutes > 0) {
    const grossWPM = (totalKeystrokes / 5) / timeElapsedInMinutes;
    netWPM = Math.round(grossWPM - (mistakes / timeElapsedInMinutes));
    netWPM = netWPM < 0 ? 0 : netWPM; 
    
    if (totalKeystrokes > 0) {
      accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="stats-panel">
      <div className="stat-box">Time: <span>{formatTime(timeLeft)}</span></div>
      <div className="stat-box">Keys Pressed: <span>{totalKeystrokes}</span></div>
      <div className="stat-box">Net WPM: <span>{netWPM}</span></div>
      <div className="stat-box">Accuracy: <span>{accuracy}%</span></div>
      <button onClick={() => dispatch(resetTest())} className="reset-btn">Restart</button>
    </div>
  );
};

export default StatsPanel;