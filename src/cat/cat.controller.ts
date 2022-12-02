import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto.';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() dto: CreateCatDto) {
    return this.catService.create(dto);
  }

  @Get()
  find() {
    return this.catService.find();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.catService.delete(id);
  }
}
