/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
import Timer from '../timer/Timer';
import ThemeContext from '../../utils/themeContext';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const { theme } = useContext(ThemeContext);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
            />
            <View style={{ flex: 1 }}>
                <Timer />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
