import {
  Table,
  Model,
  Column,
  DataType,
  Index,
  Scopes,
} from 'sequelize-typescript'
import { DataObject } from '../../config/types-constants'

export interface UsersSearchRequest {
  readonly login: string
}

export interface UserChanePasswordRequest {
  readonly oldPassword: string
  readonly newPassword: string
}

export interface UserUpdateProfileRequest {
  readonly first_name: string
  readonly second_name: string
  readonly display_name: string
  readonly login: string
  readonly email: string
  readonly phone: string
  readonly settings: DataObject
}

export interface UserCreateRequest {
  readonly first_name: string
  readonly second_name: string
  readonly login: string
  readonly email: string
  readonly password: string
  readonly phone: string
}

export interface UserDto extends UserCreateRequest {
  readonly id: number
  readonly display_name: string
  readonly avatar: string
  readonly settings: DataObject
}

export interface UserLoginRequest {
  readonly login: string
  readonly password: string
}

export interface UserCreateResponse {
  readonly id: number
  readonly authCookie: string
}

export type AuthorDto = Omit<UserDto, 'password' | 'settings' | 'authCookie'>

@Scopes(() => ({
  author: {
    attributes: { exclude: ['password', 'settings', 'authCookie'] },
  },
}))
@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, UserCreateRequest> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column({ type: DataType.STRING })
  declare first_name: string

  @Column({ type: DataType.STRING })
  declare second_name: string

  @Column({ type: DataType.STRING })
  declare display_name: string

  @Column({ type: DataType.STRING })
  @Index
  declare login: string

  @Column({ type: DataType.STRING })
  @Index
  declare email: string

  @Column({ type: DataType.STRING })
  @Index
  declare password: string

  @Column({ type: DataType.STRING })
  @Index
  declare phone: string

  @Column({ type: DataType.STRING })
  declare avatar: string

  @Column(DataType.JSON)
  declare settings: DataObject

  @Column({ type: DataType.STRING })
  declare authCookie: string
}
