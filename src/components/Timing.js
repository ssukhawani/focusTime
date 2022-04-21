import React from 'react'
import { View, ScrollView } from 'react-native'
import {RoundedButton} from './RoundedButton'

const minArr=[1,5,10,15,20,30,40,50]

export const Timing=({
  onChangeTiming
})=>{
  return (
    <ScrollView horizontal={true}>
    {minArr.map((item,ind)=>{
      return(
        <View style={{margin:15}} key={ind}>
          <RoundedButton text={item} size={70} onPress={()=>onChangeTiming(item)}/>
        </View>
      )
    })}
    </ScrollView>
  )
}