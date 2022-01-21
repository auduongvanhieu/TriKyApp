import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, Image, Platform, ScrollView, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { Icon } from "react-native-elements/dist/icons/Icon"
import ImageView from 'react-native-image-viewing'
import TextInputMask from 'react-native-text-input-mask'
import { rootStoreRef } from "../../app"
import { Popup, Text } from "../../components"
import { ButtonClose } from "../../components/button/button-close"
import { ButtonMain } from "../../components/button/button-main"
import { CategoryItem } from "../../components/common/category-item"
import { TitlesItem } from "../../components/common/titles-item"
import { ScreenAware } from "../../components/screen/screen-aware"
import { WarnText } from "../../components/text/warn-text"
import { api } from "../../services/api"
import { requestGoBack } from "../../services/app-action/app-action"
import { color } from "../../theme"
import { images } from "../../theme/images"
import metrics from "../../theme/metrics"
import { convertDateToString, convertStringToDate, isValidDate } from "../../utils/functions"
import { launchCamera, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker"
import { chooseImageOptions } from "../../utils/options"
import ImageResizer from 'react-native-image-resizer';
import moment from "moment"

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
  width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 5, flexWrap: 'wrap'
}
const INPUT_MULTI: TextStyle = {
  padding: 0, flexGrow: 1, color: 'black'
}
const TOUCH_GENDER: ViewStyle = {
  flexDirection: 'row', alignItems: 'center', marginRight: 20, paddingVertical: 5
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

  const [warnName, setWarnName] = useState(undefined);
  const [warnBirthday, setWarnBirthday] = useState(undefined);
  const [warnHobbies, setWarnHobbies] = useState(undefined);

  useEffect(() => {
    setAvatar(profile.avatar)
    setName(profile.name)
    setBirthday(convertDateToString(profile.birthday))
    setGender(profile.gender)
    setSlogan(profile.slogan)
    setTitles([...profile.titles])
    setTitleList([...profile.title_list])
    setHobbies([...profile.hobbies])
    setEmail(profile.email)
    onRefresh()
  }, [])

  async function onRefresh() {
    await api.getCategories({ showLoading: false })
    await api.getTitles({ showLoading: false })
  }

  const checkValidInput = () => {
    var isValid = true
    setWarnName(undefined)
    setWarnBirthday(undefined)
    setWarnHobbies(undefined)
    if (name == '') {
      setWarnName('Vui lòng nhập họ tên')
      isValid = false
    }
    if (!isValidDate(birthday)) {
      setWarnBirthday('Vui lòng nhập ngày sinh hợp lệ')
      isValid = false
    }
    if (hobbies.length == 0) {
      setWarnHobbies('Vui lòng chọn ít nhất một sở thích')
      isValid = false
    }
    return isValid
  }

  const onSubmit = async () => {
    if (checkValidInput()) {
      let res = await api.updateProfile({ _id: profile._id, avatar, name, birthday: convertStringToDate(birthday), gender, slogan, titles, hobbies, email, })
      if (res.kind == 'ok') {
        requestGoBack()
      }
    }
  }

  const onTakeImage = async () => {
    const result = await launchCamera(chooseImageOptions);
    handleImage(result)
  }

  const onChooseImage = async () => {
    const result = await launchImageLibrary(chooseImageOptions);
    handleImage(result)
  }

  const handleImage = (response: ImagePickerResponse) => {
    console.log('hieunv', 'onChooseImageResponse', response);
    if (response?.assets?.length > 0) {
      const imageRes = response.assets[0]
      console.log('hieunv', 'imageRes', imageRes);
      ImageResizer.createResizedImage(imageRes.uri, imageRes.width, imageRes.height, 'PNG', 100, 0, null)
        .then(async res => {
          const data = new FormData();
          console.log('hieunv', 'createResizedImage', { ...res, data: 'data' })
          var fileName = ''
          if (Platform.OS == 'android') {
            var fileExt = res.path.split('.')
            var fileName = `avatar_${profile._id}`+ moment().format("_YYYY_MM_DD_HH_mm_ss.") + fileExt[fileExt.length - 1]
          } else {
            var fileExt = res.path.split('.')
            var fileName = `avatar_${profile._id}` + moment().format("_YYYY_MM_DD_HH_mm_ss.") + fileExt[fileExt.length - 1]
          }
          data.append("file", {
            name: fileName,
            type: "image/*",
            uri: Platform.OS === "android" ? res.uri : res.uri.replace("file://", "/private")
          });
          console.log('hieunv', 'fileName', fileName)
          console.log('hieunv', 'response.uri', res.uri)
          // Up hình lên server
          let uploadFilesRes = await api.uploadFiles(data)
          console.log('hieunv', 'uploadFilesRes', uploadFilesRes);
        })
        .catch(err => {
          console.log('hieunv', 'createResizedImageError', err)
        });
    }
  }

  const renderTopProfile = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 40 }}>
        <TouchableOpacity onPress={() => setVisibleViewing(true)}>
          <Image source={{ uri: profile?.avatar }} defaultSource={images.img_avatar_default} style={{ width: 65, height: 65, borderRadius: 32.5, backgroundColor: color.bgImage }} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginStart: 10 }}>
          <TouchableOpacity onPress={onTakeImage} style={{ backgroundColor: color.main, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 4, width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon type="feather" name="camera" size={16} color="black" />
            <Text text="Chụp ảnh" style={{ color: 'black', marginStart: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onChooseImage} style={{ backgroundColor: color.main, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 4, width: '80%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Icon type="entypo" name="images" size={16} color="black" />
            <Text text="Chọn ảnh từ thư viện" style={{ color: 'black', marginStart: 5 }} />
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

  const renderGender = () => {
    return (
      <View style={{ width: '100%', marginTop: 20 }}>
        <Text preset='bold' text="Giới tính" style={{}} />
        <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setGender(0)} style={TOUCH_GENDER}>
            <Icon type="material-community" name={gender == 0 ? "check-circle-outline" : "circle-outline"} size={20} />
            <Text text="Nữ" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender(1)} style={TOUCH_GENDER}>
            <Icon type="material-community" name={gender == 1 ? "check-circle-outline" : "circle-outline"} size={20} />
            <Text text="Nam" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender(2)} style={TOUCH_GENDER}>
            <Icon type="material-community" name={gender == 2 ? "check-circle-outline" : "circle-outline"} size={20} />
            <Text text="Đồng tính nữ" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender(3)} style={TOUCH_GENDER}>
            <Icon type="material-community" name={gender == 3 ? "check-circle-outline" : "circle-outline"} size={20} />
            <Text text="Đồng tính nam" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  const renderSlogan = () => {
    return (
      <View style={{ width: '100%', marginTop: 15 }}>
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
          <TitlesItem title_list={titleList} style={{ flexGrow: 1 }} />
          <Icon type="ionicon" name="search-outline" size={16} containerStyle={{ position: 'absolute', right: 0 }} />
        </TouchableOpacity>
      </View>
    )
  }

  const onPressTitle = (item) => {
    if (!titles.includes(item.code)) {
      titles.push(item.code)
      titleList.push(item)
    } else {
      titles.splice(titles.indexOf(item.code), 1)
      titleList.splice(titleList.indexOf(item), 1)
    }
    console.log('titles', 'titles', titles);
    console.log('titleList', 'titleList', titleList);
    setTitles([...titles])
    setTitleList([...titleList])
  }

  const renderPopupChooseTitles = () => {
    return (
      <Popup isVisible={isVisibleChooseTitles} title="Chọn danh hiệu" onClosePress={() => setVisibleChooseTitles(false)}>
        <View style={{ width: '100%' }}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={[...generalTitles]}
            renderItem={({ item, index }) => (
              <View style={{ width: '100%', paddingHorizontal: '5%' }}>
                <TouchableOpacity onPress={() => onPressTitle(item)} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <Icon type="material-community" name={titles.includes(item.code) ? "check-box-outline" : "checkbox-blank-outline"} size={16} />
                  <Text style={{ color: item?.textColor, marginStart: 5 }}>{item?.name}</Text>
                </TouchableOpacity>
                <Divider />
              </View>
            )} />
          <ButtonMain onPress={() => setVisibleChooseTitles(false)} text="Xong" style={{ marginVertical: 10, width: '60%', alignSelf: 'center' }} />
        </View>
      </Popup>
    )
  }

  const onPressCategory = (item) => {
    if (!hobbies.includes(item.code)) {
      hobbies.push(item.code)
    } else {
      hobbies.splice(hobbies.indexOf(item.code), 1)
    }
    console.log('hieunv', 'hobbies', hobbies);
    setHobbies([...hobbies])
  }

  const renderHobbies = () => {
    return (
      <View style={{ marginTop: 20, width: '100%' }}>
        <Text preset='bold' text="Sở thích (*)" style={{}} />
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
        <ButtonMain onPress={onSubmit} text="Lưu" />
        <ButtonMain onPress={() => requestGoBack()} type={2} text="Hủy" style={{ marginTop: 10 }} />
      </View>
    )
  }

  return (
    <ScreenAware style={ROOT} preset="scroll" onRefresh={onRefresh} >
      <ButtonClose />
      {renderTopProfile()}
      {renderName()}
      <WarnText text={warnName} />
      {renderBirthday()}
      <WarnText text={warnBirthday} />
      {renderGender()}
      {renderSlogan()}
      {renderTitle()}
      {renderPopupChooseTitles()}
      {renderHobbies()}
      <WarnText text={warnHobbies} />
      {renderEmail()}
      {renderButton()}
      <ImageView images={[{ uri: avatar }]} imageIndex={0} visible={visibleViewing} onRequestClose={() => setVisibleViewing(false)} />
    </ScreenAware>
  )
})
