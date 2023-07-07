import { useDispatch } from 'react-redux'
import { Dispatch } from '@store/store'
import { useCallback, useEffect } from 'react'
import { resetError } from '@store/reducers/user-reducer'
import { User } from '@config/user-types'
import {
  userChangeAvatar,
  userChangeData,
} from '@store/reducers/user-data-reducer'

export const useUserData = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    return () => {
      dispatch(resetError())
    }
  }, [])

  const toChangeData = useCallback(
    (data: User) => {
      dispatch(userChangeData(data))
    },
    [dispatch]
  )

  const toChangeAvatar = useCallback(
    (data: { avatar: object }) => {
      dispatch(userChangeAvatar(data))
    },
    [dispatch]
  )

  return {
    toChangeData,
    toChangeAvatar,
  }
}
