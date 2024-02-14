import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  BelongsTo,
  DataType,
} from 'sequelize-typescript'
import { Answer } from '../../answers/entities/answer.entity'
import { Quiz } from '../../quizzes/entities/quiz.entity'

@Table
export class Question extends Model<Question> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quizId: number

  @BelongsTo(() => Quiz)
  quiz: Quiz

  @HasMany(() => Answer)
  answers: Answer[]
}
