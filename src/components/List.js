import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Location from '../utils/Location';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ItemSeparator from './ItemSeparator';
import {environment} from '../environment/development';
import authorization from '../utils/authorization';
import Loading from './Loading';
import Error from './Error';
import Detail from './Detail';

const List = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const handleDetail = (location: Location) => {
    navigation.navigate('Detail', {id: location.id});
  };

  const loadData = () => {
    // setLoading(true);
    // setLocations([]);
    // setError(null);
    // fetch(environment.baseURL + 'api/locations', authorization)
    //   .then(res => res.json())
    //   .then(data => {
    //     let locations = data?.map(location => new Location(location));
    //     setLocations(locations);
    //     setLoading(false);
    //   })
    //   .catch(e => {
    //     setLoading(false);
    //     setError(e);
    //   });
    setLocations([
      {
        id: 1,
        latitude: 41.40338,
        longitude: 2.17403,
        name: 'prueba',
        description: 'descripcion',
        contact: 'contacto',
      },
    ]);
    setLoading(false);
  };

  const handleRefresh = () => {
    loadData();
  };

  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const renderItemComponent = (data: Location) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleDetail(data);
      }}>
      <Text style={[textStyle, styles.textTitle]}>{data.name}</Text>
      <Text style={[textStyle, styles.text]}>{data.contact}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      {detail == null ? (
        <FlatList
          data={locations}
          renderItem={info => renderItemComponent(info.item)}
          keyExtractor={location => location.id}
          ItemSeparatorComponent={() => <ItemSeparator />}
          refreshing={loading}
          onRefresh={handleRefresh}></FlatList>
      ) : (
        <Detail
          id={detail}
          getBack={() => {
            setDetail(null);
          }}
        />
      )}
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
