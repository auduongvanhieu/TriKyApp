import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { ProfileModel, ProfileModelEmpty } from "./profile-model"
const t = types
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: t.optional(ProfileModel, ProfileModelEmpty),
  })
  .extend(withEnvironment)
  .actions(self => ({
    saveProfile: (profile: any) => { self.profile = profile },
  }))

type ProfileStoreType = Instance<typeof ProfileStoreModel>
export interface ProfileStore extends ProfileStoreType { }
type ProfileStoreSnapshotType = SnapshotOut<typeof ProfileStoreModel>
export interface ProfileStoreSnapshot extends ProfileStoreSnapshotType { }
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
