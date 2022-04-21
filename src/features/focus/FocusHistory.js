import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList,SafeAreaView } from 'react-native';
import {RoundedButton} from '../../components/RoundedButton';

export const FocusHistory = ({ onClear, focusHistory }) => {
  const renderItem = ({item,index}) => <Text style={styles.setFocusTaskStyle(item.status)}>{item.focusTask}</Text>;

  return (
    <SafeAreaView style={{flex:1,alignItems:"center"}}>
      {!!focusHistory.length &&
      <>
        <Text style={styles.title}>Things we've focused on </Text>
        <FlatList
          style={{flex:1}}
          contentContainerStyle={{flexGrow: 1}}
          data={focusHistory}
          renderItem={renderItem}
        />
        <View style={{marginBottom:20}}>
          <RoundedButton text="Clear" size={95} onPress={onClear} />
        </View>
      </>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  setFocusTaskStyle:(status)=>({
    color:status>1?"red":"green",
    fontSize:20
  }),
  title:{
    color:"white",
    fontSize:32,
    textAlign:"center",
    marginBottom:20
  }
});
