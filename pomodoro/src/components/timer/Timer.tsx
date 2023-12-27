import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TIMER_DEFAULT_TIME } from '../../utils/constants';
import { getTimerState } from '../../utils/stateDescriptors';
import ActionButton from '../actionButton/ActionButton';

const Timer = () => {
    const [timer, setTimer] = useState<number>(TIMER_DEFAULT_TIME);
    const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
    const TIMER_STATE = useMemo(() => getTimerState(timer, timerIsRunning), [timer, timerIsRunning]);

    useEffect(() => {
        if (timerIsRunning) {
            if (timer === 0)
                setTimerIsRunning(false);
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
        else if (TIMER_STATE === 'STOPPED')
            setTimer(TIMER_DEFAULT_TIME);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }} />
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 100 }}>{timer}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <ActionButton
                    onPress={toggleTimer}
                    timerState={TIMER_STATE}
                />
            </View>
            <View style={{ flex: 4 }} />
        </View>
    )
}

export default Timer;