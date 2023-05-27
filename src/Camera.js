// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
//import "./App.css";
import * as cocossd from "@tensorflow-models/coco-ssd"
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  //const [imgSrc, setImgSrc] = useState(null); // initialize it
  const [detections, setDetections] = useState([]);
  const navigate = useNavigate();
  const [pass, setPass] = useState(null);


  var detectionsMap = new Map();
  var objLengthTotal = 0;
  var objCount = 0;
  var avgItems = 0;

  //Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    objLengthTotal = 0;
    objCount = 0
    detectionsMap.clear();
    const net = await cocossd.load();

    //  Loop and detect hands
    const detectionInterval = setInterval(() => {
      detect(net);

    }, 10);

    // Stop the detection after 5 seconds
    setTimeout(() => {
      clearInterval(detectionInterval);
      const detectionsMapSort = new Map([...detectionsMap.entries()].sort((a, b) => b[1] - a[1]))
      console.log(detectionsMapSort);
      avgItems = objLengthTotal / objCount;
      console.log(objLengthTotal + " -- " + objCount);
      console.log(avgItems);
      const imageSrc = webcamRef.current.getScreenshot();
     // setImgSrc(imageSrc);
    //  console.log(imageSrc);
      navigate('/target', { state: { name: detectionsMapSort, img: imageSrc } });
    }, 8000);

    //console.log(detectionsMap);


  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // // Set canvas height and width
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const obj = await net.detect(video);
      //setDetections((prevDetections) => [...prevDetections, ...obj]);
      console.log(obj);
      for (let i = 0; i < obj.length; i++) {
        if (detectionsMap.has(obj[i].class)) {
          detectionsMap.set(obj[i].class, detectionsMap.get(obj[i].class) + 1);
        }
        else {
          detectionsMap.set(obj[i].class, 1);
        }
        objLengthTotal++;
      }
      //objLengthTotal = objLengthTotal + obj.length;
      //objCount = objCount + 1;
      objCount++;

      // Draw mesh
      //const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
    }
  };

  //useEffect(() => { runCoco() }, []);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  return (
    <div className="App" style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "2px solid #ccc",
     
      zIndex: 1
    }} >

      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: window.innerWidth,
          height: window.innerHeight,
          border: "2px solid #ccc"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          height: "55px",

          zIndex: 2
        }}
      >
        {/* <button
          onClick={runCoco}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            fontSize: "1.2em"
          }}
        >
          check cal
        </button> */}
        <Button
          variant="contained"
          endIcon={<EmojiFoodBeverageIcon />}
          style={{ width: '60%', height: '100%', borderRadius: "40%" }}
          onClick={runCoco} >
          Count Cal
        </Button>
      </div>

    </div>
  );
}

export default Camera;
