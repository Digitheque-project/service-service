import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ServiceService } from './service.service';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiBearerAuth('access-token')
@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un service',
  })
  @ApiBody({
    type: CreateServiceDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Service créé avec succès',
  })
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les services',
  })
  findAll(@Query('chuId') chuId?: string) {
    return this.serviceService.findAll(chuId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Afficher un service',
  })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un service',
  })
  @ApiBody({
    type: UpdateServiceDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer un service',
  })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
