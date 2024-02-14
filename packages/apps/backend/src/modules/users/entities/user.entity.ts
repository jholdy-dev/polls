import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'
import { Quiz } from '../../quizzes/entities/quiz.entity'

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  cpf: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @HasMany(() => Quiz)
  quizzes: Quiz[]
}
