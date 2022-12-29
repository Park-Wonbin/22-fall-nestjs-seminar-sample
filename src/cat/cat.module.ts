import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { LoggerMiddleware } from './cat.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cat');
  }
}
