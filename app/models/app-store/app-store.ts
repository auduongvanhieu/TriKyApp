import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    dropdownAlert: types.optional(types.model({ title: types.string, description: types.string, type: types.string }), { title: "", description: "", type: "" }),
  })
  .extend(withEnvironment)
  .actions(self => ({
    showLoading: () => { self.isLoading = true },
    hideLoading: () => { self.isLoading = false },
    showSuccessAlert: (alert: any) => { self.dropdownAlert = { ...alert, title: alert.title || "Thành công", type: 'success' } },
    showWarnAlert: (alert: any) => { self.dropdownAlert = { ...alert, title: alert.title || "Thất bại", type: 'warn' } },
    showErrorAlert: (alert: any) => { self.dropdownAlert = { ...alert, title: alert.title || "Lỗi", type: 'error' } },
    resetAlert: () => { self.dropdownAlert = { title: "", description: "", type: "" } },
  }))

type AppStoreType = Instance<typeof AppStoreModel>
export interface AppStore extends AppStoreType { }
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>
export interface AppStoreSnapshot extends AppStoreSnapshotType { }
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {})
