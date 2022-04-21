import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const minToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 1, isPaused, handelProgress, onEnd }) => {
  const [millis, setMillies] = useState(minToMillis(minutes));

  const minute = Math.floor((millis / 1000 / 60) % 60);
  const second = Math.floor((millis / 1000) % 60);

  const interval = useRef(null);

  const countDown = () => {
    setMillies((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillies(minToMillis(minutes));
  }, [minutes]);

  useEffect(()=>{
    handelProgress(millis / minToMillis(minutes));
    if(millis === 0){
      onEnd()
    }
  },[millis])

  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current)
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 0.4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    marginVertical: 60,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
