import * as Localization from "expo-localization"
import i18n from "i18n-js"
import vi from "./vi.json"
import en from "./en.json"

i18n.fallbacks = true
i18n.translations = {  vi, en }

i18n.locale = Localization.locale || "vi"

type DefaultLocale = typeof vi
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
