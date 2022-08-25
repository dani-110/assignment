import React, { useEffect } from 'react'
import { persistor } from './src/@core/services/store/store'
import store from './src/@core/services/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Routes } from './src/@core/services/navigation';
import Contacts from 'react-native-contacts';
import { LogBox, YellowBox } from 'react-native';

const App = () => {
  console.disableYellowBox = true;
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs()
  YellowBox.ignoreWarnings([""]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}


export default App;