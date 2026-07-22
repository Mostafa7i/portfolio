import 'server-only'

const dictionaries = {
  en: () => import('../../messages/en.json').then((m) => m.default),
  ar: () => import('../../messages/ar.json').then((m) => m.default),
}

export const locales = ['en', 'ar']
export const defaultLocale = 'en'
export const hasLocale = (locale) => locale in dictionaries
export const getDictionary = async (locale) =>
  hasLocale(locale) ? dictionaries[locale]() : dictionaries[defaultLocale]()
