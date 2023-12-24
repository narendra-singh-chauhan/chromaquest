const generateGrids = (rows: number, columns: number) => {
    const grids = [];
    for(let i = 1; i <=  rows * columns; i++){
        grids.push(i);
    };

    return grids;
};

export default generateGrids;