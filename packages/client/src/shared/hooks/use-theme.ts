import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

const getTheme = (store: RootState) => store.theme

const themeIsEqual = (
  prevState: RootState['theme'],
  nextState: RootState['theme']
) => {
  return prevState.themeName === nextState.themeName
}

export const useTheme = () => {
  return useSelector(getTheme, themeIsEqual)
}
