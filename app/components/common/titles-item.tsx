import * as React from "react"
import { Text, View } from "react-native"

export function TitlesItem({ style={}, title_list,}) {
  return (
    <View style={[{flexDirection: 'row', flexWrap: 'wrap'}, style]}>
      {title_list && title_list.map((item, index)=>{
        return (
          (index > 0 && index == title_list.length-1 )?
          <Text style={{ color: item?.textColor, fontStyle: 'italic' }}>{item?.name}</Text> :
          <Text style={{ color: item?.textColor, fontStyle: 'italic' }}>{item?.name}, </Text> 
        )
      })}
    </View>
  )
}
