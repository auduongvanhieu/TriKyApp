import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, Image, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { Icon } from "react-native-elements/dist/icons/Icon"
import ImageView from 'react-native-image-viewing'
import { rootStoreRef } from "../../app"
import { Popup, Screen, Text } from "../../components"
import { ButtonClose } from "../../components/button/button-close"
import { ButtonMain } from "../../components/button/button-main"
import { CategoryItem } from "../../components/common/category-item"
import { TitlesItem } from "../../components/common/titles-item"
import { requestGoBack } from "../../services/app-action/app-action"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"
import { convertDateToString } from "../../utils/functions"
import TextInputMask from 'react-native-text-input-mask';
import { api } from "../../services/api"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: metrics.baseMargin
}

const VIEW_INPUT: ViewStyle = {
  marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1
}

const INPUT: TextStyle = {
  padding: 0, marginHorizontal: 5, flexGrow: 1, color: 'black'
}

const VIEW_INPUT_MULTI: ViewStyle = {
  width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 5
}

const INPUT_MULTI: TextStyle = {
  padding: 0, flexGrow: 1, color: 'black'
}

export const ProfileUpdateScreen = observer(function ProfileScreen() {

  const { profile } = rootStoreRef.profileStore
  const categories = rootStoreRef.generalStore.categories || []
  const generalTitles = rootStoreRef.generalStore.generalTitles || []

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("01/01/2000");
  const [gender, setGender] = useState(0);
  const [slogan, setSlogan] = useState("");
  const [titles, setTitles] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [email, setEmail] = useState("");
  const [visibleViewing, setVisibleViewing] = useState(false);
  const [isVisibleChooseTitles, setVisibleChooseTitles] = useState(false);

  useEffect(() => {
    setAvatar(profile.avatar)
    setName(profile.name)
    setBirthday(convertDateToString(profile.birthday))
    setGender(profile.gender)
    setSlogan(profile.slogan)
    setTitles(profile.titles)
    setTitleList(profile.title_list)
    setHobbies([...profile.hobbies])
    setEmail(profile.email)
    onRefresh()
  }, [])

  async function onRefresh() {
    await api.getCategories({ showLoading: false })
    await api.getTitles({ showLoading: false })
  }

  const renderTopProfile = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 40 }}>
        <TouchableOpacity onPress={() => setVisibleViewing(true)}>
          <Image source={{ uri: profile?.avatar }} defaultSource={images.img_avatar_default} style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: color.bgImage }} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginStart: 10 }}>
          <TouchableOpacity style={{ backgroundColor: color.main, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 4, width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon type="feather" name="camera" size={16} color="white" />
            <Text text="Chụp ảnh" style={{ color: 'white', marginStart: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: color.main, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 4, width: '80%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Icon type="entypo" name="images" size={16} color="white" />
            <Text text="Chọn ảnh từ thư viện" style={{ color: 'white', marginStart: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderName = () => {
    return (
      <View style={VIEW_INPUT}>
        <Icon type="font-awesome" name="user-circle-o" size={16} />
        <TextInput placeholder="Nhập họ và tên" value={name} onChangeText={value => setName(value)} style={INPUT} />
      </View>
    )
  }

  const renderBirthday = () => {
    return (
      <View style={VIEW_INPUT}>
        <Icon type="material-community" name="cake" size={16} />
        <TextInputMask mask={'[00]/[00]/[0000]'} keyboardType='number-pad' placeholder="DD/MM/YYYY" value={birthday} onChangeText={value => setBirthday(value)} style={INPUT} />
      </View>
    )
  }

  const renderSlogan = () => {
    return (
      <View style={{ width: '100%', marginTop: 20 }}>
        <Text preset='bold' text="Châm ngôn sống" style={{}} />
        <View style={VIEW_INPUT_MULTI}>
          <TextInput placeholder="Nhập châm ngôn" value={slogan} onChangeText={value => setSlogan(value)} style={INPUT_MULTI} multiline={true} />
        </View>
      </View>
    )
  }

  const renderTitle = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text preset='bold' text="Danh hiệu" style={{}} />
        <TouchableOpacity onPress={() => setVisibleChooseTitles(true)} style={VIEW_INPUT_MULTI}>
          <TitlesItem title_list={profile?.title_list} style={{ flexGrow: 1 }} />
          <Icon type="ionicon" name="search-outline" size={16} />
        </TouchableOpacity>
      </View>
    )
  }

  const onPressCategory = (item) => {
    if (!hobbies.includes(item.code))
      hobbies.push(item.code)
    else
      hobbies.splice(hobbies.indexOf(item.code), 1)
    console.log('hieunv', 'hobbies', hobbies);
    setHobbies([...hobbies])
  }

  const renderHobbies = () => {
    return (
      <View style={{ marginTop: 20, width: '100%' }}>
        <Text preset='bold' text="Sở thích" style={{}} />
        <View style={{ width: '100%' }}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={[...categories]}
            numColumns={3}
            renderItem={({ item, index }) => (
              <CategoryItem onPress={() => onPressCategory(item)} isSelect={hobbies.includes(item.code)} item={item} style={{ minWidth: '30%', marginTop: 10, marginEnd: '3%' }} />
            )} />
        </View>
      </View>
    )
  }

  const renderEmail = () => {
    return (
      <View style={VIEW_INPUT}>
        <Icon type="ionicon" name="mail-unread-outline" size={16} />
        <TextInput placeholder="Nhập email" value={email} onChangeText={value => setEmail(value)} style={INPUT} />
      </View>
    )
  }

  const renderButton = () => {
    return (
      <View style={{ width: '80%', marginTop: 30, alignSelf: 'center' }}>
        <ButtonMain text="Lưu" />
        <ButtonMain onPress={() => requestGoBack()} type={2} text="Hủy" style={{ marginTop: 10 }} />
      </View>
    )
  }

  const renderPopupChooseTitles = () => {
    console.log('hieunv', 'titles', [...generalTitles]);
    return (
      <Popup isVisible={isVisibleChooseTitles} title="Chọn danh hiệu" onClosePress={() => setVisibleChooseTitles(false)}>
        <View style={{ width: '100%'}}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={[...generalTitles]}
            renderItem={({ item, index }) => (
              <View style={{width: '100%', paddingHorizontal: '5%'}}>
                <TouchableOpacity style={{paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                  <Icon type="material" name="check-box-outline-blank" size={16} />
                  <Text style={{ color: item?.textColor, marginStart: 5 }}>{item?.name}</Text>
                </TouchableOpacity>
                <Divider/>
              </View>
            )} />
        </View>
      </Popup>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll" onRefresh={onRefresh}>
      <ButtonClose />
      {renderTopProfile()}
      {renderName()}
      {renderBirthday()}
      {renderSlogan()}
      {renderTitle()}
      {renderHobbies()}
      {renderEmail()}
      {renderButton()}
      {/* Popup choose titles */}
      {renderPopupChooseTitles()}
      {/* Popup show image */}
      <ImageView images={[{ uri: avatar }]} imageIndex={0} visible={visibleViewing} onRequestClose={() => setVisibleViewing(false)} />
    </Screen>
  )
})
