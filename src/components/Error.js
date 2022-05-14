import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

interface ErrorProps {
  onRefresh: () => any;
}

const Error = ({onRefresh}: ErrorProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };
  return (
    <View style={[styles.container]}>
      <Text style={[textStyle, {padding: 40, fontSize: 16}]}>
        Error de conexion
      </Text>
      <Button
        title="Reintentar"
        onPress={onRefresh}
        style={[styles.buttonStyle]}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    borderRadius: 10,
  },
});

export default Error;
