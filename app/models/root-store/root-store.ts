import { ProfileStoreModel } from "../profile-store/profile-store"
import { GeneralStoreModel } from "../general-store/general-store"
import { AuthStoreModel } from "../auth-store/auth-store"
import { AppStoreModel } from "../app-store/app-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  profileStore: types.optional(ProfileStoreModel, {}),
  generalStore: types.optional(GeneralStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
  appStore: types.optional(AppStoreModel, {}),
  characterStore: types.optional(CharacterStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
