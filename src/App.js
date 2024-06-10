import React, { useState } from 'react';
import GameOfLife from './GameOfLife';
import './App.css'; // Assuming the CSS file is named App.css

function App() {
  const [numRows, setNumRows] = useState(100);
  const [numCols, setNumCols] = useState(100);
  const [cellSize, setCellSize] = useState(5);
  const [running, setRunning] = useState(false);

  const handleChangeGridSize = (rows, cols) => {
    setRunning(false);
    setNumRows(rows);
    setNumCols(cols);
  };

  return (
    <div className="container">
      <div className="instructions">
        <h2>Conway's Game of Life Instructions</h2>
        <p>1. Click on the grid cells to toggle them between alive (green) and dead (gray).</p>
        <p>2. Press the "Start" button to begin the simulation.</p>
        <p>3. The cells will evolve according to the following rules:</p>
        <ul>
          <li>Any live cell with fewer than two live neighbors dies (underpopulation).</li>
          <li>Any live cell with two or three live neighbors lives on to the next generation (survival).</li>
          <li>Any live cell with more than three live neighbors dies (overpopulation).</li>
          <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction).</li>
        </ul>
        <p>4. Press the "Stop" button to halt the simulation.</p>
        <p>5. Press the "Clear" button to reset the grid to its initial state.</p>
        <p>6. Use the input fields below to set the grid size and cell size:</p>
        <div>
          <label>
            Rows:
            <input
              type="number"
              value={numRows}
              onChange={(e) => handleChangeGridSize(Number(e.target.value), numCols)}
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              value={numCols}
              onChange={(e) => handleChangeGridSize(numRows, Number(e.target.value))}
            />
          </label>
          <label>
            Cell Size:
            <input
              type="number"
              value={cellSize}
              onChange={(e) => setCellSize(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <GameOfLife numRows={numRows} numCols={numCols} cellSize={cellSize} running={running} setRunning={setRunning} />
    </div>
  );
}

export default App;
