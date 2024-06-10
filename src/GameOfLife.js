import React, { useState, useCallback, useRef, useEffect } from 'react';
import './GameOfLife.css';

const operations = [
  [0, 1], // Right neighbor
  [0, -1], // Left neighbor
  [1, 0], // Bottom neighbor
  [-1, 0], // Top neighbor
  [1, 1], // Bottom-right neighbor
  [-1, -1], // Top-left neighbor
  [1, -1], // Bottom-left neighbor
  [-1, 1] // Top-right neighbor
];

const generateEmptyGrid = (numRows, numCols, randomize = false) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(
      Array.from(Array(numCols), () => (randomize && Math.random() > 0.8 ? 1 : 0))
    );
  }
  return rows;
};

const GameOfLife = ({ numRows, numCols, cellSize, running, setRunning }) => {
  const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols, true));
  const runningRef = useRef(running);
  runningRef.current = running;

  useEffect(() => {
    setGrid(generateEmptyGrid(numRows, numCols, true));
  }, [numRows, numCols]);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;

          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0; // Cell dies due to underpopulation or overpopulation
          } else if (cell === 0 && neighbors === 3) {
            return 1; // Cell becomes alive due to reproduction
          } else {
            return cell; // Cell state remains unchanged
          }
        })
      );
    });

    setTimeout(runSimulation, 100);
  }, [numRows, numCols]);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          } else {
            runningRef.current = false;
          }
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid(numRows, numCols, true));
          setRunning(false);
        }}
      >
        Clear
      </button>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = grid.slice();
                newGrid[i][j] = grid[i][j] ? 0 : 1;
                setGrid(newGrid);
              }}
              className={`grid-cell ${grid[i][j] ? 'alive' : 'dead'}`}
              style={{
                width: cellSize,
                height: cellSize
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default GameOfLife;
