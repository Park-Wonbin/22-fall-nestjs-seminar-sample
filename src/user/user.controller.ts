import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Render,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성',
    description: '새로운 유저를 생성합니다.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  find() {
    return this.userService.find();
  }

  @Render('index')
  @Get('index')
  async index() {
    return { user: await this.find() };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
