import React from 'react'
import { useCanvas } from './CanvasContext'

export const SaveCanvas = () => {
  const { saveCanvas } = useCanvas()

  return <button onClick={saveCanvas}>Save</button>
}