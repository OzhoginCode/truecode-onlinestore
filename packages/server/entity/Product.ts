import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductBase } from '@truecode-onlinestore/shared/types';

@Entity()
export default class Product implements ProductBase {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column()
    description!: string;

  @Column('money')
    price!: number;

  @Column('money')
    discountedPrice!: number;

  @Column()
    sku!: string;

  @Column({ type: 'text', nullable: true })
    photoSrc!: string | null;
}
