import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { LevelProps } from "../types";
import Tile from "../components/Tile";
import { COLORS } from "../constants";

// methods
const getRedGrids = (x: number, y: number, grids: number[], columns: number): number[] => {
    const redPattern: number[] = [];
    const redPatternWidth = 4;
    const redPatternHeight = 4;

    for (let i = y; i < y + redPatternHeight; i++) {
        for (let j = x; j < x + redPatternWidth; j++) {
            const gridIndex = i * columns + j;
            redPattern.push(grids[gridIndex]);
        }
    }

    return redPattern;
};

const Level02 = ({ speed, status, rows, columns, grids, onScoreChange }: LevelProps) => {
    const xRef = useRef(0);
    const yRef = useRef(0);
    const dxRef = useRef(1);
    const dyRef = useRef(0);
    const [redGrids, setRedGrids] = useState<number[]>(getRedGrids(xRef.current, yRef.current, grids, columns));

    // red grids
    useEffect(() => {
        if (status !== 'start') return;

        const intervalId = setInterval(() => {
            const updatedRedGrids = getRedGrids(xRef.current, yRef.current, grids, columns);
            setRedGrids(updatedRedGrids);

            switch (true) {
                case xRef.current === 0 && yRef.current === 0:
                    // Move right
                    dxRef.current = 1;
                    dyRef.current = 0;
                    break;
                case xRef.current === columns - 4 && yRef.current === 0:
                    // Move down
                    dxRef.current = 0;
                    dyRef.current = 1;
                    break;
                case xRef.current === columns - 4 && yRef.current === rows - 4:
                    // Move left
                    dxRef.current = -1;
                    dyRef.current = 0;
                    break;
                case xRef.current === 0 && yRef.current === rows - 4:
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
        const centerRow = Math.floor(rows / 2);
        const centerColumn = Math.floor(columns / 2);

        const yellowGrids = [
            (centerRow - 1) * columns + centerColumn,
            (centerRow - 1) * columns + centerColumn + 1,
            centerRow * columns + centerColumn,
            centerRow * columns + centerColumn + 1,
        ];

        return yellowGrids;
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
        const color = redGrids.includes(grid) ? COLORS.R : yellowGrids.includes(grid) ? COLORS.G : blueGrids.includes(grid) ? COLORS.B: COLORS.T;

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

export default Level02;