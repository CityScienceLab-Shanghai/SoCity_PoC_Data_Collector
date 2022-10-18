import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{value.toString().substr(0, 8)}</Text>
  </View>
);

const LocationView = ({time, isRecording, updateSensorValues}) => {
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  let options = {
    enableHighAccuracy: true,
  };

  useEffect(() => {
    if (isRecording)
      {Geolocation.getCurrentPosition(
        res => {
          // console.log(res);
          setLon(res.coords.longitude);
          setLat(res.coords.latitude);
          updateSensorValues('lon', res.coords.longitude);
          updateSensorValues('lat', res.coords.latitude);
        },
        err => {
          console.log(err);
        },
        options,
      )}
  }, [time]);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>geolocation values</Text>
      <Value key={'geolocationlon'} name={'lon'} value={lon} />
      <Value key={'geolocationlat'} name={'lat'} value={lat} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    marginTop: 250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  headline: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20,
  },
  valueName: {
    marginLeft: -20,
    width: 90,
    fontSize: 20,
    // fontWeight: "bold",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default LocationView;
