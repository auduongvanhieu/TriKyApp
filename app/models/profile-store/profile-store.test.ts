import { ProfileStoreModel, ProfileStore } from "./profile-store"

test("can be created", () => {
  const instance: ProfileStore = ProfileStoreModel.create({})

  expect(instance).toBeTruthy()
})