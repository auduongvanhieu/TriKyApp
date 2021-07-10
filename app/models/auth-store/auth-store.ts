import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({})
  .views(self => ({
    token: types.string,
    loginParams: { phone: types.string, password: types.string }
  }))
  .actions(self => ({
    saveToken: (token: any) => { self.token = token },
    saveLoginParams: (loginParams: any) => { self.loginParams = loginParams },
  }))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
