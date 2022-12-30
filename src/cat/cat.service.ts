import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
    });
  }

  delete(id: number) {
    // throw new ForbiddenException('권한 없음'); // 예시
    // throw new BadRequestException('잘못된 요청'); // 예시
    return this.catRepository.delete({
      id: id,
    });
  }
}
