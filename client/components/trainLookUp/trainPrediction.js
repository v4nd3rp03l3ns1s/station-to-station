import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { List, IconButton } from 'react-native-paper';

//redux and state management imports
import { useSelector, useDispatch } from 'react-redux';
import { updateTrainPredict } from '../../actions/train';
import { trainService } from '../../services/trainService';

export function TrainPrediction({ stop }) {
  const dispatch = useDispatch();

  const trainLine = useSelector((state) => state.train.trainLine);
  const trainStop = useSelector((state) => state.train.trainStop);
  const trainPredict = useSelector((state) => state.train.trainPrediction);

  const getPredictions = async function (stp) {
    const prediction = await trainService.getTrainPredict(stp.stopID);
    const nextTrain = prediction['0'];
    console.log(nextTrain);
    dispatch(updateTrainPredict(nextTrain));
  };

  const countdownCalculate = function (scheduledTime) {
    const scheduledDate = new Date(scheduledTime);
    const countdown = Math.abs(scheduledDate - Date.now());
    const countdownMin = Math.floor((countdown / 1000 / 60) << 0);
    if (countdownMin === 0) {
      return 'Approaching';
    }
    if (countdownMin === 1) {
      return '1 minute';
    }
    return countdownMin + ' minutes';
  };

  return (
    <View style={styles.predictContainer}>
      {trainStop ? (
        <IconButton
          style={styles.buttonStyle}
          mode="outlined"
          compact="true"
          accesibilityLabel="Refresh prediction button"
          onPress={() => getPredictions(trainStop)}
          icon="clock"
          color="#e5cedc"
        />
      ) : null}
      {trainPredict ? (
        <View style={styles.predictTextContainer}>
          <Text style={styles.predictTopText} color={trainLine.color}>Train #{trainPredict.runID}</Text>
          <Text style={styles.predictBottomText}>{countdownCalculate(trainPredict.countdown)}</Text>
        </View>
      ) : (
        <Text>No train predicted.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  predictContainer: {
    flexDirection: 'row',
    justifyContents: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 60,
    height: 60,
    backgroundColor: '#272838',
  },
  predictTextContainer: {
    backgroundColor: '#f3eaf4',
    width: 120,
    height: 60,
    borderRadius: 25,
    justifyContents: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  predictTopText: {
    color: '#7d6b91',
    fontWeight: '700',
  },
  predictBottomText: {
    color: '#272838',
    fontWeight: '700',
  }
});