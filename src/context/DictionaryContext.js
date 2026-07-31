'use client'

import { createContext, useContext, useMemo } from 'react'

const DictCtx = createContext({ dict: {}, lang: 'en', dir: 'ltr' })

export function DictionaryProvider({ dict, lang, children }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const value = useMemo(() => ({ dict, lang, dir }), [dict, lang, dir])
  return (
    <DictCtx.Provider value={value}>
      {children}
    </DictCtx.Provider>
  )
}

export function useDict() {
  return useContext(DictCtx)
}
