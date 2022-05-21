import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {environment} from '../environment/development';
import Authorization from '../utils/authorization';
import Loading from './Loading';
import Error from './Error';
import Location from '../utils/Location';

const Detail = props => {
  const {loading, setLoading} = useState(true);
  const {error, setError} = useState(null);
  const {location, setLocation} = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setError(null);

    fetch(environment.baseURL + 'api/locations/' + props.id, Authorization)
      .then(res => res.json())
      .then(data => {
        let locations = data?.map(location => new Location(location));
        setLocation(locations?.find(location => location.id === id));
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e);
      });

    if (error) {
      return <Error />;
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <View>
        <Text>{location.name}</Text>
        <Text>{location.contact}</Text>
      </View>
    );
  };
};
export default Detail;
