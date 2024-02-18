import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { MAX_STUDYING_TIMES_BEFORE_SWITCHING, POMODORO_MODE, TIMER_DEFAULT_BREAK_TIME, TIMER_DEFAULT_PAUSE_TIME, TIMER_DEFAULT_STUDYING_TIME } from '../../utils/constants';
import { getTimerState } from '../../utils/stateDescriptors';
import ActionButton from '../actionButton/ActionButton';
import NavBar from '../navbar/NavBar';
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
}

const timerTimes: Record<POMODORO_MODE, number> = {
    [POMODORO_MODE.Studying]: TIMER_DEFAULT_STUDYING_TIME,
    [POMODORO_MODE.Pause]: TIMER_DEFAULT_PAUSE_TIME,
    [POMODORO_MODE.Break]: TIMER_DEFAULT_BREAK_TIME,
}

const Timer = () => {
    const [timer, setTimer] = useState<number>(TIMER_DEFAULT_STUDYING_TIME);
    const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
    const TIMER_STATE = useMemo(() => getTimerState(timer, timerIsRunning), [timer, timerIsRunning]);
    const [pomodoroMode, setPomodoroMode] = useState<POMODORO_MODE>(POMODORO_MODE.Studying);
    const [studyingPomodoros, setStudyingPomodoros] = useState<number>(0);

    const dispatchEvent = (event: EVENT) => {
        if (event === EVENTS.FINISHED_TIMER) {
            if (pomodoroMode === POMODORO_MODE.Studying) {
                if (studyingPomodoros < MAX_STUDYING_TIMES_BEFORE_SWITCHING) {
                    setPomodoroMode(POMODORO_MODE.Pause);
                    setStudyingPomodoros(studyingPomodoros => studyingPomodoros + 1);
                }
                else {
                    setPomodoroMode(POMODORO_MODE.Break);
                    setStudyingPomodoros(0);
                }
            } 
            else {
                setPomodoroMode(POMODORO_MODE.Studying);
            }
        }
    }

    const switchPomodoroMode = (mode: POMODORO_MODE) => {
        setPomodoroMode(mode);
        resetTimer(mode);
    }

    const resetTimer = (mode: POMODORO_MODE) => {
        setTimerIsRunning(false);
        setTimer(timerTimes[mode]);
    }

    useEffect(() => {
        if (timerIsRunning) {
            if (timer === 0) {
                setTimerIsRunning(false);
                dispatchEvent(EVENTS.FINISHED_TIMER);
            }
            else {
                const timeout = setTimeout(() => {
                    setTimer(timer => timer - 1);
                }, 1000);

                return () => clearTimeout(timeout);
            }
        }
    }, [timer, timerIsRunning]);

    const toggleTimer = () => {
        if (TIMER_STATE === 'START')
            setTimerIsRunning(true);
        else if (TIMER_STATE === 'RUNNING')
            setTimerIsRunning(false);
        else if (TIMER_STATE === 'PAUSED')
            setTimerIsRunning(true);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10, width: '100%' }} >
                <Button onPress={() => switchPomodoroMode(POMODORO_MODE.Studying)} disabled={pomodoroMode === POMODORO_MODE.Studying}>Study</Button>
                <Button onPress={() => switchPomodoroMode(POMODORO_MODE.Pause)} disabled={pomodoroMode === POMODORO_MODE.Pause}>Pause</Button>
                <Button onPress={() => switchPomodoroMode(POMODORO_MODE.Break)} disabled={pomodoroMode === POMODORO_MODE.Break}>Break</Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 100 }}>{timer}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                {/* <ActionButton
                    onPress={toggleTimer}
                    timerState={TIMER_STATE}
                /> */}
                <Button onPress={toggleTimer}>{buttonDescriptions[TIMER_STATE]}</Button>
            </View>
        </View>
    )
}

export default Timer;