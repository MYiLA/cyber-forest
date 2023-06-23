import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export const GameLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { themeName } = useSelector((store: RootState) => store.theme)
  return <div className={`container-${themeName}`}>{children}</div>
}
