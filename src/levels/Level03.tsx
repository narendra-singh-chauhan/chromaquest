import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { LevelProps } from "../types";
import Tile from "../components/Tile";
import { COLORS } from "../constants";

// methods
const getFixedRedGrids = (columns: number, rows: number): number[] => {
    const fixedRedGrids = [];

    for (let i = (columns * 4) + 5; i <= ((rows - 5) * columns) + 5; i += columns) {
        for (let j = i; j <= i + (columns - 9); j++) {
            fixedRedGrids.push(j);
        };
    };

    return fixedRedGrids;
};

const getRedGrids = (x: number, y: number, grids: number[], columns: number): number[] => {
    const redPattern: number[] = [];
    const redPatternWidth = 2;
    const redPatternHeight = 2;

    for (let i = y; i < y + redPatternHeight; i++) {
        for (let j = x; j < x + redPatternWidth; j++) {
            const gridIndex = i * columns + j;
            redPattern.push(grids[gridIndex]);
        }
    }

    return redPattern;
};


const Level03 = ({ speed, status, rows, columns, grids, onScoreChange }: LevelProps) => {
    const xRef = useRef(2);
    const yRef = useRef(2);
    const dxRef = useRef(1);
    const dyRef = useRef(0);
    const fixedRedGrids = getFixedRedGrids(columns, rows);
    const updatedRedGrids = getRedGrids(xRef.current, yRef.current, grids, columns);
    const [redGrids, setRedGrids] = useState<number[]>([...updatedRedGrids, ...fixedRedGrids]);

    // red grids
    useEffect(() => {
        if (status !== 'start') return;

        const intervalId = setInterval(() => {
            const updatedRedGrids = getRedGrids(xRef.current, yRef.current, grids, columns);
            setRedGrids([...updatedRedGrids, ...fixedRedGrids]);

            switch (true) {
                case xRef.current === 2 && yRef.current === 2:
                    // Move right
                    dxRef.current = 1;
                    dyRef.current = 0;
                    break;
                case xRef.current === columns - 4 && yRef.current === 2:
                    // Move down
                    dxRef.current = 0;
                    dyRef.current = 1;
                    break;
                case xRef.current === columns - 4 && yRef.current === rows - 4:
                    // Move left
                    dxRef.current = -1;
                    dyRef.current = 0;
                    break;
                case xRef.current === 2 && yRef.current === rows - 4:
                    // Move up
                    dxRef.current = 0;
                    dyRef.current = -1;
                    break;
            }

            xRef.current += dxRef.current;
            yRef.current += dyRef.current;

        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, grids, rows, columns, status]);


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
        const blueGrids = [];

        for(let i = (columns * 3) + 6; i <= (columns * 4) - 5; i+= 3){
            blueGrids.push(i);
        };

        for(let i = ((rows - 4) * columns) + 4; i <= ((rows - 3) * columns) - 4; i += 3){
            blueGrids.push(i);
        };

        for (let i = (columns * 3) + 4; i <= ((rows - 4) * columns) + 4; i += (columns * 3)) {
            blueGrids.push(i);
            blueGrids.push(i + (columns - 7));
        };

        return blueGrids;
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

export default Level03;