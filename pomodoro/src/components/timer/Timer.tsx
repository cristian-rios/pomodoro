import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import {
  MAX_STUDYING_TIMES_BEFORE_SWITCHING,
  POMODORO_MODE,
  TIMER_DEFAULT_TIME
} from '../../utils/constants';
import { getTimerState } from '../../utils/stateDescriptors';
// import NavBar from '../navbar/NavBar';
import { Button } from '@ui-kitten/components';
import { TIMER_STATE } from '../../utils/types';

enum EVENTS {
  FINISHED_TIMER,
}

type EVENT = EVENTS.FINISHED_TIMER;

const buttonDescriptions: Record<TIMER_STATE, string> = {
  START: 'Start',
  PAUSED: 'Paused',
  RUNNING: 'Running',
  STOPPED: 'Stopped',
};

const Timer = () => {
  const [timer, setTimer] = useState<number>(
    TIMER_DEFAULT_TIME[POMODORO_MODE.Studying],
  );
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [pomodoroMode, setPomodoroMode] = useState<POMODORO_MODE>(
    POMODORO_MODE.Studying,
  );

  const timer_state = useMemo(
    () => getTimerState(timer, timerIsRunning, pomodoroMode),
    [timer, timerIsRunning, pomodoroMode],
  );
  const [studyingPomodoros, setStudyingPomodoros] = useState<number>(1);

  const dispatchEvent = (event: EVENT) => {
    if (event === EVENTS.FINISHED_TIMER) {
      if (pomodoroMode === POMODORO_MODE.Studying) {
        if (studyingPomodoros < MAX_STUDYING_TIMES_BEFORE_SWITCHING) {
          switchPomodoroMode(POMODORO_MODE.Pause);
          setStudyingPomodoros(amount => amount + 1);
        } else {
          switchPomodoroMode(POMODORO_MODE.Break);
        }
      }
      if (pomodoroMode === POMODORO_MODE.Pause) {
        switchPomodoroMode(POMODORO_MODE.Studying);
      }
      if (pomodoroMode === POMODORO_MODE.Break) {
        switchPomodoroMode(POMODORO_MODE.Studying);
        setStudyingPomodoros(1);
      }
    }
  };

  const switchPomodoroMode = (mode: POMODORO_MODE) => {
    setPomodoroMode(mode);
    resetTimer(mode);
  };

  const resetTimer = (mode: POMODORO_MODE) => {
    setTimerIsRunning(false);
    setTimer(TIMER_DEFAULT_TIME[mode]);
  };

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
  }, [timer, timerIsRunning]);

  const toggleTimer = () => {
    if (timer_state === 'START') setTimerIsRunning(true);
    else if (timer_state === 'RUNNING') setTimerIsRunning(false);
    else if (timer_state === 'PAUSED') setTimerIsRunning(true);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingVertical: 10,
          width: '100%',
        }}>
        <Button
          onPress={() => switchPomodoroMode(POMODORO_MODE.Studying)}
          disabled={pomodoroMode === POMODORO_MODE.Studying}>
          Study
        </Button>
        <Button
          onPress={() => switchPomodoroMode(POMODORO_MODE.Pause)}
          disabled={pomodoroMode === POMODORO_MODE.Pause}>
          Pause
        </Button>
        <Button
          onPress={() => switchPomodoroMode(POMODORO_MODE.Break)}
          disabled={pomodoroMode === POMODORO_MODE.Break}>
          Break
        </Button>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 100 }}>{timer}</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Button onPress={toggleTimer}>{buttonDescriptions[timer_state]}</Button>
      </View>
    </View>
  );
};

export default Timer;
