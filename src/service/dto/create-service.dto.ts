import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceType } from '../entities/service.entity';

export class CreateServiceDto {
  @ApiProperty({
    example: 'LAB',
    description: 'Nom du service',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'http://localhost:3001',
    description: 'URL du microservice',
  })
  @IsString()
  baseUrl!: string;

  @ApiProperty({
    enum: ServiceType,
    example: ServiceType.CLINIQUE,
    description: 'Type de service',
  })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  type!: ServiceType;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: 'uuid-chu',
    description: "ID de l'établissement CHU",
  })
  @IsUUID()
  @IsNotEmpty()
  chuId!: string;
}
