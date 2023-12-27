import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
	useColorScheme
} from 'react-native';
import {
	Colors
} from 'react-native/Libraries/NewAppScreen';
import Timer from './src/components/timer/Timer';

function App(): React.JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundColor}
			/>
			<View style={{ flex: 1 }}>
				<Timer />
			</View>
		</SafeAreaView>
	);
}

export default App;
