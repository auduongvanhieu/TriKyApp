import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { CategoryModel } from "./category-model"
import { TitleModel } from "./title-model"
const t = types
export const GeneralStoreModel = types
  .model("GeneralStore")
  .props({
    categories: types.optional(types.array(CategoryModel), []),
    generalTitles: types.optional(t.array(TitleModel), [])
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
