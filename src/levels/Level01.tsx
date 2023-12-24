import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { RL01Position, LevelProps } from "../types";
import Tile from "../components/Tile";
import { rl01InitPositoin } from "../constants";

// methods
const getRedGrids = (grids: number[], cols: number, start: number, end: number) => {
    const columnNumbers = [];

    for (let i = start; i < grids.length; i += cols) {
        for (let j = 0; j <= end - start; j++) {
            columnNumbers.push(grids[i + j]);
        }
    }

    return columnNumbers;
};

const Level01 = ({ speed, status, columns, grids, onScoreChange }: LevelProps) => {
    const redPosition = useRef<RL01Position>(rl01InitPositoin);
    const [redGrids, setRedGrids] = useState<number[]>(getRedGrids(grids, columns, redPosition.current.start, redPosition.current.end));

    useEffect(() => {
        if (status !== 'start') return;

        const intervalId = setInterval(() => {
            const { start, end, direction } = redPosition.current;

            if (direction === 'backward' && start === 2) {
                redPosition.current.direction = 'forward';
                redPosition.current.start = 4;
                redPosition.current.end = 5;
            } else {
                if (direction === 'forward') {
                    redPosition.current.start = (start + 2) % columns;
                    redPosition.current.end = (end + 2) % columns;
                } else {
                    redPosition.current.start = start - 2;
                    redPosition.current.end = end - 2;
                }
            }

            if (redPosition.current.start === 0 && redPosition.current.end === 1) {
                redPosition.current.start = 2;
                redPosition.current.end = 3;
            }

            const updatedRedGrids = getRedGrids(grids, columns, redPosition.current.start, redPosition.current.end);
            setRedGrids(updatedRedGrids);

            if (redPosition.current.end === (columns - 1)) {
                if (direction === 'forward') {
                    redPosition.current.direction = 'backward';
                } else {
                    redPosition.current.direction = 'forward';
                }
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, grids, status]);

    // yellow grids
    const yellowGrids = useMemo(() => {
        const newYellowGrids: number[] = [];

        for (let i = 0; i < grids.length; i++) {
            if (i % columns === 0) {
                newYellowGrids.push(grids[i]);
                newYellowGrids.push(grids[i + 1]);
            }
        }

        return newYellowGrids;
    }, [grids, columns]);

    // blue grids
    const blueGrids = useMemo(() => {
        const newBlueGrids: number[] = [];

        while (newBlueGrids.length < ((columns / 2) + columns)) {
            const randomIndex = Math.floor(Math.random() * grids.length);
            if (!newBlueGrids.includes(randomIndex)) {
                newBlueGrids.push(randomIndex);
            }
        }

        return newBlueGrids.map(index => grids[index]);
    }, [grids, columns]);

    // tiles
    const tiles = grids.map(grid => {
        const color = redGrids.includes(grid) ? 'red' : yellowGrids.includes(grid) ? 'yellow' : blueGrids.includes(grid) ? 'blue' : 'transparent';

        return (
            <Tile
                key={grid}
                backgroundColor={color}
                onClick={() => onScoreChange(color)}
            />  
        )
    });

    return tiles;
};

export default Level01;