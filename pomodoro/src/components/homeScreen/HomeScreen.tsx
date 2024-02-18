import React from 'react';
import { SafeAreaView, StatusBar, View, useColorScheme } from 'react-native';
import Timer from '../timer/Timer';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundColor}
            /> */}
            <View style={{ flex: 1 }}>
                <Timer />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;