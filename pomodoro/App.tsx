/* eslint-disable prettier/prettier */
import React from 'react';
import * as eva from '@eva-design/eva';
import HomeScreen from './src/components/homeScreen/HomeScreen';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import ThemeProvider from './src/components/themeProvider/ThemeProvider';

function App(): React.JSX.Element {
	return (
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
			<ThemeProvider>
				<HomeScreen />
			</ThemeProvider>
		</ApplicationProvider>
	);
}

export default App;
