import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './routes/HomeStack'
import {persistor, store} from './index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <SafeAreaView
                            style={{
                                flex: 0,
                            }}
                        />
                        <HomeStack/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
