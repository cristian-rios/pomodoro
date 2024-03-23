/* eslint-disable prettier/prettier */
import { POMODORO_MODE } from './constants';
import { Palette } from './types';

const themes: Record<POMODORO_MODE, Palette> = {
    [POMODORO_MODE.Studying]: {
        background: '#B23130',
        timerColor: '#822423',
        buttonBackground: '#c93836',
    },
    [POMODORO_MODE.Pause]: {
        background: '#55A1A0',
        timerColor: '#305c5b',
        buttonBackground: '#5fb8b6',
    },
    [POMODORO_MODE.Break]: {
        background: '#025970',
        timerColor: '#01313d',
        buttonBackground: '#027999',
    },
};

export default themes;
