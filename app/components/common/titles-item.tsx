import * as React from "react"
import { Text, View } from "react-native"

export function TitlesItem({ style={}, title_list,}) {
  return (
    <View style={[{flexDirection: 'row'}, style]}>
      {title_list && title_list.map((item, index)=>{
        return (
          index == 0 ?
          <Text style={{ color: item?.textColor, fontStyle: 'italic' }}>{item?.name}</Text> :
          <Text style={{ color: item?.textColor, fontStyle: 'italic' }}>, {item?.name}</Text> 
        )
      })}
    </View>
  )
}
