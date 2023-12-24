// imports
import { patternMap } from "../constants";

// types
type PatternProps = {
    rows: number;
    columns: number;
    onPatternChange: (e: any) => void;
};

const Pattern = ({ rows, columns, onPatternChange }: PatternProps) => {
    return (
        <div className="speed sec">
            <div className="sec-heading">
                Pattern
            </div>
            <div className="controlls">
                <select name="rows" id="levels" value={rows} onChange={onPatternChange}>
                    {patternMap.map(pattern => (
                        <option key={pattern} value={pattern}>
                            {pattern}
                        </option>
                    ))}
                </select>
                <button className='speed-count'>{rows}X{columns}</button>
                <select name="columns" disabled={true} id="levels" value={columns} onChange={onPatternChange}>
                    {patternMap.map(pattern => (
                        <option key={pattern} value={pattern}>
                            {pattern}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pattern;