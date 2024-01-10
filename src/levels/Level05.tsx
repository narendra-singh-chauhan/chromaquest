import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { LevelProps, RL01Position } from "../types";
import Tile from "../components/Tile";
import { COLORS, tb01InitPositoin } from "../constants";

// methods
const getRedGrids = (columns: number, y: number): number[] => {
    const redGrids: number[] = [];

    for (let i = (columns * y) + 3; i <= (columns * (y + 1)) - 2; i++) {
        redGrids.push(i);
    };

    for (let i = (columns * (y + 1)) + 3; i <= (columns * (y + 2)) - 2; i++) {
        redGrids.push(i);
    };

    return redGrids;
};

const Level05 = ({ speed, status, rows, columns, grids, onScoreChange }: LevelProps) => {
    const redPosition = useRef<RL01Position>(tb01InitPositoin);
    const [redGrids, setRedGrids] = useState<number[]>(getRedGrids(columns, 2));

    useEffect(() => {
        if (status !== 'start') return;

        const intervalId = setInterval(() => {
            const { start, direction } = redPosition.current;

            const updatedRedGrids = getRedGrids(columns, start);
            setRedGrids(updatedRedGrids);

            if (direction === 'backward') {
                redPosition.current.start -= 1;
                if (start === 3) {
                    redPosition.current.direction = 'forward';
                }
            } else {
                redPosition.current.start += 1;
                if (start === rows - 5) {
                    redPosition.current.direction = 'backward';
                }
            }

        }, speed);

        return () => clearInterval(intervalId);
    }, [rows, columns, speed, status]);


    // yellow grids
    const yellowGrids = useMemo(() => {
        const greenGrids = [];

        greenGrids.push(1);
        greenGrids.push(2);
        greenGrids.push(rows * columns - 1);
        greenGrids.push(rows * columns);

        for (let i = columns; i <= columns * (rows - 1); i += columns) {
            greenGrids.push(i - 1);
            greenGrids.push(i);
            greenGrids.push(i + 1)
            greenGrids.push(i + 2);
        };

        for (let i = 3; i <= columns - 2; i++) {
            greenGrids.push(i);
        };

        for (let i = columns + 3; i <= (columns * 2) - 2; i++) {
            greenGrids.push(i);
        };

        for (let i = (columns * (rows - 2)) + 3; i <= (columns * (rows - 1)) - 2; i++) {
            greenGrids.push(i);
        };

        for (let i = (columns * (rows - 1)) + 3; i <= (columns * rows) - 2; i++) {
            greenGrids.push(i);
        };

        return greenGrids;
    }, [rows, columns]);

    // blue grids
    // const blueGrids = useMemo(() => {
    //     const newBlueGrids: number[] = [];
    
    //     // Calculate the index positions for the X pattern within the bordered grid
    //     const shorterSide = Math.min(rows, columns);
    //     const midRow = Math.floor(rows / 2);
    //     const midColumn = Math.floor(columns / 2);
    
    //     for (let i = 0; i < shorterSide; i++) {
    //         const topLeftIndex = i * columns + i;
    //         const topRightIndex = i * columns + (columns - i - 1);
    
    //         newBlueGrids.push(grids[topLeftIndex]); // Marking diagonal from top-left to bottom-right within the border
    //         newBlueGrids.push(grids[topRightIndex]); // Marking diagonal from top-right to bottom-left within the border
    
    //         if (rows > columns) {
    //             const bottomLeftIndex = (rows - i - 1) * columns + i;
    //             const bottomRightIndex = (rows - i - 1) * columns + (columns - i - 1);
    
    //             newBlueGrids.push(grids[bottomLeftIndex]); // Marking diagonal from bottom-left to top-right within the border
    //             newBlueGrids.push(grids[bottomRightIndex]); // Marking diagonal from bottom-right to top-left within the border
    //         }
    //     }
    
    //     if (rows < columns) {
    //         const midRowIndex = midRow * columns + midColumn;
    //         newBlueGrids.push(grids[midRowIndex]); // Marking the center point for rows < columns
    //     }
    
    //     return newBlueGrids;
    // }, [grids, columns, rows]);

    const blueGrids = useMemo(() => {
        const newBlueGrids: number[] = [];
    
        // Calculate the index positions for the X pattern within the bordered grid
        const shorterSide = Math.min(rows, columns);
        const mid = Math.floor(shorterSide / 2);
    
        // Create the initial X pattern
        for (let i = 0; i < shorterSide; i++) {
            const topLeftIndex = i * columns + i;
            const topRightIndex = i * columns + (columns - i - 1);
    
            newBlueGrids.push(grids[topLeftIndex]); // Marking diagonal from top-left to bottom-right within the border
            newBlueGrids.push(grids[topRightIndex]); // Marking diagonal from top-right to bottom-left within the border
    
            if (shorterSide % 2 !== 0 && i === mid) {
                const midIndex = mid * columns + mid;
                newBlueGrids.push(grids[midIndex]); // Marking the center point for odd-sized grids
            }
        }
    
        // Repeat X pattern in the empty space below
        if (rows > columns) {
            const repeatXPatternRows = rows - shorterSide;
    
            for (let i = 0; i < repeatXPatternRows; i++) {
                for (let j = 0; j < columns; j++) {
                    if (j === i || j === columns - 1 - i) {
                        const repeatIndex = shorterSide * columns + i * columns + j;
                        newBlueGrids.push(grids[repeatIndex]); // Repeating the X pattern in the empty space below
                    } else {
                        newBlueGrids.push(0); // Fill other tiles with default color (0)
                    }
                }
            }
        }
    
        return newBlueGrids;
    }, [grids, columns, rows]);

    // tiles
    const tiles = grids.map(grid => {
        const color = redGrids.includes(grid) ? COLORS.R : yellowGrids.includes(grid) ? COLORS.G : blueGrids.includes(grid) ? COLORS.B : COLORS.T;

        return (
            <Tile
                key={grid}
                backgroundColor={color}
                onClick={() => onScoreChange(color)}
            />
        );
    });

    return tiles;
};

export default Level05;