/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, Button, View, Alert} from 'react-native';
import SensorView from './SensorView';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {AppState} from 'react-native';
// import { useEffect } from 'react/cjs/react.production.min';

const axis = ['x', 'y', 'z'];

const availableSensors = {
  accelerometer: axis,
  gyroscope: axis,
  magnetometer: axis,
  barometer: ['pressure'],
};

const Separator = () => {
  return <View style={styles.separator} />;
};

const ButtonSet = ({setIsRecording}) => {
  return (
    <View style={styles.button}>
      <Button
        title="Record"
        onPress={() => {
          Alert.alert('Record');
          setIsRecording(true);
        }}
      />
      <Button
        title="Stop"
        onPress={() => {
          Alert.alert('Stop');
          setIsRecording(false);
        }}
      />
    </View>
  );
};

const PickerList = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('3');

  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
      <Picker.Item label="Walk" value="1" />
      <Picker.Item label="Bike" value="2" />
      <Picker.Item label="Car" value="3" />
      <Picker.Item label="Bus" value="4" />
      <Picker.Item label="Metro" value="5" />
    </Picker>
  );
};

const App = () => {
  const initValues = {
    acc_x: 2,
    acc_y: 0,
    acc_z: 0,
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,
    mag_x: 0,
    mag_y: 0,
    mag_z: 0,
    p: 0,
    lon: 0,
    lat: 0,
    tag: 0,
    id: 12345,
  };

  const [sensorValues, setSensorValues] = useState(initValues);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(Date.now());
  const endpoint = 'https://socitydao.media.mit.edu:1234/data';

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if ((AppState.currentState === 'active') && (isRecording === true)) {
      // console.log(JSON.stringify(sensorValues))
      axios
        .post(endpoint, JSON.stringify(sensorValues), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [sensorValues, time]);

  return (
    <ScrollView>
      <Text style={styles.title}>SoCity DAO</Text>
      <Text style={styles.subtitle}>Data Collector</Text>
      <PickerList />
      <ButtonSet setIsRecording={setIsRecording} />
      <Separator />
      {Object.entries(availableSensors).map(([name, values]) => (
        <SensorView sensorName={name} values={values} key={name} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: -10,
    marginBottom: -20,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    margin: 70,
    marginTop: 0,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
