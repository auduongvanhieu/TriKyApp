import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({})
  .views(self => ({
    profile: {
      "role": types.string, "gender": types.integer, "hobbies": types.array, "hobby_list": types.array, "verified": types.boolean,
      "phone": types.string, "name": types.string, "avatar": types.string, "birthday": types.string,
    }
  }))
  .actions(self => ({
    saveProfile: (profile: any) => { self.profile = profile },
  }))

type ProfileStoreType = Instance<typeof ProfileStoreModel>
export interface ProfileStore extends ProfileStoreType { }
type ProfileStoreSnapshotType = SnapshotOut<typeof ProfileStoreModel>
export interface ProfileStoreSnapshot extends ProfileStoreSnapshotType { }
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
