import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TDispatch, TRootState } from '../../core/store/store'
import {
  resetError,
  userGetInfo,
  userLogin,
  userLogout,
  userRegister,
} from '../../core/store/reducers/user-reducer'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../core/config/constants'
import { TUserLogin, TUserRegister } from '../../core/config/user-types'

export const useAuth = () => {
  const dispatch = useDispatch<TDispatch>()
  const navigate = useNavigate()

  const { loading, error, authorized, authChecked } = useSelector(
    (store: TRootState) => store.user
  )

  useEffect(() => {
    return () => {
      dispatch(resetError())
    }
  }, [])

  const needRedirect = useRef(false)

  useEffect(() => {
    if (!loading && needRedirect.current && !error) {
      navigate(authorized ? PATH.LOBBY : PATH.LOGIN)
    }
  }, [authorized, loading])

  const checkAuth = useCallback(() => {
    dispatch(userGetInfo())
  }, [])

  const toLogin = useCallback(
    (data: TUserLogin) => {
      needRedirect.current = true
      dispatch(userLogin(data))
    },
    [needRedirect, dispatch]
  )

  const toLogout = useCallback(() => {
    needRedirect.current = true
    dispatch(userLogout())
  }, [needRedirect, dispatch])

  const toRegister = useCallback(
    (data: TUserRegister) => {
      needRedirect.current = true
      dispatch(userRegister(data))
    },
    [needRedirect, dispatch]
  )

  return {
    error,
    authorized,
    toLogin,
    toRegister,
    toLogout,
    checkAuth,
    authChecked,
  }
}
