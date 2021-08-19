import { boolean, maybe, model, string, } from "mobx-state-tree/dist/internal";

export const ResModel =  {
    msg: string,
    data: maybe(model()),
    success: boolean
}