import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Friends } from '../friends/friends.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  })
  @Exclude()
  password: string;

  @OneToMany(() => Friends, (friends) => friends.user)
  friendships: Friends[];

  @OneToMany(() => Friends, (friends) => friends.friend)
  friendOf: Friends[];

  @OneToMany(() => Group, (group) => group.owner)
  ownedGroups: Group[];
}
