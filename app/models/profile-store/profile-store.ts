import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: types.optional(types.model(), {})
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
