// imports
import { useState } from "react";
import { Status, Pattern } from "../types";
import { SPEED_INTERVAL, levels, initPattern, STATUS } from "../constants";

const useController = () => {
  const [speed, setSpeed] = useState<number>(SPEED_INTERVAL);
  const [status, setStatus] = useState<Status>(STATUS.STOP);
  const [selectedLevel, setSelectedLevel] = useState<number>(levels[0]);
  const [pattern, setPattern] = useState<Pattern>(initPattern);
  const [score, setScore] = useState<string[]>([]);

  const totalScore = score.reduce((acc, cur) => {
    return acc + (cur === 'red' ? -10 : cur === 'blue' ? 10 : 0);
  }, 0);

  const totalRedTouches = score.filter(item => item === 'red').length;

  const totalBlueTouches = score.filter(item => item === 'blue').length;

  const scoreFeed = {
    totalScore,
    totalRedTouches,
    totalBlueTouches
  };

  const onSpeedIncrease = () => {
    setSpeed(prev => prev + SPEED_INTERVAL);
  };

  const onSpeedDecrease = () => {
    setSpeed(prev => prev - SPEED_INTERVAL);
  };

  const onStart = () => {
    setScore([]);
    setStatus(STATUS.START);
  };

  const onRestart = () => {
    setStatus(STATUS.START);
  };

  const onStop = () => {
    setStatus(STATUS.STOP);
  };

  const onLevelChange = (e: any) => {
    setSelectedLevel(Number(e.target.value));
    onStop();
  }

  const onPatternChange = (e: any) => {
    const { name, value } = e.target;

    onStop();
    setPattern(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const onScoreChange = (newScore: string) => {
    if (status !== 'start') return;
    const totalRedTouches = score.filter(item => item === 'red').length;
    if (totalRedTouches === 3 && newScore === 'red') {
      onStop();
    }
    setScore(prev => ([...prev, newScore]));
  };

  return {
    speed,
    status,
    selectedLevel,
    pattern,
    score,
    scoreFeed,
    onSpeedIncrease,
    onSpeedDecrease,
    onStart,
    onRestart,
    onStop,
    onLevelChange,
    onPatternChange,
    onScoreChange,
  };
};

export default useController;