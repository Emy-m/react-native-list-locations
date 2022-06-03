import {SafeAreaView} from 'react-native';
import React from 'react';
import Detail from '../Detail';

const DetailScreen = ({route}) => {
  return (
    <SafeAreaView>
      <Detail id={route.params.id}></Detail>
    </SafeAreaView>
  );
};

export default DetailScreen;
