import React from 'react';
import {onAuthStateChanged} from 'firebase/auth';

import {useFonts} from 'expo-font';
import {Text} from 'react-native';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {useRoute} from './router';
import {PersistGate} from 'redux-persist/integration/react';
import store from './redux/store';
import {auth} from "./firebase/config";


export default function App() {
    const [user, setUser] = React.useState(null);

    const [fontsLoaded] = useFonts({
        'DMMono-Regular': require('./assets/fonts/YsabeauSC-Regular.ttf'),
    });

    const routing = useRoute(user);
    console.log('user', user)

    onAuthStateChanged(auth, user => setUser(user));

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store.store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={store.persistor}>
                <NavigationContainer>{routing}</NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
