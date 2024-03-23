/* eslint-disable prettier/prettier */
import React from 'react';
import { POMODORO_MODE } from './constants';
import themes from './themes';
import { Palette } from './types';

interface ThemeContextInterface {
    theme: Palette,
    updateThemeForMode: (mode: POMODORO_MODE) => void,
}

const ThemeContext = React.createContext<ThemeContextInterface>({
    theme: themes[POMODORO_MODE.Studying],
    updateThemeForMode: () => { },
});

export default ThemeContext;
