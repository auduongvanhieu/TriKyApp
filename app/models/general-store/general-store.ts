import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
const t = types
export const GeneralStoreModel = types
  .model("GeneralStore")
  .props({
    categories: types.optional(types.array(types.model({ _id: types.number, code: types.string, name: types.string, bgColor: types.string, textColor: types.string, icon: types.string })), []),
    generalTitles: types.optional(t.array(t.model({ _id: t.number, code: t.string, name: t.string, textColor: t.string })), [])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCategories: (categoriesSnapshots: any) => {
      self.categories.replace(categoriesSnapshots)
    },
    saveTitles: (titlesSnapshots: any) => {
      self.generalTitles.replace(titlesSnapshots)
    },
  }))

type GeneralStoreType = Instance<typeof GeneralStoreModel>
export interface GeneralStore extends GeneralStoreType { }
type GeneralStoreSnapshotType = SnapshotOut<typeof GeneralStoreModel>
export interface GeneralStoreSnapshot extends GeneralStoreSnapshotType { }
export const createGeneralStoreDefaultModel = () => types.optional(GeneralStoreModel, {})
