import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration,Platform } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from '../../components/Timing';

const DEFAULT_TIME = 1
export const Timer = ({ focusTask,onTimerEnd,clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const handelProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (newTime) => {
    setMinutes(newTime);
    setIsStarted(false)
    setProgress(1)
  };

  const vibrate=()=>{
    if(Platform.OS === "ios"){
      const interval = setInterval(()=>Vibration.vibrate(),1000)
      setTimeout(()=>clearInterval(interval),3000)
    }else{
      Vibration.vibrate(3000)
    }
  }

  const onEnd=()=>{
    vibrate()
    setMinutes(DEFAULT_TIME);
    setIsStarted(false)
    setProgress(1)
    onTimerEnd()
  }

  return (
    <View style={styles.conatiner}>
      <CountDown
        isPaused={!isStarted}
        handelProgress={handelProgress}
        minutes={minutes}
        onEnd={onEnd}
      />
      <View>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusTask}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <ProgressBar
          progress={progress}
          color="blue"
          style={{ height: 20, borderRadius: 2 }}
        />
      </View>
      <View style={styles.timingsContainer}>
        <Timing onChangeTiming={changeTime} />
      </View>
      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton text="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton text="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearButton}>
        <RoundedButton text="-" size={70} onPress={clearSubject} textStyle={{fontSize:18}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  task: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingsContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton:{
    paddingBottom:24,
    paddingLeft:15
  }
});
