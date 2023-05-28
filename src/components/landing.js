// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Slide, Typography } from '@mui/material';
import BowlImage from '../Resources/png-clipart-delicious-food-food-salad.png';
import FormLabel from '@mui/material/FormLabel';
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { useNavigate } from "react-router-dom";


function Landing() {
    const [unlockText, setUnlockText] = useState('Swipe to Explore');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const navigate = useNavigate();

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        const difference = event.touches[0].clientX - startX;
        if (difference >= 260) {
            setCurrentX(260);
            setUnlockText('Unlocked!');
        } else {
            setCurrentX(difference);
            setUnlockText('Welcome');
        }
    };

    const handleTouchEnd = () => {
        if (currentX < 260) {
            setCurrentX(0);
        } else {
            setIsUnlocked(true);

        }
    };
    const handleClick = () => {
        navigate('/camera');
    }

    return (
        <Grid>
            <img src={BowlImage} style={{ paddingTop: '20%', width: '80%', paddingLeft: '10%'}} />
            <Grid sx={{ paddingTop: '10%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <FormLabel sx={{ fontSize: '1.5rem', paddingLeft: '2.5%', paddingTop: '30%', fontWeight: "bold" }}>Find what all you eat, with just a click! </FormLabel>
            </Grid>
            <Grid item container justifyContent="center" sx={{ paddingTop: "6rem" }}>
                <Button variant="contained" size="large" onClick={handleClick} style={{ width: '60%', height: '100%', borderRadius: "40%" }}>
                    Let's start
                </Button>
            </Grid>
        </Grid>
    );
}

export default Landing;
