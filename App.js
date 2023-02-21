import React, { useEffect } from 'react'
import { persistor } from './src/@core/services/store/store'
import store from './src/@core/services/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Routes } from './src/@core/services/navigation';
import Contacts from 'react-native-contacts';
import { LogBox, YellowBox, NativeModules, NativeAppEventEmitter, Button, View} from 'react-native';
import {check, PERMISSIONS, RESULTS,requestMultiple} from 'react-native-permissions';
import { NotificationBar } from './src/shared/components/NotificationBar/notificationBar';
import axios from 'axios'
import {  Dialer } from './src/screens';
import { AuthProvider } from './src/context/authContext'
import NotificationBarProvider from './src/context/notificationBar';

const App = () => {
  console.disableYellowBox = true;
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs()
  YellowBox.ignoreWarnings([""]);
  NativeAppEventEmitter.addListener('disconnect', message => {
    console.log("Your call has been disconnected ", message)
  });
  useEffect(()=>{
    permission()
  },[])


const permission =()=>{
  requestMultiple([ PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((statuses) => {
    console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
    console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
  });
}

  // return (
  //   <View style={{flex:1, backgroundColor:'red', alignItems:'center', justifyContent:"center"}} >
  //     <Button title='Set Token' onPress={
  //       ()=>{
  //         NativeModules.Bridge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM0YjgxOTViYTYwNWI5YjA1Yzc2N2FhMzk1NjVlZTVkLTE2NjY4OTg3MTMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhbGljZSIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVA4YzQ5NDZlN2JmYzQ5NTkyMzdhYjQwZjU1YjBhY2FhZiJ9LCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JiZmM0YTFhZjVhYWYwODdjZmI2YWNlNjg3N2Q2NTBiNyJ9fSwiaWF0IjoxNjY2ODk4NzEzLCJleHAiOjE2NjY5MDIzMTMsImlzcyI6IlNLMzRiODE5NWJhNjA1YjliMDVjNzY3YWEzOTU2NWVlNWQiLCJzdWIiOiJBQzdiMTM0YmUxMzJlYTBmODUyZjdiZmNlYzhkZDdlNzUyIn0.ZRwnAFJHCkPbYDI4spQ08WGR3PVmpkvya46QGbWX5Ts")
  //       }
  //     }/>
  //     {/* 923312267487 */}
  //     <Button title='Call' onPress={
  //       ()=>{
  //         NativeModules.Bridge.sendCall("923462231079", true)
  //         let params ={
  //           "ssid": "AC7b134be132ea0f852f7bfcec8dd7e752",
  //           "authToken": "e68e95c825c6e2020982cf9bd5107773"
  //       }
  //          axios.post('http://localhost:7998/api/twilio/loginx', params).then(res => {
  //           console.log(res, 'sdsa')
  //           // if (res.status == 200) {
  //           //     dispatch(tokenValue(res.data.token))
  //           // }
  //       })
  //         // NativeModules.Bridge.testForEvent()
  //         // NativeModules.Bridge.print();
  //       }
  //     }/>
  //   </View>
  // )
  return (
    <AuthProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
     <NotificationBarProvider>
        <Routes />
      <NotificationBar />
        {/* <Dialer/> */}
        </NotificationBarProvider>
      </PersistGate>
    </Provider>
    </AuthProvider>
  )
}


export default App;