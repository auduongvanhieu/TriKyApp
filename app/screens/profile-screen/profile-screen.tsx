import { observer } from "mobx-react-lite"
import React from "react"
import { FlatList, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { Icon } from "react-native-elements/dist/icons/Icon"
import { rootStoreRef } from "../../app"
import { Screen, Text } from "../../components"
import { CategoryItem } from "../../components/common/category-item"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"
import { convertDateToString, getGenderName } from "../../utils/functions"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: metrics.baseMargin
}

export const ProfileScreen = observer(function ProfileScreen() {

  const profile = rootStoreRef.profileStore.profile

  const renderTopProfile = () => {
    console.log('hieunv', 'profile', profile);
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 40 }}>
        <Image source={{ uri: profile?.avatar }} defaultSource={images.img_avatar_default} style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: color.bgImage }} />
        <View style={{ flex: 1, marginStart: 10 }}>
          <Text preset='default' text={profile?.name} style={{}} />
          <Text preset='default' text={profile?.phone} style={{ marginTop: 5 }} />
          <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
            <Image source={images.ic_star} style={{ width: 15, height: 15 }} />
            <Text preset='default' text={`${profile?.star}`} style={{ marginStart: 5 }} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderGenderAndBirth = () => {
    return (
      <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <Icon type="material-community" name="gender-transgender" size={16}/>
        <Text preset='default' text={getGenderName(profile.gender)} style={{ fontStyle: "italic", flex: 1, marginStart: 5 }} />
        <Icon type="material-community" name="cake" size={16}/>
        <Text preset='default' text={convertDateToString(profile.birthday)} style={{ fontStyle: "italic", flex: 1, marginStart: 5 }} />
      </View>
    )
  }

  const renderSlogan = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text preset='bold' text="Châm ngôn" style={{}} />
        <Text preset='default' text={profile.slogan} style={{ fontStyle: "italic" }} />
        <Divider style={{ marginTop: 5 }} />
      </View>
    )
  }

  const renderTitle = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text preset='bold' text="Danh hiệu" style={{}} />
        <Text preset='default' text={profile.title_list[0]?.name} style={{ fontStyle: "italic", color: profile.title_list[0]?.textColor }} />
        <Divider style={{ marginTop: 5 }} />
      </View>
    )
  }

  const renderHobbies = () => {
    return (
      <View style={{ marginTop: 10, width: '100%' }}>
        <Text preset='bold' text="Sở thích" style={{}} />
        <View style={{ width: '100%' }}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={profile.hobby_list}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => (
              <CategoryItem item={item} style={{ minWidth: '30%', marginTop: 10 }} />
            )} />
        </View>
      </View>
    )
  }

  const renderEmail = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text preset='bold' text="Email" style={{}} />
        <Text preset='default' text={profile.email} style={{ fontStyle: "italic"}} />
        <Divider style={{ marginTop: 5 }} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {renderTopProfile()}
      {renderGenderAndBirth()}
      {renderSlogan()}
      {renderTitle()}
      {renderHobbies()}
      {renderEmail()}
    </Screen>
  )
})
