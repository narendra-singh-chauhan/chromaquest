import { useEffect, useState } from "react";
import Tile from "../components/Tile";
import { LevelProps } from "../types";

const getNeighbors = (grids: number[], target: number, rows: number, columns: number, layer: number) => {
  // Find the index of the target number
  const targetIndex = grids.indexOf(target);

  if (targetIndex === -1) {
    console.log("Target number not found in the array.");
    return [];
  }

  // Calculate the row and column of the target number
  const targetRow = Math.floor(targetIndex / columns);
  const targetCol = targetIndex % columns;

  const layerValues = [];

  // Iterate over the square layer
  for (let row = targetRow - layer; row <= targetRow + layer; row++) {
    for (let col = targetCol - layer; col <= targetCol + layer; col++) {
      if (row >= 0 && row < rows && col >= 0 && col < columns) {
        const index = row * columns + col;
        layerValues.push(grids[index]);
      }
    }
  }

  return layerValues;
};


const Waves = ({
  speed,
  status,
  columns,
  rows, // Added rows as a prop
  grids,
}: LevelProps) => {
  const [layersGridsWithColors, setLayersGridsWithColors] = useState<string[]>(new Array(grids.length).fill('rgba(255, 0, 0, 0.0)'));

  useEffect(() => {
    if (status !== "start") return;

    let layer = 1;
    let waves: number[] = [];

    let interval: number | undefined;

    interval = setInterval(() => {
      const targetNumber = 98;
      const neighbors = getNeighbors(grids, targetNumber, rows, columns, layer);

      console.log('waving...');

      const filteredNeighbors = neighbors.filter(neighbor => !waves.includes(neighbor));
      let colors = new Array(grids.length).fill('rgba(255, 0, 0, 0.0)');

      setLayersGridsWithColors((prevLayersGridsWithColors) => {
        const allItemsAreZero = prevLayersGridsWithColors.every(item => item === 'rgba(255, 0, 0, 0.0)');

        if (allItemsAreZero && neighbors.length === rows * columns) {
          clearInterval(interval);
        }

        const newLayersGridsWithColors = [...prevLayersGridsWithColors];

        for (let i = 0; i < newLayersGridsWithColors.length; i++) {
          const item = newLayersGridsWithColors[i];

          if (item?.includes('1')) {
            colors[i] = 'rgba(255, 0, 0, 0.8)';
          }

          if (item?.includes('0.8')) {
            colors[i] = 'rgba(255, 0, 0, 0.6)';
          }

          if (item?.includes('0.6')) {
            colors[i] = 'rgba(255, 0, 0, 0.4)';
          }

          if (item?.includes('0.4')) {
            colors[i] = 'rgba(255, 0, 0, 0.2)';
          }

          if (item?.includes('0.2')) {
            colors[i] = 'rgba(255, 0, 0, 0.0)';
          }
        }

        for (let i = 0; i < filteredNeighbors.length; i++) {
          const item = filteredNeighbors[i];
          colors[item - 1] = 'rgba(255, 0, 0, 1)';
        }

        waves = waves.concat(filteredNeighbors);

        return colors;
      });

      layer++;
    }, speed);

    return () => clearInterval(interval);
  }, [speed, status, columns, rows]);


  const tiles = layersGridsWithColors.map((layersGridsWithColor, index) => {
    return (
      <Tile
        key={index}
        backgroundColor={layersGridsWithColor}
        onClick={() => { }}
      />
    );
  });

  return tiles;
};

export default Waves;