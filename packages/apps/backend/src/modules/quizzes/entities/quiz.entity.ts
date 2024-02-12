import { User } from '../../users/entities/user.entity'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  BelongsTo,
  DataType,
} from 'sequelize-typescript'
import { Question } from '../../questions/entities/question.entity'

@Table
export class Quiz extends Model<Quiz> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  cod: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Question)
  questions: Question[]
}
