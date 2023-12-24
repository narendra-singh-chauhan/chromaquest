// imports
import { levels } from "../constants";

// types
type LevelsProps = {
    selectedLevel: number;
    onLevelChange: (e: any) => void;
};

const Levels = ({selectedLevel, onLevelChange }: LevelsProps) => {
    return (
        <div className="levels sec">
            <div className="sec-heading">
                Levels
            </div>
            <select name="levels" id="levels" value={selectedLevel} onChange={onLevelChange}>
                {levels.map(level => (
                    <option key={level} value={level}>
                        Level {level}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Levels;