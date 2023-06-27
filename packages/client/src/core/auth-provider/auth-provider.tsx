import { FC, Fragment, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { useAuth } from '@hooks/use-auth'
import { Loading } from '@ui/loading/loading'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getUserState = (store: RootState) => store.user
  const { authorized } = useSelector(getUserState)
  const { checkAuth, authChecked } = useAuth()

  useEffect(() => {
    if (!authChecked && !authorized) {
      checkAuth()
    }
  }, [authorized, authChecked, checkAuth])

  return <Fragment>{authChecked ? children : <Loading />}</Fragment>
}
