// imports
import { Status } from "../types";
import { STATUS } from "../constants";

// types
type ActionsProps = {
    status: Status,
    onStart: () => void;
    onStop: () => void;
    onRestart: () => void;
    totalRedTouches: number;
};

const Actions = ({ status, onStart, onStop, onRestart, totalRedTouches }: ActionsProps) => {
    return (
        <div className="actions sec">
            <div className="sec-heading">
                Actions
            </div>
            <div className="controlls">
                {status === 'stop' && (
                    <button className={`action ${status === STATUS.START ? 'active' : ''}`} onClick={onStart}>Start</button>
                )}
                {totalRedTouches !== 4 && status === 'stop' && (
                    <button className={`action ${status === STATUS.START ? 'active' : ''}`} onClick={onRestart}>Resume</button>
                )}
                {totalRedTouches !== 4 && status === 'start' && (
                    <button className={`action ${status === STATUS.STOP ? 'active' : ''}`} onClick={onStop}>Pause</button>
                )}
            </div>
        </div>
    );
};

export default Actions;