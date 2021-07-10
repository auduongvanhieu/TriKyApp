import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useRef } from "react";
import DropdownAlert from "react-native-dropdownalert";
import { Loading } from "../../components"
import { useStores } from "../../models"

export const navigationRef = React.createRef();

export const AppAction = observer(function AppAction() {

  const dropdownRef =  useRef(null)

  const { appStore } = useStores()
  const { isLoading, dropdownAlert } = appStore

  useEffect(() => {
    appStore.hideLoading()
  }, [])

  useEffect(() => {
    if(dropdownAlert.type){
      console.log('hieunv', 'dropdownAlert', dropdownAlert)
      dropdownRef.current.alertWithType(dropdownAlert.type, dropdownAlert.title, dropdownAlert.description)
      appStore.resetAlert()
    }
  })

  return (
    <>
      {isLoading && <Loading/>}
      <DropdownAlert updateStatusBar={false} ref={dropdownRef} />
    </>
  )
})
