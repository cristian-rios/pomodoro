/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { POMODORO_MODE } from '../../utils/constants';
import ThemeContext from '../../utils/themeContext';
import themes from '../../utils/themes';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(themes[POMODORO_MODE.Studying]);

    function updateThemeForMode(mode: POMODORO_MODE) {
        setTheme(themes[mode]);
    }

    return (
        <ThemeContext.Provider value={{ theme, updateThemeForMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
