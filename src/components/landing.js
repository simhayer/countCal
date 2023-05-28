import React, { useRef, useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BowlImage from '../Resources/png-clipart-delicious-food-food-salad.png';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";


function Landing() {
    const navigate = useNavigate();

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
