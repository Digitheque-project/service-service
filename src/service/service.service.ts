import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from './entities/service.entity';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateServiceDto) {
    try {
      const existing = await this.serviceRepo.findOne({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException('Ce service existe déjà');
      }

      const service = this.serviceRepo.create({
        name: dto.name,
        baseUrl: dto.baseUrl,
        isActive: dto.isActive ?? true,
        chuId: dto.chuId,
      });

      await this.serviceRepo.save(service);

      return {
        message: 'Service créé avec succès',
        service,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      console.error(error);
      throw new InternalServerErrorException(
        "Erreur lors de la création du service",
      );
    }
  }

  async findAll(chuId?: string) {
    try {
      const where = chuId ? { chuId } : {};
      return await this.serviceRepo.find({ where });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Erreur lors de la récupération des services",
      );
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.serviceRepo.findOne({
        where: { id },
      });

      if (!service) {
        throw new NotFoundException('Service introuvable');
      }

      return service;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(error);
      throw new InternalServerErrorException(
        "Erreur lors de la recherche du service",
      );
    }
  }

  async update(id: string, dto: UpdateServiceDto) {
    try {
      const service = await this.findOne(id);

      if (dto.name) {
        const existing = await this.serviceRepo.findOne({
          where: { name: dto.name },
        });

        if (existing && existing.id !== id) {
          throw new ConflictException('Ce service existe déjà');
        }
      }

      Object.assign(service, dto);
      await this.serviceRepo.save(service);

      return {
        message: 'Service mis à jour',
        service,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )
        throw error;
      console.error(error);
      throw new InternalServerErrorException(
        "Erreur lors de la mise à jour du service",
      );
    }
  }

  async remove(id: string) {
    try {
      const service = await this.findOne(id);
      await this.serviceRepo.remove(service);

      return {
        message: 'Service supprimé',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(error);
      throw new InternalServerErrorException(
        "Erreur lors de la suppression du service",
      );
    }
  }
}
