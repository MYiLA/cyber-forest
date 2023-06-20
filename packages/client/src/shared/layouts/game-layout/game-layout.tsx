import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { TRootState } from '../../../core/store/store'

export const GameLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { themeName } = useSelector((store: TRootState) => store.theme)

  return <div className={`container-${themeName}`}>{children}</div>
}
