import { CommonActions, StackActions } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import DropdownAlert from "react-native-dropdownalert";
import { Loading } from "../../components";
import { useStores } from "../../models";

export var navigationRef = React.createRef();

export const setNavigationRef = (navRef) => {
  navigationRef = navRef
}
export function requestNavigate(name, params: any = {}) {
  navigationRef.current?.dispatch(CommonActions.navigate({ name, params, }));
}
export function requestReplace(name, params: any = {}) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function requestGoBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}
export function requestPopToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export const AppAction = observer(function AppAction() {

  const dropdownRef = useRef(null)

  const { appStore } = useStores()
  const { isLoading, dropdownAlert } = appStore

  useEffect(() => {
    appStore.hideLoading()
  }, [])

  useEffect(() => {
    if (dropdownAlert.type) {
      console.log('hieunv', 'dropdownAlert', dropdownAlert)
      dropdownRef.current.alertWithType(dropdownAlert.type, dropdownAlert.title, dropdownAlert.description)
      appStore.resetAlert()
    }
  }, [dropdownAlert.type])

  return (
    <>
      {isLoading && <Loading />}
      <DropdownAlert updateStatusBar={false} ref={dropdownRef} />
    </>
  )
})
