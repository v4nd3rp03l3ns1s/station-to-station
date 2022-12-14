import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { List } from 'react-native-paper';

//redux and state management imports
import { useSelector, useDispatch } from 'react-redux';
import { updateBusDirection, updateBusStopList, updateBusStop, updateBusPredict } from '../../actions/bus';
import { busService } from '../../services/busService';

export function BusDirectionsAccordion({ directions }) {
  const dispatch = useDispatch();
  const busRoute = useSelector((state) => state.bus.busRoute);
  const busDirection = useSelector((state) => state.bus.busDirection);

  console.log(directions, 'direction');

  const handlePress = async function (directionObj) {
    dispatch(updateBusDirection(directionObj));
    dispatch(updateBusStop(''));
    dispatch(updateBusPredict(''));
    const busStopList = await busService.getBusStops(directionObj);
    dispatch(updateBusStopList(busStopList));
  };

  return (
    <List.Accordion
      title={busDirection.direction || 'Select Route Direction'}
      style={styles.listParent}
      left={props => <List.Icon {...props} icon="bank-outline" color={busRoute.routeColor} style={styles.listIcon}/>}
      accessibilityLabel="Route Directions"
    >
      <ScrollView height="30%">
        {directions
          ? directions.map((direction) => (
              <List.Item
                key={direction._id}
                title={direction.direction}
                style={styles.listItem}
                onPress={() => handlePress(direction)}
              />
            ))
          : null}
      </ScrollView>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  listParent: {
    backgroundColor: '#f3eaf4',
    fontFamily: 'Menlo',
  },
  listIcon: {
    backgroundColor: '#4d456b',
    borderRadius: 40,
  },
  listItem: {
    backgroundColor: '#e5cedc',
  },
});
