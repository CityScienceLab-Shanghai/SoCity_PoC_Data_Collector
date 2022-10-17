import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Sensors from 'react-native-sensors';
import NAME_TO_KEY from './data/name2key.json';

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{value.toString().substr(0, 8)}</Text>
  </View>
);

const SensorView = ({sensorName, values, updateSensorValues}) => {
  const sensor$ = Sensors[sensorName];

  const initialValue =
    values && values.reduce((carry, val) => ({...carry, [val]: 0}), {});
  // console.log(initialValue);

  const [sensorValue, setSensorValue] = useState(initialValue);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const _subscription = sensor$.subscribe(values => {
      setSensorValue({...values});
    });
    setSubscription(_subscription);

    return () => {
      _subscription.unsubscribe();
      setSubscription(null);
    };
  }, []);

  useEffect(() => {
    values.map(valueName => {
      // console.log(NAME_TO_KEY[sensorName + valueName], sensorValue[valueName]);
      updateSensorValues(
        NAME_TO_KEY[sensorName + valueName],
        sensorValue[valueName],
      );
    });
  }, [sensorValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{sensorName} values</Text>
      {values.map(valueName => {
        // console.log(sensorName + valueName);
        return (
          <Value
            key={sensorName + valueName}
            name={valueName}
            value={sensorValue[valueName]}
          />
        );
      })}
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

export default SensorView;
