import { types as t } from "mobx-state-tree"
export const ProfileModel = t.model({
    role: t.maybeNull(t.string),
    gender: t.maybeNull(t.number),
    hobbies: t.array(t.string),
    hobby_list: t.array(
        t.model({
            _id: t.number,
            code: t.string,
            name: t.string,
            bgColor: t.string,
            textColor: t.string,
            icon: t.string
        })
    ),
    star: t.maybeNull(t.number),
    titles: t.array(t.string),
    title_list: t.array(
        t.model({
            _id: t.number,
            code: t.string,
            name: t.string,
            textColor: t.string
        })
    ),
    verified: t.maybeNull(t.boolean),
    _id: t.maybeNull(t.number),
    phone: t.maybeNull(t.string),
    name: t.maybeNull(t.string),
    avatar: t.maybeNull(t.string),
    email: t.maybeNull(t.string),
    birthday: t.maybeNull(t.string),
    slogan: t.maybeNull(t.string),
    verification: t.maybeNull(t.string)
})

export const ProfileModelEmpty = {
    "role": "",
    "gender": 0,
    "hobbies": [
        ""
    ],
    "hobby_list": [
        {
            "_id": 1,
            "code": "",
            "name": "",
            "bgColor": "",
            "textColor": "",
            "icon": ""
        }
    ],
    "star": 0,
    "titles": [
        ""
    ],
    "title_list": [
        {
            "_id": 0,
            "code": "",
            "name": "",
            "textColor": ""
        }
    ],
    "verified": true,
    "_id": 0,
    "phone": "",
    "name": "",
    "avatar": "",
    "email": "",
    "birthday": "",
    "slogan": "",
    "verification": ""
}