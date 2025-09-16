import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    select: false
  })
  @Exclude()
  password: string;
}
