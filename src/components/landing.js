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
import BowlImage from '../Resources/bowl.jpeg'
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
            navigate('/camera');
        }
    };

    return (
        <Grid>
            <img src={BowlImage} style={{ paddingTop: '30%', width: '80%', paddingLeft: '10%' }} />
            <Grid sx={{ paddingTop: '10%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <FormLabel sx={{ fontSize: '1.5rem', paddingLeft: '2.5%', paddingTop: '10%' }}>Find what all you eat, with just a click </FormLabel>
            </Grid>
            <Grid sx={{ paddingLeft: '10%', width: '90%', paddingTop: '10%' }}>
                <Slide direction="right" in={!isUnlocked} mountOnEnter unmountOnExit>
                    <div
                        style={{
                            position: 'relative',
                            height: '7vh',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '2vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: -260 + currentX,
                                top: 0,
                                height: '100%',
                                width: '40vh',
                                backgroundColor: '#6c7381',
                                transition: 'left 0.3s ease-out',
                                borderRadius: '2vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingRight: '20px',
                            }}
                        >
                            <Typography variant="h6" color="white" style={{ fontWeight: 'bold' }}>
                                &#8594;
                            </Typography>
                        </div>
                        <Typography variant="h6" color="textPrimary">
                            {unlockText}
                        </Typography>
                    </div>
                </Slide>
            </Grid>
        </Grid>
    );
}

export default Landing;
