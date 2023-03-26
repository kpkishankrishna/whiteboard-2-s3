import React, { useContext, useRef, useState } from "react";
import { text } from './DropDownText';

const CanvasContext = React.createContext();

var cordinates = "start \n"

const S3_BUCKET ='whiteboard-2';
const REGION =' ap-south-1';
const ACCESS_KEY ='AKIAX5UZSDZVJOBBZGSP';
const SECRET_ACCESS_KEY ="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";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}


export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    console.log("Start")
    console.log(offsetX, offsetY)
    cordinates = cordinates + offsetX + ", "+ offsetY + "\n"
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    console.log("Done")
    cordinates = cordinates + "done\n"
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    console.log(offsetX, offsetY)
    cordinates = cordinates + offsetX + ", "+ offsetY + "\n"
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    cordinates = "start \n"
  }

  const saveCanvas = () => {
    console.log(text)
    if (text != 'none') {
      // const element = document.createElement("a");
      // const file = new Blob([cordinates], {type: 'text/plain'});
      // element.href = URL.createObjectURL(file);
      // element.download = "myFile.txt";
      // document.body.appendChild(element); // Required for this to work in FireFox
      // element.click();
      fetch('https://pgdf29kgxb.execute-api.ap-south-1.amazonaws.com/whiteboard-2-s3', {  // Enter your IP address here

        method: 'POST', 
        mode: 'cors',
        body: JSON.stringify({'text':text, 'cordinates':cordinates}) // body data type must match "Content-Type" header

      })
    }  
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        saveCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);