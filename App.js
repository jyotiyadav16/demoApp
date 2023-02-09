/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { View, Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { Provider } from 'react-redux';
import Navigation from './app/navigation';
import { store } from './app/redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Navigation />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
};

export default App;
