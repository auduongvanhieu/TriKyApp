import { ProfileStoreModel } from "../profile-store/profile-store"
import { GeneralStoreModel } from "../general-store/general-store"
import { AuthStoreModel } from "../auth-store/auth-store"
import { AppStoreModel } from "../app-store/app-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  profileStore: types.optional(ProfileStoreModel, {}),
  generalStore: types.optional(GeneralStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
  appStore: types.optional(AppStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
