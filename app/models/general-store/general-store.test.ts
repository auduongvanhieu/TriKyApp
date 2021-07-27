import { GeneralStoreModel, GeneralStore } from "./general-store"

test("can be created", () => {
  const instance: GeneralStore = GeneralStoreModel.create({})

  expect(instance).toBeTruthy()
})