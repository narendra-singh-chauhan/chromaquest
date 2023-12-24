// types
type ScoreProps = {
    totalRedTouches: number;
    totalBlueTouches: number;
    totalScore: number;
};

const Score = ({ totalScore, totalRedTouches, totalBlueTouches }: ScoreProps) => {
    return (
        <div className="score-board">
            <div className="score">
                <h6>Score: <span>{totalScore}</span></h6>
            </div>
            <div className="score">
                <h6>Red: <span>{totalRedTouches}</span></h6>
            </div>
            <div className="score">
                <h6>Blue: <span>{totalBlueTouches}</span></h6>
            </div>
            <div className="score">
                <h6>Chance: <span>{4 - totalRedTouches}</span></h6>
            </div>
        </div>
    )
};

export default Score;
