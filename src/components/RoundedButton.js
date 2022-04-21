import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};


const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      height: size,
      width: size,
      borderColor: 'white',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent:"center",
    },
    text: {
      color: 'white',
      fontSize: size/4,
    },
  });
