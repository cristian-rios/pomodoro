/* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import {
  EVENTS,
  MAX_STUDYING_TIMES_BEFORE_SWITCHING,
  POMODORO_MODE,
  TIMER_DEFAULT_TIME
} from '../../utils/constants';
import { getTimerState } from '../../utils/stateDescriptors';
import { Button } from '@ui-kitten/components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import formatTimer from '../../utils/formatTime';
import ThemeContext from '../../utils/themeContext';
import { EVENT, TIMER_STATE } from '../../utils/types';
import strings from '../../utils/strings';

const buttonDescriptions: Record<TIMER_STATE, string> = {
  START: strings.START,
  PAUSED: strings.PAUSED,
  RUNNING: strings.RUNNING,
  STOPPED: strings.STOPPED,
};

const Timer = () => {
  const [timer, setTimer] = useState<number>(
    TIMER_DEFAULT_TIME[POMODORO_MODE.Studying],
  );
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [pomodoroMode, setPomodoroMode] = useState<POMODORO_MODE>(
    POMODORO_MODE.Studying,
  );
  const { theme, updateThemeForMode } = useContext(ThemeContext);

  const timer_state = useMemo(
    () => getTimerState(timer, timerIsRunning, pomodoroMode),
    [timer, timerIsRunning, pomodoroMode],
  );
  const [studyingPomodoros, setStudyingPomodoros] = useState<number>(1);

  const switchPomodoroMode = useCallback((mode: POMODORO_MODE) => {
    setPomodoroMode(mode);
    resetTimerForMode(mode);
    updateThemeForMode(mode);
  }, [updateThemeForMode]);

  const dispatchEvent = useCallback((event: EVENT) => {
    if (event === EVENTS.FINISHED_TIMER) {
      if (pomodoroMode === POMODORO_MODE.Studying) {
        if (studyingPomodoros < MAX_STUDYING_TIMES_BEFORE_SWITCHING) {
          switchPomodoroMode(POMODORO_MODE.Pause);
          setStudyingPomodoros(amount => amount + 1);
        } else {
          switchPomodoroMode(POMODORO_MODE.Break);
          setStudyingPomodoros(1);
        }
      }
      if (pomodoroMode === POMODORO_MODE.Pause) {
        switchPomodoroMode(POMODORO_MODE.Studying);
      }
      if (pomodoroMode === POMODORO_MODE.Break) {
        switchPomodoroMode(POMODORO_MODE.Studying);
      }
    }
  }, [pomodoroMode, studyingPomodoros, switchPomodoroMode]);

  const resetTimerForMode = (mode: POMODORO_MODE) => {
    setTimerIsRunning(false);
    setTimer(TIMER_DEFAULT_TIME[mode]);
  };

  const toggleTimerIsRunning = () => {
    switch (timer_state) {
      case 'START': setTimerIsRunning(true); break;
      case 'RUNNING': setTimerIsRunning(false); break;
      case 'PAUSED': setTimerIsRunning(true); break;
      default: break;
    }
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
          disabled={pomodoroMode === POMODORO_MODE.Studying}
          style={{ backgroundColor: theme.buttonBackground, borderWidth: 0 }}
        >
          {strings.STUDY_BUTTON}
        </Button>
        <Button
          onPress={() => switchPomodoroMode(POMODORO_MODE.Pause)}
          disabled={pomodoroMode === POMODORO_MODE.Pause}
          style={{ backgroundColor: theme.buttonBackground, borderWidth: 0 }}
        >
          {strings.PAUSE_BUTTON}
        </Button>
        <Button
          onPress={() => switchPomodoroMode(POMODORO_MODE.Break)}
          disabled={pomodoroMode === POMODORO_MODE.Break}
          style={{ backgroundColor: theme.buttonBackground, borderWidth: 0 }}
        >
          {strings.BREAK_BUTTON}
        </Button>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CountdownCircleTimer
          isPlaying={timerIsRunning}
          key={pomodoroMode}
          duration={TIMER_DEFAULT_TIME[pomodoroMode]}
          colors={theme.timerColor}
          onComplete={() => {
            setTimerIsRunning(false);
            dispatchEvent(EVENTS.FINISHED_TIMER);
          }}
          onUpdate={(remainingTime) => setTimer(remainingTime)}
        >
          {({ remainingTime }) => <Text style={{ fontSize: 40 }}>{formatTimer(remainingTime)}</Text>}
        </CountdownCircleTimer>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Button
          onPress={toggleTimerIsRunning}
          style={{ backgroundColor: theme.buttonBackground, borderWidth: 0 }}
        >
          {buttonDescriptions[timer_state]}
        </Button>
      </View>
    </View>
  );
};

export default Timer;
