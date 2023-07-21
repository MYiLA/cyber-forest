import { createContext, ReactNode, useContext, useState } from 'react'
import { GuidesVars } from '../types'

type GuideContext = {
  step: GuidesVars
  setStep: (value: GuidesVars) => void
}

const context = createContext<null | GuideContext>(null)

export const useGuideContext = () => {
  const value = useContext(context)
  if (!value) {
    throw new Error('Guide context not provided')
  }
  return value
}

type Props = {
  children: ReactNode
}

export const GuideProvider = ({ children }: Props) => {
  const [step, setStep] = useState(GuidesVars.Glory)
  return (
    <context.Provider value={{ step, setStep }}>{children}</context.Provider>
  )
}
