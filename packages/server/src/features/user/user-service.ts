import {
  UsersSearchRequest,
  User,
  UserDto,
  UserChanePasswordRequest,
  UserUpdateProfileRequest,
} from './user-model'
import { ApiError } from '../../exceptions/api-error'
import { Op } from 'sequelize'
import { OK } from '../../config/types-constants'
import md5 from 'md5'
import path from 'path'
import fs from 'fs'

class UserService {
  public async updateProfile(
    dto: UserUpdateProfileRequest,
    userId: number
  ): Promise<UserDto> {
    const update = await User.update({ ...dto }, { where: { id: userId } })
    if (!update) {
      throw ApiError.SomethingWrong()
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['id', 'authCookie', 'password'] },
    })
    if (!user) {
      throw ApiError.NotFound()
    }
    return user
  }

  public async updateAvatar(
    avatar: Express.Multer.File,
    userId: number
  ): Promise<UserDto> {
    const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads')
    await fs.rename(
      `${uploadsPath}/${avatar.filename}`,
      `${uploadsPath}/${avatar.filename}${path.extname(avatar.originalname)}`,
      () => null
    )

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['authCookie', 'password'] },
    })
    if (user) {
      user.avatar = `/${avatar.filename}${path.extname(avatar.originalname)}`
      await user.save()
    } else {
      throw ApiError.SomethingWrong()
    }
    return user
  }

  public async updatePassword(
    dto: UserChanePasswordRequest,
    userId: number
  ): Promise<OK> {
    const user = await User.findOne({
      where: { id: userId, password: md5(dto.oldPassword) },
    })
    if (!user) {
      throw new ApiError(400, 'Неверный пароль')
    }
    user.password = md5(dto.newPassword)
    await user.save()
    return OK
  }

  public async getProfile(id: number): Promise<UserDto> {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['authCookie', 'password'] },
    })
    if (!user) {
      throw ApiError.NotFound()
    }
    return user
  }

  public async search(dto: UsersSearchRequest): Promise<UserDto[]> {
    return await User.findAll({
      where: { login: { [Op.like]: `%${dto.login}%` } },
      attributes: { exclude: ['authCookie', 'password'] },
      limit: 10,
    })
  }
}

export default new UserService()
