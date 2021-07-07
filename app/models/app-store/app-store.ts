import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .props({
    isLoading: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .actions(self => ({
    showLoading: () => { self.isLoading = true },
    hideLoading: () => { self.isLoading = false },
  }))

type AppStoreType = Instance<typeof AppStoreModel>
export interface AppStore extends AppStoreType {}
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>
export interface AppStoreSnapshot extends AppStoreSnapshotType {}
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {})
