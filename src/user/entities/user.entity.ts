import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cat } from '../../cat/entities/cat.entity';
import { UserRole } from '../user.meta';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Cat, (cat) => cat.user)
  cats: Cat[];

  @Column({
    // type: 'enum',
    // enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @Column()
  encryptedPassword: string;

  @Column()
  cryptoSalt: string;
}
