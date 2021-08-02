import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { TouchableOpacity, ViewStyle, Image, View } from "react-native"
import { Icon } from "react-native-elements"
import { rootStoreRef } from "../../app"
import { Screen, Text } from "../../components"
import { PopupYesNo } from "../../components/popup/popup-yes-no"
import { requestReplace } from "../../services/app-action/app-action"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: metrics.baseMargin
}

export const SettingScreen = observer(function SettingScreen() {

  const [isVisiblePopupLogout, setIsVisiblePopupLogout] = useState(false);

  const profile = rootStoreRef.profileStore.profile

  const logout = () => {
    rootStoreRef.authStore.logout()
    requestReplace("login")
  }

  const renderTopProfile = () => {
    console.log('hieunv', 'profile', profile);
    return (
      <TouchableOpacity style={{flexDirection: 'row', marginTop: 40}}>
        <Image source={images.img_avatar_default} defaultSource={images.img_avatar_default} style={{width: 60, height: 60, borderRadius: 30}}/>
        <View style={{flex: 1, marginStart: 10}}>
          <Text preset='bold' text={profile?.name} style={{ marginStart: 10 }} />
          <Text preset='bold' text={profile?.phone} style={{ marginStart: 10, marginTop: 5 }} />
        </View>
      </TouchableOpacity>
    )
  }

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
      {renderTopProfile()}
      <Text preset='bold' text="Cài đặt" style={{ marginTop: 20, fontSize: 18 }} />
      {renderRow({ iconType: 'font-awesome', iconName: 'bell-o', title: "Thông báo" })}
      {renderRow({ iconType: 'material-community', iconName: 'lock-outline', title: "Quyền riêng tư và bảo mật" })}
      {renderRow({ iconType: 'material-community', iconName: 'chat-alert-outline', title: "Cài đặt trò chuyện" })}
      {renderRow({ iconType: 'material-community', iconName: 'location-exit', title: "Đăng xuất", onPress:()=>{setIsVisiblePopupLogout(true)} })}
      <PopupYesNo isVisible={isVisiblePopupLogout} onYesPress={logout} onClosePress={()=>setIsVisiblePopupLogout(false)} content="Bạn có chắc chắn muốn đăng xuất?" />
    </Screen>
  )
})
