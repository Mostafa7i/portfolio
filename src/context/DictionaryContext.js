'use client'

import { createContext, useContext } from 'react'

const DictCtx = createContext({ dict: {}, lang: 'en', dir: 'ltr' })

export function DictionaryProvider({ dict, lang, children }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  return (
    <DictCtx.Provider value={{ dict, lang, dir }}>
      {children}
    </DictCtx.Provider>
  )
}

export function useDict() {
  return useContext(DictCtx)
}
