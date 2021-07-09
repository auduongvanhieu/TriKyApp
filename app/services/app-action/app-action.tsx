import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Loading } from "../../components"
import { useStores } from "../../models"

export const navigationRef = React.createRef();

export const AppAction = observer(function AppAction() {


  const { appStore } = useStores()
  const { isLoading } = appStore

  useEffect(() => {
    appStore.hideLoading()
  }, [])

  return (
    <>
      {isLoading && <Loading/>}
    </>
  )
})
