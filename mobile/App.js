import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar, YellowBox } from 'react-native'

import Routes from './src/routes';

// retirar a mensagem de aviso do socket
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
])

export default function App() {
  return (
    <>
      <Routes/>
      <StatusBar barStyle='light-content' backgroundColor="#7D40E7"/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
