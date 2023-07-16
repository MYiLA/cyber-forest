import { Column, DataType, Index, Model, Table } from 'sequelize-typescript'
import { DataObject } from '../../config/types-constants'

export interface LeaderboardCreateRequest {
  readonly data: DataObject
  readonly ratingFieldName: string
  readonly teamName: string
}

export interface LeaderBoardRequest {
  readonly ratingFieldName: string
  readonly cursor: number
  readonly limit: number
}

export interface LeaderBoardDataResponse {
  readonly data: DataObject
}

@Table({
  tableName: 'leaderboard',
  timestamps: false,
})
export class Leaderboard extends Model<Leaderboard, LeaderboardCreateRequest> {
  @Column(DataType.JSON)
  declare data: DataObject

  @Column(DataType.STRING)
  @Index
  declare ratingFieldName: string

  @Column(DataType.STRING)
  @Index
  declare teamName: string
}
