import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript'
import { Question } from '../../questions/entities/question.entity'

@Table
export class Answer extends Model<Answer> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  cod: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId: string

  @BelongsTo(() => Question)
  question: Question
}
