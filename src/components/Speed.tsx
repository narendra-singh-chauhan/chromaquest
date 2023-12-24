// imports
import { SPEED_INTERVAL, MAX_SPEED_LIMIT } from "../constants";

// types
type SpeedProps = {
    speed: number;
    onSpeedDecrease: () => void;
    onSpeedIncrease: () => void;
};

const Speed = ({ speed, onSpeedDecrease, onSpeedIncrease }: SpeedProps) => {
    return (
        <div className="speed sec">
            <div className="sec-heading">
                Speed
            </div>
            <div className="controlls">
                <button disabled={speed === SPEED_INTERVAL} className='btn' onClick={onSpeedDecrease}>-</button>
                <button className='speed-count'>{speed}</button>
                <button disabled={speed === MAX_SPEED_LIMIT} className='btn' onClick={onSpeedIncrease}>+</button>
            </div>
        </div>
    );
};

export default Speed;