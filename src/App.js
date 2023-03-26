import React from 'react'
import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';
import { SaveCanvas } from './SaveCanvas';
import DropDownText from './DropDownText';

function App() {
  return (
    <>
      <DropDownText/>
      <Canvas/>
      <ClearCanvasButton/>
      <SaveCanvas/>
    </>
  );
}

export default App;