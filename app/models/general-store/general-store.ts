import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"

export const GeneralStoreModel = types
  .model("GeneralStore")
  .props({
    categories: types.optional(types.array(types.model({ _id: types.number, code: types.string, name: types.string, bgColor: types.string, textColor: types.string, icon: types.string })), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCategories: (categories: any) => {
      self.categories.replace(categories)
    },
  }))
  .actions((self) => ({
    getCategories: async () => {
      const api = new Api()
      const result = await api.getCategories()
      if (result.kind === "ok") {
        self.saveCategories(result.data)
      }
    },
  }))

type GeneralStoreType = Instance<typeof GeneralStoreModel>
export interface GeneralStore extends GeneralStoreType { }
type GeneralStoreSnapshotType = SnapshotOut<typeof GeneralStoreModel>
export interface GeneralStoreSnapshot extends GeneralStoreSnapshotType { }
export const createGeneralStoreDefaultModel = () => types.optional(GeneralStoreModel, {})
