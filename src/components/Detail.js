import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {environment} from '../environment/development';
import Authorization from '../utils/authorization';
import Loading from './Loading';
import Error from './Error';
import Location from '../utils/Location';
import MapView, {Marker} from 'react-native-maps';

const Detail = ({id, getBack}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      fetch(environment.baseURL + 'api/locations/' + id, Authorization)
        .then(res => res.json())
        .then(data => {
          setLocation(new Location(data));
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          setError(e);
        });
    }, 2500);
  };

  if (error != null) {
    return <Error onRefresh={loadData} />;
  }
  if (loading || location == null) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}
        maxZoomLevel={17}>
        <Marker
          title={location.name}
          description={location.description}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>

      <Text style={styles.textTitle}>{location.name}</Text>
      <Text style={styles.text}>{location.contact}</Text>

      <TouchableOpacity style={[styles.buttonStyle]} onPress={getBack}>
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 100,
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
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#cccccc',
    padding: 10,
    width: '50%',
  },
  map: {
    display: 'flex',
    height: 700,
  },
});

export default Detail;
