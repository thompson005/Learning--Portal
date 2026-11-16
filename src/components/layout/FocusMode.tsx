"use client"

import { createContext, useContext, useState } from "react"

const FocusModeContext = createContext<{
  focus: boolean
  toggle: () => void
  set: (v: boolean) => void
}>({ focus: false, toggle: () => {}, set: () => {} })

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState(false)
  return (
    <FocusModeContext.Provider
      value={{ focus, toggle: () => setFocus((f) => !f), set: setFocus }}
    >
      {children}
    </FocusModeContext.Provider>
  )
}

export function useFocusMode() {
  return useContext(FocusModeContext)
}
