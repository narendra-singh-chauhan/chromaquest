import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { LevelProps } from "../types";
import Tile from "../components/Tile";
import { COLORS } from "../constants";

// methods
const getRedGrids = (rows: number, columns: number, y:number): number[] => {
    const redGrids: number[] = [];

    for(let i = (columns * y) + 3; i <= columns * (rows - 2); i += columns * 8){
        for(let j = i; j < i + (columns - 4); j++){
            redGrids.push(j);
        };
    };

    return redGrids;
};

const Level04 = ({ speed, status, rows, columns, grids, onScoreChange }: LevelProps) => {
    const yRef = useRef(2);
    const [redGrids, setRedGrids] = useState<number[]>(getRedGrids(rows, columns, yRef.current));

    useEffect(() => {
        if (status !== 'start') return;

        const intervalId = setInterval(() => {
            setRedGrids(getRedGrids(rows, columns, yRef.current));
            if(yRef.current === 9){
                yRef.current = 2;
            } else {
                yRef.current += 1;
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
    const blueGrids = useMemo(() => {
        const newBlueGrids: number[] = [];

        while (newBlueGrids.length < ((columns / 2) + columns)) {
            const randomIndex = Math.floor(Math.random() * grids.length);
            if (!newBlueGrids.includes(randomIndex)) {
                newBlueGrids.push(randomIndex);
            }
        }

        return newBlueGrids;
    }, [grids, columns]);

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

export default Level04;