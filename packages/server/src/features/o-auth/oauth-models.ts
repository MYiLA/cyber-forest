import { Column, DataType, Index, Model, Table } from 'sequelize-typescript'

export type YandexTokens = {
  accessToken: string
  refreshToken: string
  expired: Date
}

export interface YandexCodeDto {
  readonly code: number
}

export interface YandexTokenCreateRequest {
  readonly userId: number
  readonly accessToken: string
  readonly refreshToken: string
  readonly expired: Date
}

@Table({ tableName: 'oauth-yandex-tokens' })
export class YandexToken extends Model<YandexToken, YandexTokenCreateRequest> {
  @Column(DataType.INTEGER)
  @Index
  declare userId: number

  @Column(DataType.STRING)
  @Index
  declare accessToken: string

  @Column(DataType.STRING)
  @Index
  declare refreshToken: string

  @Column(DataType.DATE)
  @Index
  declare expired: Date
}
