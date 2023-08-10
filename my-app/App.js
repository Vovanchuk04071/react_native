import React from 'react';

import { useFonts } from 'expo-font';
import { Text } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { Main } from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DMMono-Regular': require('./assets/fonts/YsabeauSC-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={store.persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
