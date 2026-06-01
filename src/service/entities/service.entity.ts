import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  baseUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  chuId: string
}
