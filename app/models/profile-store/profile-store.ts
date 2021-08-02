import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
const t = types
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: t.optional(t.model({ role: t.string, gender: t.number, hobbies: t.array(t.string), hobby_list: t.array(t.model({ _id: t.number, code: t.string, name: t.string, bgColor: t.string, textColor: t.string, icon: t.string })), verified: t.boolean, phone: t.string, name: t.string, avatar: t.string, birthday: t.string, verification: t.string }),
      { "role": "", "gender": 0, "hobbies": [], "hobby_list": [], "verified": false, "phone": "", "name": "", "avatar": "", "birthday": "", "verification": "" }),
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
