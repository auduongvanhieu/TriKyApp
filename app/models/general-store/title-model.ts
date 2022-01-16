import { types as t } from "mobx-state-tree"

export const TitleModel = t.model({ 
    _id: t.number, 
    code: t.string, 
    name: t.string, 
    textColor: t.string 
})