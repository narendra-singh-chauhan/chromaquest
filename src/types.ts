export type Status = 'start' | 'stop';

export type numArr = number[];

export type Pattern = {
    rows: number;
    columns: number;
};

export type StatusMap = {
    START: Status,
    STOP: Status,
};

export type RL01Position = {
    start: number; 
    end: number; 
    direction: string;
};

export type LevelProps = {
    speed: number;
    status: Status;
    rows: number;
    columns: number;
    grids: numArr;
    onScoreChange: (newScore: string) => void;
};

export type LevelsWithPattern = {
    id: number;
    level: number;
    rows:number;
    columns: number;
};