import React, { useState } from 'react';
import Button from '@mui/material/Button';

const MultiButton = (num, handleClick) => {
  let output = [];
  for (let i = 1; i <= num; ++i) {
    output.push(
      <Button
        key={i}
        variant="contained"
        color="primary"
        onClick={() => handleClick(i)}
        style={{ margin: '5px' }}
      >
        第{i}個按鍵
      </Button>
    );
  }
  return output;
};

function App() {
  const [text, setText] = useState('');

  const changeText = (i) => {
    setText(`hello CGU!!`);
    console.log(`第${i}個按鍵被按下`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: 'red', fontSize: '4rem' }}>{text}</h1>
      <div>{MultiButton(10, changeText)}</div>
    </div>
  );
}

export default App;
