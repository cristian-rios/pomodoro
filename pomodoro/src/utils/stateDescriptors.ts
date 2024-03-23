/* eslint-disable prettier/prettier */
import { POMODORO_MODE, TIMER_DEFAULT_TIME } from './constants';
import { TIMER_STATE } from './types';

export function getTimerState(timer: number, timerIsRunning: boolean, pomo_mode: POMODORO_MODE): TIMER_STATE | never {
    let timerState: TIMER_STATE;
    if (timer === TIMER_DEFAULT_TIME[pomo_mode] && timerIsRunning === false) {
        timerState = 'START';
    }
    else if (timer <= TIMER_DEFAULT_TIME[pomo_mode] && timer > 0 && timerIsRunning === true) {
        timerState = 'RUNNING';
    }
    else if (timer <= TIMER_DEFAULT_TIME[pomo_mode] && timer > 0 && timerIsRunning === false) {
        timerState = 'PAUSED';
    }
    else if (timer === 0 && timerIsRunning === true) {
        timerState = 'STOPPED';
    }
    else if (timer === 0 && timerIsRunning === false) {
        timerState = 'STOPPED';
    }
    else {
        throw new Error(`Invalid state transition or event - timer ${timer} - timerIsRunning ${timerIsRunning}`);
    }

    return timerState;
}
