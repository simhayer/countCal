import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as cocossd from "@tensorflow-models/coco-ssd"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

function Camera() {
  const webcamRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const navigate = useNavigate();
  const [pass, setPass] = useState(null);

  

  var detectionsMap = new Map();
  var objLengthTotal = 0;
  var objCount = 0;
  var avgItems = 0;

  //Main function
  const runCoco = async () => {

    objLengthTotal = 0;
    objCount = 0
    detectionsMap.clear();
    const net = await cocossd.load();

    const detectionInterval = setInterval(() => {
      detect(net);

    }, 10);

    // Stop the detection after 8 seconds
    setTimeout(() => {
      clearInterval(detectionInterval);
      const detectionsMapSort = new Map([...detectionsMap.entries()].sort((a, b) => b[1] - a[1]))
      console.log(detectionsMapSort);
      avgItems = objLengthTotal / objCount;
      console.log(objLengthTotal + " -- " + objCount);
      console.log(avgItems);
      const imageSrc = webcamRef.current.getScreenshot();

      navigate('/target', { state: { name: detectionsMapSort, img: imageSrc } });
    }, 5000);

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

      const obj = await net.detect(video);

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

      objCount++;

    }
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
          border: "2px solid #ccc",
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
