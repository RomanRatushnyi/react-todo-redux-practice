import { Column, Model, Table, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { Todo as TodoInterface, TodoStatus } from '../../../shared/types';

@Table({
  tableName: 'todos',
  timestamps: true,
})
export class Todo extends Model<TodoInterface> implements TodoInterface {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.ENUM('todo', 'inProgress', 'completed'),
    allowNull: false,
    defaultValue: 'todo',
  })
  status: TodoStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: string;
}
