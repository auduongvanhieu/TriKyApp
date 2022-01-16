import { types as t } from "mobx-state-tree"

export const CategoryModel = t.model({
    _id: t.number,
    code: t.string,
    name: t.string,
    bgColor: t.string,
    textColor: t.string,
    icon: t.string
})