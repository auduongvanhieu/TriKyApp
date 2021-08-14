import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { Icon } from "react-native-elements/dist/icons/Icon"
import { rootStoreRef } from "../../app"
import { Screen, Text } from "../../components"
import { ButtonClose } from "../../components/button/button-close"
import { ButtonMain } from "../../components/button/button-main"
import { CategoryItem } from "../../components/common/category-item"
import { TitlesItem } from "../../components/common/titles-item"
import { requestGoBack } from "../../services/app-action/app-action"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"
import { convertDateToString, getGenderName } from "../../utils/functions"
import ImageView from 'react-native-image-viewing'

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: metrics.baseMargin
}

export const ProfileUpdateScreen = observer(function ProfileScreen() {

  const profile = rootStoreRef.profileStore.profile

  const [avatar, setAvatar] = useState("");
  const [visibleViewing, setVisibleViewing] = useState(false);

  useEffect(() => {
    setAvatar(profile.avatar)
  }, [])

  const renderTopProfile = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 40 }}>
        <TouchableOpacity onPress={()=>setVisibleViewing(true)}>
          <Image source={{ uri: profile?.avatar }} defaultSource={images.img_avatar_default} style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: color.bgImage }} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginStart: 10 }}>
        </View>
      </View>
    )
  }

  const renderGenderAndBirth = () => {
    return (
      <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <Icon type="material-community" name="gender-transgender" size={16} />
        <Text preset='default' text={getGenderName(profile.gender)} style={{ fontStyle: "italic", flex: 1, marginStart: 5 }} />
        <Icon type="material-community" name="cake" size={16} />
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
        <TitlesItem title_list={profile?.title_list} />
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
            renderItem={({ item, index }) => (
              <CategoryItem item={item} style={{ minWidth: '30%', marginTop: 10, marginEnd: '3%' }} />
            )} />
        </View>
      </View>
    )
  }

  const renderEmail = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text preset='bold' text="Email" style={{}} />
        <Text preset='default' text={profile.email} style={{ fontStyle: "italic" }} />
        <Divider style={{ marginTop: 5 }} />
      </View>
    )
  }

  const renderButton = () => {
    return (
      <View style={{ width: '80%', marginTop: 20, alignSelf: 'center' }}>
        <ButtonMain text="Lưu" />
        <ButtonMain onPress={() => requestGoBack()} type={1} text="Hủy" style={{ marginTop: 10 }} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <ButtonClose />
      {renderTopProfile()}
      {renderGenderAndBirth()}
      {renderSlogan()}
      {renderTitle()}
      {renderHobbies()}
      {renderEmail()}
      {renderButton()}
      {/* Popup show image */}
      <ImageView images={[{ uri: avatar }]} imageIndex={0} visible={visibleViewing} onRequestClose={() => setVisibleViewing(false)} />
    </Screen>
  )
})
