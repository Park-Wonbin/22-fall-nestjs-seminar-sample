import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto.';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  create(dto: CreateCatDto) {
    return this.catRepository.save({
      name: dto.name,
      age: dto.age,
      userId: dto.userId,
    });
  }

  find() {
    return this.catRepository.find({
      relations: ['user'],
    });
  }

  delete(id: number) {
    return this.catRepository.delete({
      id: id,
    });
  }
}
