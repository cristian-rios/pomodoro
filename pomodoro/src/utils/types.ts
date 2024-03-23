/* eslint-disable prettier/prettier */
import { ColorFormat } from 'react-native-countdown-circle-timer';
import { EVENTS } from './constants';
export type TIMER_STATE = 'START' | 'RUNNING' | 'PAUSED' | 'STOPPED';

export type Palette = {
    background: ColorFormat,
    timerColor: ColorFormat,
    buttonBackground: ColorFormat,
};

export type EVENT = EVENTS.FINISHED_TIMER;
