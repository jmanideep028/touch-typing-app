// src/components/VisualKeyboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const VisualKeyboard = () => {
  const { targetText, userInput } = useSelector((state) => state.typing);
  const nextChar = targetText[userInput.length]?.toLowerCase() || '';

  const keyboardRows = [
    ['a', 's', 'd', 'f','j', 'k', 'l', ';'],
  ];

  return (
    <div className="visual-keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const isTarget = key === nextChar;
            const isHomeRow = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(key);
            let classes = 'key';
            if (isTarget) classes += ' highlight';
            if (isHomeRow) classes += ' home-row';
            
            return (
              <div key={key} className={classes}>
                {key.toUpperCase()}
                {(key === 'f' || key === 'j') && <div className="bump"></div>}
              </div>
            );
          })}
        </div>
      ))}
      <div className="keyboard-row">
        <div className={`key spacebar ${nextChar === ' ' ? 'highlight' : ''}`}>SPACE</div>
      </div>
    </div>
  );
};

export default VisualKeyboard;