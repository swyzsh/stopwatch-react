import { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }
  }, [isRunning]);

  function start(): void {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(): void {
    setIsRunning(false);
  }

  function reset(): void {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime(): string {
    let hours: number = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes: number = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds: number = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds: number = Math.floor((elapsedTime % 1000) / 10);

    let hours_fmt: string = String(hours).padStart(2, "0");
    let minutes_fmt: string = String(minutes).padStart(2, "0");
    let seconds_fmt: string = String(seconds).padStart(2, "0");
    let milliseconds_fmt: string = String(milliseconds).padStart(2, "0");

    return `${hours_fmt}:${minutes_fmt}:${seconds_fmt}:${milliseconds_fmt}`;
  }

  return (
    <div className="stopwatch">
      <div className='display'>
        {formatTime()}
      </div>
      <div className='controls'>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;