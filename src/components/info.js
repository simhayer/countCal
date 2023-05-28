import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const TargetPage = () => {
  // Use the detectionsMap in this component
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [rows, setRows] = useState([]);
  const [totalRow, setTotalRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to add a new row to the table
  const addRow = (name, calories, fat, carbs, protein) => {
    const newRow = createData(name, calories, fat, carbs, protein);
    setRows(prevRows => [...prevRows, newRow]);
  };

  const getTotalValues = () => {
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      totalCalories += row.calories;
      totalFat += row.fat;
      totalCarbs += row.carbs;
      totalProtein += row.protein;
    }

    return createData('Total', totalCalories, totalFat, totalCarbs, totalProtein);
  };

  const detectionsMap = useLocation();
  const hashMap = detectionsMap.state.name
  const keys = Array.from(new Set(hashMap.keys()));
  const imgTest = detectionsMap.state.img
  const addTotalRow = () => {
    const totalRow = getTotalValues();
    console.log(totalRow);
    setTotalRow(getTotalValues());
  };

  useEffect(() => {
    const addRowByKey = (key) => {
      if (foodData.hasOwnProperty(key)) {
        const food = foodData[key];
        addRow(key, food.calories, food.fat, food.carbs, food.protein);
      }
    };

    keys.forEach(key => {
      if (!rows.some(row => row.name === key)) {
        addRowByKey(key);
      }
    });

    if (rows.some(row => row.name !== 'Total')) {
      addTotalRow();
    }
  }, [keys, rows, addRow, addTotalRow]);
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
    },
    sandwich: {
      calories: 300,
      fat: 10,
      carbs: 45,
      protein: 15
    }
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const pieChartData = {
    labels: ['Protein', 'Calories', 'Fat', 'Carbs'],
    datasets: [
      {
        data: [
          totalRow ? totalRow.protein : 0,
          totalRow ? totalRow.calories : 0,
          totalRow ? totalRow.fat : 0,
          totalRow ? totalRow.carbs : 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}`;
            }
          }
        }
      },
    },
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>

      <Grid sx={{ paddingY: '5%' }}>
        <img src={imgTest} alt='' width={window.innerWidth} />
      </Grid>

      <Grid sx={{ paddingY: '2%' }}>
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food Items</TableCell>
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
      </Grid>
      <div>
        <Pie data={pieChartData} />
      </div>
      {/* Plus button and pop-up */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'blue',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={openPopup}
      >
        +
      </div>
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Pop-up content */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3>Meal Check!</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                required
                style={{ padding: '5px' }}
              />

              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </form>
            {/* Add your input fields and submit button here */}
            {/* <button onClick={closePopup}>Close</button> */}
            <button
              onClick={closePopup}
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetPage;