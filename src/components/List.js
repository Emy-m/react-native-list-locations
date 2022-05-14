import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Location from '../utils/Location';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ItemSeparator from './ItemSeparator';
import {environment} from '../environments/development';
import authorization from '../utils/authorization';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setLocations([]);
    fetch(environment.baseURL + 'api/locations', authorization)
      .then(res => res.json())
      .then(data => {
        let locations = data?.map(location => new Location(location));
        setLocations(locations);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
    setLoading(false);
  };

  const handleRefresh = () => {
    loadData();
  };

  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const renderItemComponent = location => (
    <TouchableOpacity style={styles.container}>
      <Text style={[textStyle, styles.textTitle]}>{location.name}</Text>
      <Text style={[textStyle, styles.text]}>{location.contact}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={locations}
        renderItem={info => renderItemComponent(info.item)}
        keyExtractor={location => location.id}
        ItemSeparatorComponent={() => <ItemSeparator />}></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    padding: 5,
  },
  text: {
    textAlign: 'justify',
  },
  textTitle: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default List;