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

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  quizId: string

  @BelongsTo(() => Quiz)
  quiz: Quiz

  @HasMany(() => Answer)
  answers: Answer[]
}
