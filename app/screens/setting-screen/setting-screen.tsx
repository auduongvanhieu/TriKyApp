import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { rootStoreRef } from "../../app"
import { Screen, Text } from "../../components"
import { TitlesItem } from "../../components/common/titles-item"
import { PopupYesNo } from "../../components/popup/popup-yes-no"
import { requestNavigate, requestReplace } from "../../services/app-action/app-action"
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
      <TouchableOpacity onPress={()=>{requestNavigate("profile")}} style={{flexDirection: 'row', marginTop: 40}}>
        <Image source={{uri: profile?.avatar}} defaultSource={images.img_avatar_default} style={{width: 65, height: 65, borderRadius: 32.5, backgroundColor: color.bgImage}}/>
        <View style={{flex: 1, marginStart: 10}}>
          <Text preset='default' text={profile?.name} style={{}} />
          <Text preset='default' text={profile?.phone} style={{marginTop: 5 }} />
          <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Image source={images.ic_star} style={{width: 15, height: 15}}/>
            <Text preset='default' text={`${profile?.star}`} style={{marginStart: 5}} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSlogan = () => {
    return (
      <View style={{marginTop: 20}}>
        <Text preset='bold' text="Ch??m ng??n" style={{}} />
        <Text preset='default' text={profile.slogan} style={{fontStyle:"italic"}} />
        <Divider style={{marginTop: 5}} />
      </View>
    )
  }

  const renderTitle = () => {
    return (
      <View style={{marginTop: 10}}>
        <Text preset='bold' text="Danh hi???u" style={{}} />
        <TitlesItem title_list={profile?.title_list}/>
        <Divider style={{marginTop: 5}} />
      </View>
    )
  }

  const renderRow = ({ onPress= ()=>{}, iconType = 'font-awesome', iconName = 'bell-o', title = "Th??ng b??o" }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', width: '100%', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: color.line }}>
        <Icon type={iconType} name={iconName} size={20} />
        <Text preset='default' text={title} style={{ marginStart: 10 }} />
      </TouchableOpacity>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {renderTopProfile()}
      {renderSlogan()}
      {renderTitle()}
      <Text preset='bold' text="C??i ?????t" style={{ marginTop: 20}} />
      {renderRow({ iconType: 'font-awesome', iconName: 'bell-o', title: "Th??ng b??o" })}
      {renderRow({ iconType: 'material-community', iconName: 'lock-outline', title: "Quy???n ri??ng t?? v?? b???o m???t" })}
      {renderRow({ iconType: 'material-community', iconName: 'chat-alert-outline', title: "C??i ?????t tr?? chuy???n" })}
      {renderRow({ iconType: 'material-community', iconName: 'location-exit', title: "????ng xu???t", onPress:()=>{setIsVisiblePopupLogout(true)} })}
      <PopupYesNo isVisible={isVisiblePopupLogout} onYesPress={logout} onClosePress={()=>setIsVisiblePopupLogout(false)} content="B???n c?? ch???c ch???n mu???n ????ng xu???t?" />
    </Screen>
  )
})
