// src/components/TypingBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const TypingBox = () => {
  const { targetText, userInput, status } = useSelector((state) => state.typing);

  // Render a limited window of text to prevent DOM bloat
  const displayLength = 50; 
  const currentIdx = userInput.length;
  const startIdx = Math.max(0, currentIdx - 15);
  const endIdx = startIdx + displayLength;
  
  const visibleText = targetText.slice(startIdx, endIdx);
  const visibleInput = userInput.slice(startIdx, endIdx);

  if (status === 'completed') {
    return <div className="typing-box completed">Time is up! Review your final statistics.</div>;
  }

  return (
    <div className="typing-box">
      {visibleText.split('').map((char, index) => {
        let colorClass = 'untyped';
        if (index < visibleInput.length) {
          colorClass = visibleInput[index] === char ? 'correct' : 'incorrect';
        } else if (index === visibleInput.length) {
          colorClass = 'current-cursor';
        }
        return (
          <span key={index} className={`char ${colorClass}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TypingBox;