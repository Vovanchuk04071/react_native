import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authSlice} from './auth/authReduser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export default {store, persistor};
