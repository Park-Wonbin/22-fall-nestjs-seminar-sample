import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    return this.userRepository.save({
      name: dto.name,
      email: dto.email,
    });
  }

  find() {
    return this.userRepository.find({ relations: ['cats'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['cats'],
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepository.update(
      {
        id: id,
      },
      { name: dto.name },
    );
  }

  delete(id: number) {
    return this.userRepository.delete({ id: id });
  }
}
