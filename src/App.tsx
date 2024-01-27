// imports
import './App.css';
import Speed from './components/Speed';
import Levels from './components/Levels';
import Level01 from './levels/Level01';
import Level02 from './levels/Level02';
import Pattern from './components/Pattern';
import Actions from './components/Actions';
import useController from './hooks/useController';
import { useMemo } from 'react';
import generateGrids from './utils/generateGrids';
import Score from './components/Score';
import Level03 from './levels/Level03';
import Level04 from './levels/Level04';
import Level05 from './levels/Level05';
import Waves from './animations/Waves';

const App = () => {
  const {
    speed,
    status,
    selectedLevel,
    pattern,
    scoreFeed,
    onSpeedIncrease,
    onSpeedDecrease,
    onStart,
    onRestart,
    onStop,
    onLevelChange,
    onPatternChange,
    onScoreChange,
  } = useController();

  const grids = useMemo(() => {
    return generateGrids(pattern.rows, pattern.columns);
  }, [pattern]);

  return (
    <div className='app'>
      <div className="panel">
        <Levels selectedLevel={selectedLevel} onLevelChange={onLevelChange} />

        <Speed speed={speed} onSpeedDecrease={onSpeedDecrease} onSpeedIncrease={onSpeedIncrease} />

        <Pattern {...pattern} onPatternChange={onPatternChange} />

        <Actions status={status} onStart={onStart} onStop={onStop} onRestart={onRestart} {...scoreFeed}/>
      </div>

      <div className="game">
        <Score {...scoreFeed}/>
        <div
          className="grids"
          style={{
            gridTemplateColumns: `repeat(${pattern.columns}, 1fr)`,
            gridTemplateRows: `repeat(${pattern.rows}, 1fr)`
          }}
        >
          {selectedLevel === 1 && (
            <Level01 speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}

          {selectedLevel === 2 && (
            <Level02 speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}

          {selectedLevel === 3 && (
            <Level03 speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}

          {selectedLevel === 4 && (
            <Level04 speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}

          {selectedLevel === 5 && (
            <Level05 speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}

          {selectedLevel === 6 && (
            <Waves speed={speed} status={status} {...pattern} grids={grids} onScoreChange={onScoreChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;