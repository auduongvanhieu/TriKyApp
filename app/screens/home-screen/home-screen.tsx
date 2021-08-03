import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { ViewStyle, TouchableOpacity, Image, View } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { rootStoreRef } from "../../app"
import { Screen, Text } from "../../components"
import { api, resetApi } from "../../services/api"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {

  const profile = rootStoreRef.profileStore.profile

  useEffect(() => {
    resetApi()
    onRefresh()
  }, [])

  const onRefresh = async () => {
    await api.getProfile({})
  }

  const renderTopProfile = () => {
    console.log('hieunv', 'profile', profile);
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginTop: metrics.statusBarHeight, paddingHorizontal: metrics.baseMargin }}>
        <Image source={{ uri: profile?.avatar }} defaultSource={images.img_avatar_default} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: color.bgImage }} />
        <View style={{ flex: 1, marginStart: 10, justifyContent: 'center' }}>
          <Text preset='default' text={profile?.name} style={{ fontStyle: 'italic' }} />
          <Text preset='default' text={"Người chơi mới"} style={{ marginTop: 3, color: color.primary, fontStyle: 'italic', fontSize: 12 }} />
        </View>
      </TouchableOpacity>
    )
  }

  const renderMenuTop = ({ image = images.ic_menu_meeting, title= "", onPress=()=>{} }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
        <View style={{width: metrics.screenWidth/7, height: metrics.screenWidth/7, backgroundColor: "#F1F3F6", borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={image} style={{width: 30, height: 30}}/>
        </View>
        <Text preset='default' text={title} style={{ color: color.primary,textAlign: 'center', fontSize: 12, marginTop: 3}}/>
      </TouchableOpacity>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {renderTopProfile()}
      <Divider style={{ marginVertical: 5 }} />
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10}}>
        {renderMenuTop({image: images.ic_menu_meeting, title: "Tạo\ncuộc hẹn"})}
        {renderMenuTop({image: images.ic_menu_tri_ky_nearly, title: "Tri kỷ\nquanh đây"})}
        {renderMenuTop({image: images.ic_menu_place, title: "Địa điểm\nvui chơi"})}
        {renderMenuTop({image: images.ic_menu_event, title: "Sự kiện\nhấp dẫn"})}
      </View>
    </Screen>
  )
})
