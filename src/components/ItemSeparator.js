import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {View, useColorScheme} from 'react-native';

const ItemSeparator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.darker,
  };
  return (
    <View style={[backgroundStyle, {height: 1, marginHorizontal: 10}]}></View>
  );
};

export default ItemSeparator;
