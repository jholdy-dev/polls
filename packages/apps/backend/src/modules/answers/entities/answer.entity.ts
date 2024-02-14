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
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number

  @BelongsTo(() => Question)
  question: Question
}
