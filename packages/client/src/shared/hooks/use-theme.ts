import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import scrollbarNeon from '@scss/_scrollbar-neon.scss?inline'
import scrollbarPurple from '@scss/_scrollbar-purple.scss?inline'
import { Theme } from '@config/constants'

const getTheme = (store: RootState) => store.theme

const themeIsEqual = (
  prevState: RootState['theme'],
  nextState: RootState['theme']
) => {
  return prevState.themeName === nextState.themeName
}

const scrollbars = {
  [Theme.Neon]: scrollbarNeon,
  [Theme.Purple]: scrollbarPurple,
}

export const useTheme = () => {
  const themeSelector = useSelector(getTheme, themeIsEqual)

  if (typeof document !== 'undefined') {
    const style =
      document.getElementById('main-scrollbar') ||
      document.createElement('style')
    if (!style.id) {
      style.id = 'main-scrollbar'
      document.head.appendChild(style)
    }
    style.textContent = scrollbars[themeSelector.themeName]
  }
  return themeSelector
}
