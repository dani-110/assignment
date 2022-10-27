import React, { useEffect } from 'react'
import { persistor } from './src/@core/services/store/store'
import store from './src/@core/services/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Routes } from './src/@core/services/navigation';
import Contacts from 'react-native-contacts';
import { LogBox, YellowBox, NativeModules, NativeAppEventEmitter, Button, View} from 'react-native';

const App = () => {
  // console.disableYellowBox = true;
  // LogBox.ignoreLogs(['Warning: ...']);
  // LogBox.ignoreAllLogs()
  // YellowBox.ignoreWarnings([""]);
  NativeAppEventEmitter.addListener('disconnect', message => {
    console.log("Your call has been disconnected ", message)
  });
  return (
    <View style={{flex:1, backgroundColor:'red', alignItems:'center', justifyContent:"center"}} >
      <Button title='Set Token' onPress={
        ()=>{
          NativeModules.Bridge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VjMTQ4OTFhN2MxZjdhZWY1NzJjMTMwZDIyY2UxOTAyLTE2NjY2NDYyMDIiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhbGljZSIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVA1MWU5MjJlOTJkMjM5YjNjNmY5M2U5NzkxY2NhOWM5YiJ9fX0sImlhdCI6MTY2NjY0NjIwMiwiZXhwIjoxNjY2NjQ5ODAyLCJpc3MiOiJTS2VjMTQ4OTFhN2MxZjdhZWY1NzJjMTMwZDIyY2UxOTAyIiwic3ViIjoiQUM3YjEzNGJlMTMyZWEwZjg1MmY3YmZjZWM4ZGQ3ZTc1MiJ9.SLQ9_V6R6hQ6yRRQRE_LU6ZqNEprncc1OUxW1Sk8M1w")
        }
      }/>
      <Button title='Call' onPress={
        ()=>{
          NativeModules.Bridge.sendCall("92443383112", true)
          NativeModules.Bridge.testForEvent()
          // NativeModules.Bridge.print();
        }
      }/>
    </View>
  )
  // return (
  //   <Provider store={store}>
  //     <PersistGate persistor={persistor}>
  //       <Routes />
  //     </PersistGate>
  //   </Provider>
  // )
}


export default App;