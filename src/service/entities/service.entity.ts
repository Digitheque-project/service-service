import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ServiceType {
  CLINIQUE = 'CLINIQUE',
  PARACLINIQUE = 'PARACLINIQUE',
  MEDICO_TECHNIQUE = 'MEDICO_TECHNIQUE',
  ADMINISTRATIF = 'ADMINISTRATIF',
  AUTRE = 'AUTRE',
}

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  baseUrl: string;

  @Column({ type: 'enum', enum: ServiceType, nullable: true })
  type: ServiceType | null;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  chuId: string
}