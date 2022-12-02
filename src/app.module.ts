import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db-dev.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    CatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
