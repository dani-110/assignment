import React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import { NotificationBarContext } from '../../../context/notificationBar';

export const NotificationBar = () => {

  const { Show, Message,Status } = React.useContext(NotificationBarContext);
console.log(Show,"show")
const setStatusColor = () =>{
  switch(Status){
    case 'error':
      return '#f07171'
      case 'success': 
      return 'darkgreen'
  }
    
}
  return (
    Show ?
      <View style={[styles.main]} >
        <View style={[styles.messageView,{backgroundColor:setStatusColor()}]}>
          <Text style={styles.messageText}>{Message}</Text>
        </View>
      </View>
      : null
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 50,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  messageView: {
    borderRadius: 10,
    backgroundColor: 'grey',
    height: 50,
    width: '80%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    color: '#fff',
    fontSize: 18
  }
});