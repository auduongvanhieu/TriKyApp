import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import { Screen, Text } from "../../components"
import { PopupYesNo } from "../../components/popup/popup-yes-no"
import { color } from "../../theme"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: metrics.baseMargin
}

export const SettingScreen = observer(function SettingScreen() {

  const [isVisiblePopupLogout, setIsVisiblePopupLogout] = useState(false);

  const renderRow = ({ onPress= ()=>{}, iconType = 'font-awesome', iconName = 'bell-o', title = "Thông báo" }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', width: '100%', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: color.line }}>
        <Icon type={iconType} name={iconName} size={20} />
        <Text preset='bold' text={title} style={{ marginStart: 10 }} />
      </TouchableOpacity>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset='bold' text="Cài đặt" style={{ marginTop: 200, fontSize: 18 }} />
      {renderRow({ iconType: 'font-awesome', iconName: 'bell-o', title: "Thông báo" })}
      {renderRow({ iconType: 'material-community', iconName: 'lock-outline', title: "Quyền riêng tư và bảo mật" })}
      {renderRow({ iconType: 'material-community', iconName: 'chat-alert-outline', title: "Cài đặt trò chuyện" })}
      {renderRow({ iconType: 'material-community', iconName: 'location-exit', title: "Đăng xuất", onPress:()=>{setIsVisiblePopupLogout(true)} })}
      <PopupYesNo isVisible={isVisiblePopupLogout} onClosePress={()=>setIsVisiblePopupLogout(false)} content="Bạn có chắc chắn muốn đăng xuất?" />
    </Screen>
  )
})
