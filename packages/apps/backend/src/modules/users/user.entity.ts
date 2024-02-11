import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class User extends Model<User> {
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
}
