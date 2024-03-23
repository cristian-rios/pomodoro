/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { EVENTS, POMODORO_MODE, TIMER_DEFAULT_TIME } from './constants';
import { EVENT } from './types';

/* Deprecated hook. Add in <Timer /> component in case of custom timer handling */
const useTimer = (timerIsRunning: boolean, setTimerIsRunning: (timerIsRunning: boolean) => void, dispatchEvent: (event: EVENT) => void) => {
  const [timer, setTimer] = useState<number>(
    TIMER_DEFAULT_TIME[POMODORO_MODE.Studying],
  );

  useEffect(() => {
    if (timerIsRunning) {
      if (timer === 0) {
        setTimerIsRunning(false);
        dispatchEvent(EVENTS.FINISHED_TIMER);
      } else {
        const timeout = setTimeout(() => {
          setTimer(time => time - 1);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [timer, timerIsRunning, setTimerIsRunning, dispatchEvent]);

  return [timer, setTimer];
};

export default useTimer;
