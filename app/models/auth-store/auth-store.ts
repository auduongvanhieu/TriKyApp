import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.optional(types.string, ""),
    loginParams: types.optional(types.model({ phone: types.string, password: types.string }),{phone: "", password: ""})
  })
  .extend(withEnvironment)
  .actions(self => ({
    saveToken: (token: any) => { self.token = token },
    saveLoginParams: (loginParams: any) => { self.loginParams = loginParams },
  }))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
