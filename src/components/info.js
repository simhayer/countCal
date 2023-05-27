import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TargetPage = () => {
    // Use the detectionsMap in this component

    const detectionsMap = useLocation();
    const hashMap = detectionsMap.state.name
    const keys = Array.from(hashMap.keys());
    console.log(keys);
    const imgTest = detectionsMap.state.img
    console.log(imgTest);
    //const {prop1} = detectionsMap.state.name;
    const foodData = {
        apple: {
            calories: 52,
            fat: 0.2,
            carbs: 14,
            protein: 0.3
        },
        banana: {
            calories: 96,
            fat: 0.4,
            carbs: 25,
            protein: 1.2
        },
        burger: {
            calories: 250,
            fat: 12,
            carbs: 25,
            protein: 13
        },
        pizza: {
            calories: 285,
            fat: 10,
            carbs: 36,
            protein: 12
        },
        water: {
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        wine: {
            calories: 83,
            fat: 0,
            carbs: 2.6,
            protein: 0.1
        }
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
  return (
    <div>

    <div>
    <img src={imgTest} alt = '' width={window.innerWidth}/> 
    </div>

    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default TargetPage;