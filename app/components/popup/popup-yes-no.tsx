import * as React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import Modal from 'react-native-modal'
import { Text } from ".."
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 10,
}

export interface PopupYesNoProps {
  children?: any, isVisible: boolean, onClosePress: any, title: string, content: string
}

export function PopupYesNo(props: PopupYesNoProps) {
  const {isVisible = false, onClosePress, title = 'Thông báo', content='' } = props

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClosePress} animationInTiming={1} animationOutTiming={1}>
      <View style={CONTAINER}>
        {/* Header */}
        <View style={{ flexDirection: 'row', backgroundColor: color.primary, height: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingHorizontal: 8 }}>
          <View style={{ width: 30 }} />
          <Text style={{ color: 'white', fontSize: 18, flex: 1, textAlign: "center" }}>{title}</Text>
          <Icon type="font-awesome" name="close" color="red" size={30} onPress={onClosePress} />
        </View>
        {/* Children */}
        <View style={{width: '100%', minHeight: 50, padding: 10, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 14}}>{content}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
            <TouchableOpacity onPress={onClosePress} style={{backgroundColor: 'grey', borderRadius: 4, padding: 10, minWidth: '25%', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'blue', borderRadius: 4, padding: 10, marginStart: 10, minWidth: '25%', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
