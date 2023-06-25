import { FC, ReactNode } from 'react'
import { useTheme } from '@hooks/use-theme'

export const GameLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { themeName } = useTheme()
  return <div className={`container-${themeName}`}>{children}</div>
}
