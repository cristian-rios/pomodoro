import React from 'react';
import * as eva from '@eva-design/eva';
import HomeScreen from './src/components/homeScreen/HomeScreen';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';

function App(): React.JSX.Element {
	return (
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
			<HomeScreen />
		</ApplicationProvider>
	);
}

export default App;
