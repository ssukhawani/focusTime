import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addFocusTask }) => {
  const [temp, setTemp] = useState('');

  const onPress = () => addFocusTask(temp);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            onChangeText={(text) => setTemp(text)}
          />
          <RoundedButton text="+" size={60} onPress={onPress} textStyle={{fontSize:18}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: .5,
    marginTop: 32,
    justifyContent:"center"
  },
  titleContainer: {
    flex: 0.4,
    padding: 26,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
