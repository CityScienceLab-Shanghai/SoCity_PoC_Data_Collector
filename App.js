/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, Button, View, Alert} from 'react-native';
import SensorView from './SensorView';
import {Picker} from '@react-native-picker/picker';

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

const ButtonSet = () => {
  return (
    <View style={styles.button}>
      <Button title="Record" onPress={() => Alert.alert('Record')} />
      <Button title="Stop" onPress={() => Alert.alert('Stop')} />
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
  return (
    <ScrollView>
      <Text style={styles.title}>SoCity DAO</Text>
      <Text style={styles.subtitle}>Data Collector</Text>
      <PickerList />
      <ButtonSet />
      <Separator />
      {Object.entries(availableSensors).map(([name, values]) => (
        <SensorView sensorName={name} values={values} />
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
