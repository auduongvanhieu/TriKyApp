import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
const t = types
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: t.optional(t.model({ role: t.string, gender: t.number, hobbies: t.array(t.string), hobby_list: t.maybe(t.array(t.model({ _id: t.number, code: t.string, name: t.string, bgColor: t.string, textColor: t.string, icon: t.string }))), star: t.maybe(t.number), titles: t.array(t.string), title_list: t.maybe(t.array(t.model({ _id: t.number, code: t.string, name: t.string, textColor: t.string }))), verified: t.maybe(t.boolean), _id: t.number, phone: t.string, name: t.string, avatar: t.string, email: t.maybe(t.string), birthday: t.string, slogan: t.string, verification: t.maybe(t.string) }),
      { "role": "", "gender": 0, "hobbies": [""], "hobby_list": [{ "_id": 1, "code": "", "name": "", "bgColor": "", "textColor": "", "icon": "" }], "star": 0, "titles": [""], "title_list": [{ "_id": 0, "code": "", "name": "", "textColor": "" }], "verified": true, "_id": 0, "phone": "", "name": "", "avatar": "", "email": "", "birthday": "", "slogan": "", "verification": "" }),
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
