import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

interface ErrorProps {
  onRefresh: () => any;
}

const Error = ({onRefresh}: ErrorProps) => {
  return (
    <View style={[styles.container]}>
      <Text>Error de conexion</Text>
      <Button
        title="Reintentar"
        onPress={onRefresh}
        style={[styles.buttonStyle]}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    borderRadius: 10,
  },
});

export default Error;
