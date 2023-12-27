/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ActionButton from '../src/components/actionButton/ActionButton';

it('renders correctly', () => {
    renderer.create(<ActionButton timerState={'START'} />);
});
