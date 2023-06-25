import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export const useTheme = () => {
  return useSelector((store: RootState) => store.theme)
}
