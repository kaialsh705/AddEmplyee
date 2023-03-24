import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0,
    stateReconciler: autoMergeLevel2,
    blacklist: ['offline'],
};

const pReducer = persistReducer(persistConfig, rootReducer());

export const store = createStore(
    pReducer,
    applyMiddleware(...middleware),
);
AppRegistry.registerComponent(appName, () => App);
export const persistor = persistStore(store);
