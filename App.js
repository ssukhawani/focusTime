import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,Platform, AsyncStorage } from 'react-native';
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer"

const STATUS={
  COMPLETE:1,
  CANCELLED:2
}

export default function App() {
  const [focusTask, setFocusTask] = useState("");
  const [focusHistory,setFocusHistory]= useState([])

  const addFocusHistoryWithStatus=(focusTask,status)=>{
      setFocusHistory([...focusHistory,{key:String(focusHistory.length+1),focusTask,status}])
  }

  const onTimerEnd=()=>{
    addFocusHistoryWithStatus(focusTask,STATUS.COMPLETE)
    setFocusTask(null)
  }
  const clearSubject=()=>{
    addFocusHistoryWithStatus(focusTask,STATUS.CANCELLED)
    setFocusTask(null)
  }

  const onClear=()=>{
    setFocusHistory([])
  }

  const saveFocusHitory=async()=>{
    try{
      await AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
    }catch(e){
      console.log(e)
    }
  }

  const loadSavedFocusHitory=async()=>{
    try{
      const history = await AsyncStorage.getItem("focusHistory")
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    loadSavedFocusHitory();
  },[])

  useEffect(()=>{
    saveFocusHitory();
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusTask ? (
        <Timer focusTask={focusTask} onTimerEnd={onTimerEnd} clearSubject={clearSubject}/>
      ) : (
        <>
        <Focus addFocusTask={setFocusTask}/>
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#000",
    paddingTop:Platform.OS === "ios" ? 32:20,
  },
});
